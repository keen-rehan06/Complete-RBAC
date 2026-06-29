import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token)
      return res
        .status(401)
        .send({ message: "Token is not found", success: false });
    const decoded = jwt.verify(token, "sha256");
    const user = await userModel.findById(decoded.id).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });
    if (!user)
      return res
        .status(401)
        .send({ message: "User not found!", success: false });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
