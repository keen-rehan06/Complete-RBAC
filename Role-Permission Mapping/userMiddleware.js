import { userModel } from "./userModel.js";
import jwt from "jsonwebtoken";
import { permission } from "./roles.js";

export const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .send({ message: "Please! Login First.", success: false });
  }
  try {
    const decoded = jwt.verify(token, "secret@123");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: "Invalid Token!", error });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).send({ message: "Access Denied" });
    }
    next();
  };
};

export const checkPermission = (permission) => {
  return async (req, res, next) => {
    const user = await userModel.findById(req.user.id);

    const rolePermission = user.permission;

    if (!rolePermission) {
      return res.status(403).send("Role not found");
    }

    if (!rolePermission.includes(permission)) {
      return res.status(403).send("Access Denied ❌");
    }

    next();
  };
};
