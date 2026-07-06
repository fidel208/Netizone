import express from "express";
import prisma from "./config/db.js";
import cors from "cors";

const app = express();
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
      error: "AN internal server error occured",
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
