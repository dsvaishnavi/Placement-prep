import express from "express" ;
import dotenv from "dotenv";
import cors from "cors" ;
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes"

dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });