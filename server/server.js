import express from "express" ;
import dotenv from "dotenv";
import cors from "cors" ;
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.send("Our Server Is In Running Position");
  });

app.get("/home", (req, res) => {
    res.send("Server is on Home Page");
  });







const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });

