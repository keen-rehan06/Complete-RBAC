import express from "express";
import { getAllUser, LoginUser, registerUser, updateRole } from "./userController.js";
import { authorize, isLoggedIn } from "./userMiddleware.js";

const app = express.Router();

app.post("/register",registerUser);
app.post("/login",LoginUser);
app.get("/get-alluser",isLoggedIn, authorize("admin"),getAllUser);
app.patch("/users/role/:id",isLoggedIn,authorize('admin'),updateRole)
export default app;