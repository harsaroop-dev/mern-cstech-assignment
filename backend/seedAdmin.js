const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("Admin already exists.");
    mongoose.disconnect();
    return;
  }

  // sample admin remains same

  const admin = new Admin({
    email: "admin@example.com",
    password: "password123",
  });

  await admin.save();
  console.log("Admin created successfully!");
  mongoose.disconnect();
};

createAdmin().catch(console.error);
