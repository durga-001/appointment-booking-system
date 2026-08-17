import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api routes will be added here in later phases:
// app.use("/api/user", userRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("MediSync API is running");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
