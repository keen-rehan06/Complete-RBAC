import express from "express";
import { loginUser, userRegister } from "../controller/userController.js";

export const app = express.Router();

app.post("/register",userRegister);
app.post("/login",loginUser);

