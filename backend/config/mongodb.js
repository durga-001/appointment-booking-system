import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  // Note: no database name in the URI itself — Mongoose appends "/medisync"
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
