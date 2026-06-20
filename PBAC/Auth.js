import { generateToken } from "./token.js";
import {userModel}  from "./userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, department } = req.body;
    const user = await userModel.create({
      name,
      email,
      password,
      department,
    });
    return res
      .status(201)
      .send({ message: "User regesitered Successfully!!", user });
  } catch (error) {
    console.log(error.name);
    return res.status(401).send({ message: "Failed To Create User!", error });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const token = generateToken(user);
    res
      .status(200)
      .cookie("token", token)
      .send({ message: "Login Sucessfully!", user });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: "Failed To Login User!", error });
  }
};

export const getAllUser = async (req, res) => {
  const userId = req.user;
  const user = await userModel.findById(userId.id);
  res
    .status(200)
    .send({ message: `Welcome,Admin ${user.name}`, success: true });
};

export const isLoggedIn = async(req,res,next) => {
    let token;
    if(req.cookies.token) {
        token = req.cookies.token;
    }
    if(!token) return res.status(401).send({message:"token not found",success:false});
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = decoded;
      next()
    } catch (error) {
        // console.log(error.message)
        return res.status(401).send({message:error.message,error})
    }
}

export const checkPolicy = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId)
    const isManager = user.role === "manager" || "admin";
    const isHR = user.department === "HR";
    const officeHours =
      new Date().getHours() >= 6 && new Date().getHours() <= 18;
    if (isManager && isHR && officeHours) return next();
    return res.status(403).send({
      message: "Access Denied!"
    })
  } catch (error) {
    console.log(error.message);
    res.status(401).send({error});
  }
};
