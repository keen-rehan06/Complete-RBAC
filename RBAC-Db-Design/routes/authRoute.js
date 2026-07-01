import express from "express";
import { loginUser, userRegister } from "../controller/userController.js";
import { seedRolesPermissions } from "../config/seedRolesPermissions.js";

const app = express.Router();

app.post("/register",userRegister);
app.post("/login",loginUser);
app.get("/perm",seedRolesPermissions);

export default app;
