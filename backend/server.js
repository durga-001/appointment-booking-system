import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();

// middlewares
app.use(express.json());
app.use(cors(origin: "https://medisync-1-4guz.onrender.com"));

// api routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("MediSync API is running");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
