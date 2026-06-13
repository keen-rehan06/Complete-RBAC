import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin","seller","driver","delivery-boy"],
        default:"user"
    }
})

export const userModel = new mongoose.model("user",userSchema);