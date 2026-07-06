import prisma from "./config/db.js";

async function main() {
  console.log("Starting manual user injection...");

  const testUser = await prisma.user.upsert({
    where: { username: "fidel" },
    update: {},
    create: {
      username: "Fidel",
      password: "1234five",
      email: "dempafidel@gmail.com",
      phoneNumber: "0789455874",
      internetName: "fidelnet",
      isApproved: true,
      isActive: true,
    },
  });

  console.log("Successfully created manual test user:", testUser);
}

main()
  .catch((e) => {
    console.error("Error during manual user injection:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
