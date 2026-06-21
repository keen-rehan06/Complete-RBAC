import { permission, ROLE_HIERARCHY } from "./roles.js";
import { generateToken } from "./token.js";
import { userModel } from "./userModel.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(401).send({ message: "All fileds are required", success: false });
        const user = await userModel.create({
            name,
            email,
            password,
        })
        return res.status(201).send({ message: "User Created!", success: true, user });
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({ message: "User Creation Failed!", error });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).send({ message: "All fileds are required", success: false });
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).send({ message: "User Not Found!", success: false });
        const token = generateToken(user);
        res.cookie("token", token);
        res.status(200).send({ message: "User Logged In", success: true, user })
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({ message: "User LoggedIn Failed!", error });
    }
}

export const assignRole = async((req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const admin = req.user;
        const allowedRoles = ROLE_HIERARCHY[admin.role] || [];
        const user = await userModel.findById(id);
        if (!user) return res.status(404).send({ message: "User not found", success: false });
        if (admin.role === "ADMIN" && user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
            return res.status(403).send({
                success: false,
                message: "You cannot modify this user."
            });
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
            if (!allowedRoles.includes(role)) {
                return res.status(401).send({
                    message: "You can not assign this role.",
                    success: false
                })
            }

            let rolePermissions;
            if (role === "ADMIN") {
                rolePermissions = permission.ADMIN;
            }
            else if (role === "SUB_ADMIN") {
                rolePermissions = permission.SUB_ADMIN
            }
            else if (role === "SELLER") {
                rolePermissions = permission.SELLER;
            }
            user.role = role;
            user.permission = rolePermissions;
            await user.save();
            res
                .status(200)
                .send({
                    message: "Role Applied Successfully!",
                    success: true,
                    data: user,
                });
        }
    } catch (error) {
        return res.status(401).send({ message: error.message, success: false });
    }
})