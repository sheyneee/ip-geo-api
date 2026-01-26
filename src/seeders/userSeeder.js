import "dotenv/config";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedUser = async () => {
  try {
    await connectDB();

    const email = "test@example.com";
    const plainPassword = "Password123!";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Seeder: user already exists");
      console.log("Email:", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name: "Test User",
      email,
      password: hashedPassword,
    });

    console.log("Seeder: user created successfully");
    console.log("Email:", email);
    console.log("Password:", plainPassword);
    process.exit(0);
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
};

seedUser();
