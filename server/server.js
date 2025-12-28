import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./Routes/authrouter.js";
// import bodyParser from "body-parser";


dotenv.config();
connectDB();
const app = express();


//MIDDLEWARE
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/" , authRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
