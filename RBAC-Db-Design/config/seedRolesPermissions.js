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


const seedRolesPermissions = async (req,res) => {
try {
  
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
    .map((permission) => permission._id);
};

await Role.insertMany([
  {
    name: "ADMIN",
    permissions: getPermissionIds(permissions),
  },
  {
    name: "MANAGER",
    permissions: getPermissionIds([
      "VIEW_USER",
      "VIEW_PRODUCT",
      "CREATE_PRODUCT",
      "UPDATE_PRODUCT",
    ]),
  },
  {
    name:"EMPLOYEE",
    permissions:getPermissionIds([
      "VIEW_PRODUCT"
    ])
  }
]);
res.status(201).send({message:"Roles Created Successfully",success:true})
} catch (error) {
  console.log(error.message);
res.status(500).send({message:"Roles Creation Failed!",success:false,error})
}
}