import { configDotenv } from "dotenv";
configDotenv({path:"./.env"});

import cookieParser from "cookie-parser";
import express from "express";
import { connectDB } from "./db.js";
import userRoute from "./userRoute.js"

;(async()=>{
    await connectDB();
})()
const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser())
app.use("/",userRoute)

app.get("/",function(req,res){
    res.send("hello world");
})

app.listen(3000,() => console.log("App is running on port 3000"));