import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URL as string;
    await mongoose.connect(uri);
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
