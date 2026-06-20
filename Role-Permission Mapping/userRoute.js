import express from "express";
import { loginUser, registerUser } from "./userAuth.js";

 const app = express.Router();

app.post("/register",registerUser);
app.post("/login",loginUser);

export default app;