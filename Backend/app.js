import express from "express";
import prisma from "./config/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.js";
import { connectToRouter } from "./config/microtik.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      message: "Welcome back",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login route error", error);
    res.status(500).json({
      error: "An internal server error occured",
    });
  }
});

app.get("/api/username", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;
  try {
    const userRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: { username: true },
    });
    if (!userRow) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      success: true,
      username: userRow.username,
    });
  } catch (error) {
    console.error("Error getting the username", error);
    res.status(500).json({ error: "Failed to get the username" });
  }
});

app.get("/api/internetname", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;
  try {
    const internetRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: { internetName: true },
    });
    if (!internetRow) {
      return res.status(404).json({
        error: "Internet name not found",
      });
    }
    res.status(200).json({
      success: true,
      internetName: internetRow.internetName,
    });
  } catch (error) {
    console.error("Error getting the internet name", error);
    res.status(500).json({ error: "Failed to get internet name" });
  }
});

app.get("/api/routers", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;
  try {
    const userRouters = await prisma.router.findMany({
      where: { userId: activeUserId },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      success: true,
      routers: userRouters,
    });
  } catch (error) {
    console.error("Error fetching user routers", error);
    res.status(500).json({ error: "Failed to get router list" });
  }
});

app.post("/api/routers/add", verifyToken, async (req, res) => {
  const { name, ipAddress, username, secret, isActive } = req.body;

  if (!name || !ipAddress || !username || !secret) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const activeUserId = req.user.id;

    const newRouter = await prisma.router.create({
      data: {
        name,
        ipAddress,
        username,
        secret,
        isActive: isActive ?? true,
        userId: activeUserId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Router added successfully",
      router: newRouter,
    });
  } catch (err) {
    console.error("Error adding a router:", err);
    return res.status(500).json({
      error: "An internal server error occurred while saving the router",
    });
  }
});

app.get("/api/routers/:id/status", verifyToken, async (req, res) => {
  const { id } = req.params;
  const activeUserId = req.user.id;

  try {
    const router = await prisma.router.findFirst({
      where: { id, userId: activeUserId },
    });

    if (!router) {
      return res
        .status(404)
        .json({ error: "Router configuration record not found." });
    }

    const conn = await connectToRouter(router);

    const resourceData = await conn.menu("/system/resource").print();

    return res.status(200).json({
      success: true,
      status: "Connected",
      metrics: resourceData[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: "Disconnected",
      error: err.message,
    });
  }
});

app.delete("/api/routers/:id/delete", verifyToken, async (req, res) => {
  const routerId = req.params.id;
  const activeUserId = req.user.id;

  try {
    const existingRouter = await prisma.router.findUnique({
      where: { id: routerId },
    });
    if (!existingRouter) {
      return res.status(400).json({ error: "Router not found" });
    }

    await prisma.router.delete({ where: { id: routerId } });

    res.status(200).json({
      success: true,
      message: "Router deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting router:", error);
    res.status(500).json({
      error: "Internal server occured during deletion process",
    });
  }
});

app.get("/api/packages", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;
  try {
    const packages = await prisma.package.findMany({
      where: {
        router: {
          userId: activeUserId,
        },
      },
      include: {
        router: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
    return res.status(200).json({ packages });
  } catch (err) {
    console.error("Error fetching packages:", err);
    return res.status(500).json({ error: "Failed to get package list" });
  }
});

app.post("/api/packages/add", verifyToken, async (req, res) => {
  const {
    name,
    isActive,
    type,
    price,
    limitType,
    bandwidth,
    validity,
    timeLimit,
    dataLimit,
    routerId,
  } = req.body;

  if (!name || !bandwidth || !validity) {
    return res
      .status(400)
      .json({ error: "Please fill in the required fields" });
  }

  try {
    const activeUserId = req.user.id;
    if (routerId && routerId !== "no-router") {
      const routerOwnershipCheck = await prisma.router.findFirst({
        where: { id: routerId, userId: activeUserId },
      });
      if (!routerOwnershipCheck) {
        return res
          .status(403)
          .json({ error: "Unauthorized target configuration route mapping" });
      }
    }
    const newPackage = await prisma.package.create({
      data: {
        name,
        isActive: isActive ?? true,
        type: type || "prepaid",
        price: price ? parseFloat(price) : 0.0,
        limitType: limitType || "unlimited",
        bandwidth,
        validity,
        timeLimit: timeLimit || "Unlimited",
        dataLimit: dataLimit || "Unlimited",
        routerId: routerId === "no-router" || !routerId ? null : routerId,
      },
      include: {
        router: {
          select: { name: true },
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "Hotspot package created successfully",
      package: newPackage,
      packages: newPackage,
    });
  } catch (err) {
    console.error("Error adding package:", err);
    return res.status(500).json({
      error: "An internal server error occurred while saving the package",
    });
  }
});

app.delete("/api/packages/:id/delete", verifyToken, async (req, res) => {
  const packageId = req.params.id;
  const activeUserId = req.user.id;

  try {
    const existingPackage = await prisma.package.findUnique({
      where: { id: packageId },
    });
    if (!existingPackage) {
      return res.status(404).json({ error: "Service plan not found" });
    }

    await prisma.package.delete({
      where: { id: packageId },
    });

    res.status(200).json({
      success: true,
      message: "Package deleted from system listings successfully",
    });
  } catch (error) {
    console.error("Error deleting service package:", error);
    res.status(500).json({
      error: "Internal server error occured during deletion processing",
    });
  }
});

app.get("/api/pools", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;

  try {
    const pools = await prisma.pool.findMany({
      where: {
        router: {
          userId: activeUserId,
        },
      },
      include: {
        router: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const formattedPools = pools.map((p) => ({
      id: p.id,
      name: p.name,
      rangeIp: p.rangeIp,
      router: p.router ? p.router.name : "None",
    }));

    return res.status(200).json({ pools: formattedPools });
  } catch (err) {
    console.error("The exact database error is:", err);
    return res.status(500).json({ error: "Failed to get pool lists" });
  }
});

app.post("/api/pools/add", verifyToken, async (req, res) => {
  const { name, rangeIp, routerId } = req.body;

  if (!name || !rangeIp) {
    return res
      .status(400)
      .json({ error: "Pool name and Range IP are required" });
  }

  try {
    const activeUserId = req.user.id;

    if (routerId) {
      const routerOwnershipCheck = await prisma.router.findFirst({
        where: { id: routerId, userId: activeUserId },
      });
      if (!routerOwnershipCheck) {
        return res.status(403).json({ error: "Unauthorized router mapping" });
      }
    }

    const newPool = await prisma.pool.create({
      data: {
        name,
        rangeIp,
        routerId: routerId || null,
        userId: activeUserId,
      },
      include: {
        router: {
          select: { name: true },
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "IP Pool created successfully",
      pool: {
        id: newPool.id,
        name: newPool.name,
        rangeIp: newPool.rangeIp,
        router: newPool.router ? newPool.router.name : "None",
      },
    });
  } catch (err) {
    console.error("Error adding IP pool", err);
    return res.status(500).json({
      error: "An internal server error occurred while saving the IP pool",
    });
  }
});

app.delete("/api/pools/:id/delete", verifyToken, async (req, res) => {
  const poolId = req.params.id;
  const activeUserId = req.user.id;

  try {
    const existingPool = await prisma.pool.findUnique({
      where: { id: poolId },
    });
    if (!existingPool) {
      return res.status(404).json({ error: "IP pool not found" });
    }

    await prisma.pool.delete({
      where: { id: poolId },
    });

    res.status(200).json({
      success: true,
      message: "IP pool successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting pool:", error);
    res.status(500).json({
      error: "Internal server occured during deletion process",
    });
  }
});

app.get("/api/public/routers/:routerId/packages", async (req, res) => {
  const { routerId } = req.params;

  try {
    const publicPackages = await prisma.package.findMany({
      where: {
        OR: [{ routerId: parseInt(routerId) }, { routerId: null }],
      },
      select: {
        id: true,
        name: true,
        bandwidth: true,
        price: true,
        timeLimit: true,
        dataLimit: true,
        validity: true,
      },
    });

    res.status(200).json({
      success: true,
      packages: publicPackages,
    });
  } catch (error) {
    console.error("Error fetching router packages:", error);
    res.status(500).json({ error: "Failed to load router packages" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}`);
});
