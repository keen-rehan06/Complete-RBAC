import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/rbac`);
        console.log("MongoDb Connected✅")
    } catch (error) {
        console.log("MongoDb Connection Failed❌",error)
        }
}