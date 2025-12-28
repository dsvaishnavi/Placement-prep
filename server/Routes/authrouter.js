import express from "express";
import {signupValidation} from "../middlewares/Authvalidation"

const router = express.Router();

router.get("/signup", signupValidation)


router.get("/login", (req, res) => {
  res.send("login working");
});

export default router;
