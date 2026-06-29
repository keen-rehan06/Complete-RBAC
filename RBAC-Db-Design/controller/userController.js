import { userModel } from "../models/userModel.js";
import { roleModel } from "../models/roleModel.js";
import { generateToken } from "../config/generateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const employee = await roleModel.findOne({
      name: "EMPLOYEE",
    });
    if (!employeeRole) {
      return res.status(500).json({
        success: false,
        message: "Employee role not found",
      });
    }
    const user = await user.create({
      name,
      email,
      password,
      role: role._id,
    });
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const token = generateToken(user._id);

    res.status(200).cookie("token", token).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
     res.status(500).json({
      success: false,
      message: error.message
  })
};
}
