import express from "express";
import { connectDB } from "./db.js";

;(async()=>{
    await connectDB();
})()
const app = express();

app.use(express.json());

app.get("/",function(req,res){
    res.send("hello world");
})

app.listen(3000,() => console.log("App is running on port 3000"));