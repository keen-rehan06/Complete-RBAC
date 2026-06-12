import { userModel } from "./userModel.js";
import jwt from "jsonwebtoken";

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

export const isAdmin = async(req,res,next) => {
        if(req.user.role !== "admin"){
            return res.status(401).send({
                message:"Only Admin Can Access",
                sucess:false
            })
        }
        next();    
}