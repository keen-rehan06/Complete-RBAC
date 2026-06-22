import express from "express";
import { assignRole, loginUser, registerUser } from "./userAuth.js";
import { authorize, checkPermission, isLoggedIn } from "./userMiddleware.js";

 const app = express.Router();

app.post("/register",registerUser);
app.post("/login",loginUser);
app.patch("/assign-role/:id",isLoggedIn,authorize("ADMIN","SUPER_ADMIN","SUB_ADMIN"),assignRole);
app.get("/create",isLoggedIn,checkPermission("CREATE_POST"),(req,res) => {
    res.send("Welcome! admin")
})

export default app;