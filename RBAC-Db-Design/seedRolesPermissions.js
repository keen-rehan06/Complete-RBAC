import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv({ ptah: "./.env" });

import Permission from "../models/permission.model.js";
import Role from "../models/role.model.js";

const permissions = [
  "CREATE_USER",
  "UPDATE_USER",
  "DELETE_USER",
  "VIEW_USER",
  "CREATE_PRODUCT",
  "UPDATE_PRODUCT",
  "DELETE_PRODUCT",
  "VIEW_PRODUCT",
];

// Delete old data (optional)
await Permission.deleteMany({});
await Role.deleteMany({});

// Create Permission
const createdPermission = await Permission.insertMany(
  permissions.map((permission) => ({ name: permission })),
);

// Helper Function
const getPermissionIds = (permissionName) => {
    return createdPermission
    .filter((permission) => permissionName.includes(permission.name))
    .map((permission) => permission._id)
}