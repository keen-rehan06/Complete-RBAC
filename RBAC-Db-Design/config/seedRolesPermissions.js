import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv({ ptah: "./.env" });

import {permissionModel} from "../models/permissionModel.js";
import {roleModel} from "../models/roleModel.js";

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


export const seedRolesPermissions = async (req,res) => {
try {
  
// Delete old data (optional)
await permissionModel.deleteMany({});
await roleModel.deleteMany({});

// Create Permission
const createdPermission = await permissionModel.insertMany(
  permissions.map((permission) => ({ name: permission })),
);

// Helper Function
const getPermissionIds = (permissionName) => {
  return createdPermission
    .filter((permission) => permissionName.includes(permission.name))
    .map((permission) => permission._id);
};

await roleModel.insertMany([
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