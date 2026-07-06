import prisma from "./config/db.js";

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log(
      "Prisma is connected and communicating with your PostgreSQL database!",
    );
  } catch (error) {
    console.error("Prisma failed to connect to the database:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
