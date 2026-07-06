import express from "express";
import prisma from "./config/db.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (!user.isApproved) {
      return res.status(403).json({ error: "Account not yet activated" });
    }

    res.status(200).json({
      succes: true,
      message: "Login successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        internetName: user.internetName,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Login route error", error);
    res.status(500).json({
      error: "An internal server error occured",
    });
  }
});

app.get("/api/routers", async (req, res) => {
  try {
    const routers = await prisma.router.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ routers });
  } catch (error) {
    console.error("Error fetching routers", error);
    res.status(500).json({ error: "Failed to get router list" });
  }
});

app.post("/api/routers/add", async (req, res) => {
  const { name, ipAddress, username, secret, isActive } = req.body;

  if (!name || !ipAddress || !username || !secret) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      return res.status(404).json({
        error: "System owner profile not found. Please run seed script.",
      });
    }
    const newRouter = await prisma.router.create({
      data: {
        name,
        ipAddress,
        username,
        secret,
        isActive: isActive ?? true,
        user: {
          connect: { id: defaultUser.id },
        },
      },
    });
    res.status(201).json({
      success: true,
      message: "Router added successfully",
      router: newRouter,
    });
  } catch (err) {
    console.error("Error adding a router:", err);
  }

  res.status(500).json({
    error: "An internal server error occurred while saving the router",
  });
});

app.get("/api/routers", async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      include: {
        router: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ packages });
  } catch (err) {
    console.error("Error fetching packages:", err);
    return res.status(500).json({ error: "Failed to get package list" });
  }
});

app.post("/api/packages/add", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}`);
});
