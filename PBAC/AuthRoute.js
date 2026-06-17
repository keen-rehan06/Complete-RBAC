import express from "express";
import { registerUser,LoginUser } from "./Auth.js";

const app = express.Router();

app.post("/register",registerUser);
app.post("/login",LoginUser);

export default app;