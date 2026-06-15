import { generateToken } from "./token.js";
import { userModel } from "./userModel.js";
import { ROLE_HIERARCHY } from "./role.js";

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

export const AssignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const admin = req.user;
    const allowedRules = ROLE_HIERARCHY[admin.role] || [];
    const user = await userModel.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User Not Found!", success: false });
       if (
  admin.role === "ADMIN" &&
  (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
) {
  return res.status(403).send({
    success: false,
    message: "You cannot modify this user."
  });
}

if (
  admin.role === "SUB_ADMIN" &&
  (
    user.role === "SUB_ADMIN" ||
    user.role === "ADMIN" ||
    user.role === "SUPER_ADMIN"
  )
) {
  return res.status(403).send({
    success: false,
    message: "You cannot modify this user."
  });
}
    if (!allowedRules.includes(role)) {
      return res
        .status(401)
        .send({
          message: "You are not allowed to assign this role.",
          success: false,
        });
    }
    user.role = role;
    await user.save();
    res
      .status(200)
      .send({
        message: "Role Applied Successfully!",
        success: true,
        data: user,
      });
  } catch (error) {
    return res.status(401).send({ message: error.message, success: false });
  }
};
