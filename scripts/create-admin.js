
const bcrypt = require("bcryptjs");
const { sequelize, User } = require("../src/models");
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const fullName = (await rl.question("Super admin full name: ")).trim();
    const email = (await rl.question("Super admin email: ")).trim().toLowerCase();
    const password = await rl.question("Super admin password: ");

    if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a name and a valid email address.");
    }

    if (password.length < 12 || password.length > 72) {
      throw new Error("Password must be between 12 and 72 characters.");
    }

    await sequelize.authenticate();

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new Error("That email already exists. No account was changed.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await User.create({
      fullName,
      email,
      passwordHash,
      role: "super_admin",
      status: "active"
    });

    console.log(`Super admin created successfully. User ID: ${admin.id}`);
  } finally {
    rl.close();
    await sequelize.close();
  }
}

main().catch((error) => {
  console.error("Admin setup failed:", error.message);
  process.exitCode = 1;
});
