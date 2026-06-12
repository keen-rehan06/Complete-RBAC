import express from "express";
import { getAllUser, LoginUser, registerUser } from "./userController.js";
import { isAdmin, isLoggedIn } from "./userMiddleware.js";

const app = express.Router();

app.post("/register",registerUser);
app.post("/login",LoginUser);
app.get("/get-alluser",isLoggedIn,isAdmin,getAllUser);
export default app;