import cookieParser from "cookie-parser";
import express from "express";
import AuthRoute from "./userRoute.js"
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/RPM');
const app = express();

app.use(express.json({}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/", AuthRoute);

app.get("/",function(req,res){
    console.log("Hello!!")
})

app.listen(3000,() => {
    console.log('App is running on port 3000.')
});