import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json({}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",function(req,res){
    console.log("Hello!!")
})

app.listen(3000,() => {
    console.log('App is running on port 3000.')
});