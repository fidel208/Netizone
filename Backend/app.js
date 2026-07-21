import express from "express";
import prisma from "./config/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { verifyToken, checkAccountActive } from "./middleware/auth.js";
import { connectToRouter } from "./config/microtik.js";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fidelmuthomi007@gmail.com",
    pass: "figbkidiylfxqtrz",
  },
});

app.post("/api/register", async (req, res) => {
  const { userEmail, username, userPhone, password } = req.body;

  const userMailOptions = {
    from: '"Netizone" <fidelmuthomi007@gmail.com>',
    to: userEmail,
    subject: "Successful registration",
    html: `<h1 style="font-size: 20px">Hello ${username}</h1>
    <p>
      Thank you for reistering to netizone. Your registration has been received
      successfully. We will keep in touch on the steps to follow. Good day
    </p>`,
  };

  const adminMailOptions = {
    from: '"Netizone Registration Form" <fidelmuthomi007@gmail.com>',
    to: "fidelmuthomi007@gmail.com",
    subject: "Netizone user registration",
    html: `<h1 style="font-size: 20px">New user registration details</h1>
    <p><b>Email:</b> ${userEmail}</p>
    <p><b>Phone Number:</b> ${userPhone}</p>
    <p><b>Username:</b> ${username}</p>
    <p><b>Password:</b> ${password}</p>
  </body>`,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    res.status(200).json({ message: "Registration received" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

app.post("/api/admin/activate-user/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: true,
        subscriptionExpiresAt: thirtyDaysFromNow,
      },
    });
    res.status(200).json({
      success: true,
      message: "Account activated for 30 days",
      expiresAt: updatedUser.subscriptionExpiresAt,
    });
  } catch (error) {
    console.error("Manual activation error:", error);
    res.status(500).json({ error: "Failed to activate user" });
  }
});

app.get("/api/account/status", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;

  try {
    const userRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: { isActive: true },
    });
    if (!userRow) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      isActive: userRow.isActive,
    });
  } catch (error) {
    console.error("Error getting the account status:", error);
    res.status(500).json({ error: "Failed to get the account status" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please input your username and password" });
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

app.get("/api/phone-number", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;
  try {
    const phoneRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: { phoneNumber: true },
    });
    if (!phoneRow) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      success: true,
      phoneNumber: phoneRow.phoneNumber,
    });
  } catch (error) {
    console.error("Error getting the username", error);
    res.status(500).json({ error: "Failed to get the phone number" });
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

app.get("/api/general", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;

  try {
    const userRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: {
        internetName: true,
        phoneNumber: true,
        address: true,
        isSystemEnabled: true,
        expiredNotification: true,
        paymentNotification: true,
        reminderNotification: true,
      },
    });

    if (!userRow) {
      return res.status(404).json({ error: "Account user not found" });
    }

    res.status(200).json({
      success: true,
      settings: {
        internetName: userRow.internetName,
        address: userRow.address,
        phoneNumber: userRow.phoneNumber,
        isSystemEnabled: userRow.isSystemEnabled,
        expiredNotification: userRow.expiredNotification,
        paymentNotification: userRow.paymentNotification,
        reminderNotification: userRow.reminderNotification,
      },
    });
  } catch (error) {
    console.error("Unexpected Error occured:", error);
    res.status(500).json({ error: "Failed to load the general settings" });
  }
});

app.put(
  "/api/user/settings",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    const {
      internet,
      phone,
      address,
      enable,
      "payment-not": paymentNot,
      "expired-not": expiredNot,
      "reminder-not": reminderNot,
    } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: activeUserId },
        data: {
          internetName: internet,
          phoneNumber: phone,
          address: address,
          isSystemEnabled: enable === "yes",
          paymentNotification: paymentNot,
          expiredNotification: expiredNot,
          reminderNotification: reminderNot,
        },
      });

      res.status(200).json({
        success: true,
        message: "User details updated successfully",
        settings: updatedUser,
      });
    } catch (error) {
      console.error("Error occured while updating", error);
      res.status(500).json({ error: "Failed to update user general settings" });
    }
  },
);

app.get("/api/account", verifyToken, async (req, res) => {
  const activeUserId = req.user.id;

  try {
    const userRow = await prisma.user.findUnique({
      where: { id: activeUserId },
      select: {
        username: true,
        email: true,
      },
    });

    if (!userRow) {
      return res.status(404).json({
        error: "Account user not found",
      });
    }

    res.status(200).json({
      success: true,
      account: {
        username: userRow.username,
        email: userRow.email,
      },
    });
  } catch (error) {
    console.error("Unexpected error occured:", error);
    res.status(500).json({
      error: "Failed to load account details",
    });
  }
});

app.put(
  "/api/user/details",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    const { username, email } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: activeUserId },
        data: {
          username: username,
          email: email,
        },
      });

      res.status(200).json({
        success: true,
        message: "Account details updated successfully",
        account: updatedUser,
      });
    } catch (error) {
      console.error("An error occured during updating");
      res.status(500).json({ error: "Failed to update account details" });
    }
  },
);

app.get("/api/routers", verifyToken, checkAccountActive, async (req, res) => {
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

app.post(
  "/api/routers/add",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.get(
  "/api/routers/:id/status",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.delete(
  "/api/routers/:id/delete",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.get("/api/packages", verifyToken, checkAccountActive, async (req, res) => {
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

app.post(
  "/api/packages/add",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.delete(
  "/api/packages/:id/delete",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.get("/api/pools", verifyToken, checkAccountActive, async (req, res) => {
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

app.post(
  "/api/pools/add",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.delete(
  "/api/pools/:id/delete",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
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
  },
);

app.get("/api/public/routers/:routerId/packages", async (req, res) => {
  const { routerId } = req.params;

  try {
    const publicPackages = await prisma.package.findMany({
      where: {
        OR: [{ routerId: routerId }, { routerId: null }],
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

app.put(
  "/api/user/notifications",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const { expiredMessage, paymentMessage, balanceMessage } = req.body;
    const activeUserId = req.user.id;

    try {
      const dataToSave = [
        {
          type: "expired",
          message: expiredMessage,
        },
        {
          type: "payment",
          message: paymentMessage,
        },
        {
          type: "balance",
          message: balanceMessage,
        },
      ];

      await prisma.$transaction(
        dataToSave.map((item) =>
          prisma.notifications.upsert({
            where: {
              userId_type: { userId: activeUserId, type: item.type },
            },
            update: { message: item.message },
            create: {
              type: item.type,
              message: item.message,
              userId: activeUserId,
            },
          }),
        ),
      );

      res.status(200).json({
        success: true,
        message: "Notifications updated successfully!",
      });
    } catch (error) {
      console.error("Failed to save add notifications:", error);
      res.status(500).json({ error: "Internal server error saving templates" });
    }
  },
);

app.get("/api/user/notifications", verifyToken, async (req, res) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Failed to get notifications:", error);
    res.status(500).json({ error: "Failed to load notifications" });
  }
});

app.put(
  "/api/payment/mpesa",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;
    const { consumerKey, consumerSecret, shortCode, till, passkey } = req.body;

    try {
      const addedMpesa = await prisma.mpesaDetails.upsert({
        where: { userId: activeUserId },
        update: {
          consumerKey,
          consumerSecret,
          shortCode,
          till,
          passkey,
        },
        create: {
          consumerKey,
          consumerSecret,
          shortCode,
          till,
          passkey,
          userId: activeUserId,
        },
      });
      res.status(200).json({
        success: true,
        message: "Mpesa details added successfully",
      });
    } catch (error) {
      console.error("Error occured while adding mpesa details:", error);
      res.status(500).json({ error: "Faied to add mpesa details" });
    }
  },
);

app.get(
  "/api/payment/mpesa-details",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    try {
      const userRow = await prisma.mpesaDetails.findUnique({
        where: { userId: activeUserId },
        select: {
          consumerKey: true,
          consumerSecret: true,
          shortCode: true,
          till: true,
          passkey: true,
        },
      });

      if (!userRow) {
        return res.status(404).json({ error: "Account not found" });
      }

      res.status(200).json({
        success: true,
        mpesa: {
          consumerKey: userRow.consumerKey,
          consumerSecret: userRow.consumerSecret,
          shortCode: userRow.shortCode,
          till: userRow.till,
          passkey: userRow.passkey,
        },
      });
    } catch (error) {
      console.error("Unexpected error occured:", error);
      res
        .status(500)
        .json({ error: "Failed to get the mpesa payment details" });
    }
  },
);

app.put(
  "/api/payment/bank",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;
    const { accountNumber, bankName } = req.body;

    try {
      const bankDetails = await prisma.bankDetails.upsert({
        where: { userId: activeUserId },
        update: {
          accountNumber,
          bankName,
        },
        create: {
          accountNumber,
          bankName,
          userId: activeUserId,
        },
      });
      res.status(200).json({
        success: true,
        message: "Bank details added successfully",
      });
    } catch (error) {
      console.error("Error occures while adding bank details:", error);
      res.status(500).json({ error: "Failed to add bank details" });
    }
  },
);

app.get(
  "/api/payment/bank-details",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    try {
      const userRow = await prisma.bankDetails.findUnique({
        where: { userId: activeUserId },
        select: {
          accountNumber: true,
          bankName: true,
        },
      });

      if (!userRow) {
        return res.status(404).json({ error: "Account not found" });
      }

      res.status(200).json({
        success: true,
        bank: {
          accountNumber: userRow.accountNumber,
          bankName: userRow.bankName,
        },
      });
    } catch (error) {
      console.error("Unexpected error occured:", error);
      res.status(500).json({ error: "Failed to get the bank details" });
    }
  },
);

app.get(
  "/api/payment-method",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    try {
      const userRow = await prisma.user.findUnique({
        where: { id: activeUserId },
        select: {
          paymentMethod: true,
        },
      });

      if (!userRow) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        success: true,
        payment: {
          paymentMethod: userRow.paymentMethod,
        },
      });
    } catch (error) {
      console.error("Unexpected error occured:", error);
      res.status(500).json({ error: "Failed to get the payment method" });
    }
  },
);

app.put(
  "/api/payment/method",
  verifyToken,
  checkAccountActive,
  async (req, res) => {
    const activeUserId = req.user.id;

    const { paymentMethod } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: activeUserId },
        data: {
          paymentMethod: paymentMethod,
        },
      });

      res.status(200).json({
        success: true,
        message: "Payment method updated successfully",
        payment: { paymentMethod: updatedUser.paymentMethod },
      });
    } catch (error) {
      console.error("Error occured while updating:", error);
      res.status(500).json({ error: "Failed to change the payment method" });
    }
  },
);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}`);
});
