import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["ADMIN","USER","SELLER","SUB_ADMIN","SUPER_ADMIN"],
        default:"USER"
    },
    permission:{
        type:String,
        default: "VIEW_POST"
    }
},{timestamps:true});

export const userModel = new mongoose.model("user",userSchema);