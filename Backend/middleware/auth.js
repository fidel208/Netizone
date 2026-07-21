import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const userRow = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        isActive: true,
        subscriptionExpiresAt: true,
      },
    });

    if (!userRow) {
      return res.status(404).json({ error: "User account missing" });
    }

    const now = new Date();

    if (userRow.subscriptionExpiresAt && now > userRow.subscriptionExpiresAt) {
      if (userRow.isActive) {
        await prisma.user.update({
          where: { id: req.user.id },
          data: { isActive: false },
        });
      }
      userRow.isActive = false;
    }
    req.user.isActive = userRow.isActive;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Session expired. Please login again" });
  }
};

export const checkAccountActive = (req, res, next) => {
  if (!req.user || !req.user.isActive) {
    return res.status(403).json({
      error: "Account inactive",
      message:
        "Your 30 days of active access are over. Kindly renew your subscription",
    });
  }
  next();
};
