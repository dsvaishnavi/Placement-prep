import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./Routes/authrouter.js";

dotenv.config();
connectDB();

const app = express();

app.use("/", router);

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Our Server Is In Running Position");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
