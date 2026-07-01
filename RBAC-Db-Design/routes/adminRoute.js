import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { permissionsMiddleware } from "../middleware/permissionMiddleware.js";
import {
  createProduct,
  deleteProduct,
  viewProduct,
} from "../controller/adminController.js";

 const app = express.Router();

app.get(
  "/create-product",
  authMiddleware,
  permissionsMiddleware("CREATE_PRODUCT"),
  createProduct,
);

app.delete(
  "/delete-product",
  authMiddleware,
  permissionsMiddleware("DELETE_PRODUCT"),
  deleteProduct,
);

app.get(
  "/view-product",
  authMiddleware,
  permissionsMiddleware("VIEW_PRODUCT"),
  viewProduct,
);

export default app;