import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin","user","seller","driver"],
        default:"user"
    },
},{timestamps:true});

export const userModel = new mongoose.model("user",userSchema);