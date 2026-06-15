import express from "express";
import {
  getAllUser,
  LoginUser,
  registerUser,
  AssignRole,
} from "./userController.js";
import { authorize, isLoggedIn } from "./userMiddleware.js";

const app = express.Router();

app.post("/register", registerUser);
app.post("/login", LoginUser);
app.get(
  "/get-alluser",
  isLoggedIn,
  authorize("ADMIN", "SUPER_ADMIN"),
  getAllUser,
);
app.patch(
  "/users/role/:id",
  isLoggedIn,
  authorize("ADMIN", "SUPER_ADMIN", "SUB_ADMIN"),
    AssignRole,
);
export default app;
