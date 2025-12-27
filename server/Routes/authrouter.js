import express from "express";

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.send("signup page welcome");
  })
  
router
  .route("/login")
  .get((req, res) => {
    res.send("login page welcome");
  })
 
  .post((req, res) => {
    res.send("POST request");
  });


export default router;
