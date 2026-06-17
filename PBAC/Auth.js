import { generateToken } from "./token.js";
import { userModel } from "./userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.create({
      name,
      email,
      password,
    });
    return res
      .status(201)
      .send({ message: "User regesitered Successfully!!", user });
  } catch (error) {
    console.log(error.name);
    return res.status(201).send({ message: "Failed To Create User!", error });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const token = generateToken(user);
    res
      .status(200)
      .cookie("token", token)
      .send({ message: "Login Sucessfully!", user });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: "Failed To Login User!", error });
  }
};

export const getAllUser = async (req, res) => {
  const userId = req.user;
  const user = await userModel.findById(userId.id);
  res
    .status(200)
    .send({ message: `Welcome,Admin ${user.name}`, success: true });
};
