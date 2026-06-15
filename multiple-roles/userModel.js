import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: [
      "USER",
      "DELIVERY_BOY",
      "SELLER",
      "SUB_ADMIN",
      "ADMIN",
      "SUPER_ADMIN",
    ],
    default: "USER",
  },
});

export const userModel = new mongoose.model("user", userSchema);
