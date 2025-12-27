import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authrouter from "./Routes/authrouter.js";
import bodyParser from "body-parser";


dotenv.config();
connectDB();
const app = express();


//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/auth" , authrouter)

//Routes
app.get("/", (req, res) => {
  res.send("Our Server Is In Running Position");
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
