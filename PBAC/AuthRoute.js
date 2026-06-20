import express from "express";
import { registerUser,LoginUser, checkPolicy, isLoggedIn } from "./Auth.js";

const app = express.Router();

app.post("/register",registerUser);
app.post("/login",LoginUser);
app.get(
  "/salary-data",
  isLoggedIn,
  checkPolicy,
  (req, res) => {
    res.json({
      data: "Salary Information"
    });
  }
);

export default app;