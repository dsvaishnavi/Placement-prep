import express from "express";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import cors from "cors";
import connectDB from "./config/db.js";
import authrouter from "./Routes/authrouter.js";
import adminrouter from "./Routes/adminrouter.js";
import contentrouter from "./Routes/contentrouter.js";
import aptituderouter from "./Routes/aptitudeRouter.js";
import bodyParser from "body-parser";

connectDB();
const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use("/auth", authrouter);
app.use("/admin", adminrouter);
app.use("/content", contentrouter);
app.use("/aptitude", aptituderouter);

app.use("/" , authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});