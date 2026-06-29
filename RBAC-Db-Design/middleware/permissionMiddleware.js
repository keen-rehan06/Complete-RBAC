import { userModel } from "../models/userModel.js"

export const permissionsMiddleware = (...requiredPermissions) => {
   try {
    return (req,res,next) => {
     const user = await userModel.findById(req.user.id);
     const userPermissions = user.role.permissions.map((permission) =>permission.name);  
     const hashPermission = requiredPermissions.every((permission) => {
         userPermissions.includes(permission)
     })
     if(!hashPermission) return res.status(403).send({
     success:false,
     message:"Access Denied"
     })
     next();
    } 
   } catch (error) {
    console.log(error.message)
    return res.status({message:"Permission Failed!",success:false,error});
   }
} 
