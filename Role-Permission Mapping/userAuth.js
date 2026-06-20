import { generateToken } from "./token.js";
import { userModel } from "./userModel.js";

export const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name||!email||!password) return res.status(401).send({message:"All fileds are required",success:false});
        const user = await userModel.create({
            name,
            email,
            password
        })
        return res.status(201).send({message:"User Created!",success:true,user});
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({message:"User Creation Failed!",error});
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email||!password) return res.status(401).send({message:"All fileds are required",success:false});
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).send({message:"User Not Found!",success:false});
          const token = generateToken(user);
        res.cookie("token",token);
        res.status(200).send({message:"User Logged In",success:true,user})
    } catch (error) {
         console.log(error.message);
        return res.status(401).send({message:"User LoggedIn Failed!",error});
    }
}