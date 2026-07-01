import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

connectDB();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/", authRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});