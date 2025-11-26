import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  if (!ENV.DB_URL) {
    console.error("Database URL is not defined in environment variables");
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log(`📊MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
