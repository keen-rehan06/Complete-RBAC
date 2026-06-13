import express from "express";
import { getAllUser, LoginUser, registerUser, updateRole } from "./userController.js";
import { authorize, isLoggedIn } from "./userMiddleware.js";

const app = express.Router();

app.post("/register",registerUser);
app.post("/login",LoginUser);
app.get("/get-alluser",isLoggedIn, authorize("seller", "admin"),getAllUser);
app.patch("/users/:id/role",isLoggedIn,authorize('admin'),updateRole)
export default app;