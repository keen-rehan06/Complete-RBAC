import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin","user","seller","manager"],
        default:"user"
    },
    department:{
        type:String,
        enum:["HR","coder","tester"],
        default:"tester"
    } 
})

export const userModel = mongoose.model("user",userSchema);