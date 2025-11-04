import express, { Router } from "express";
import { verifyAdmin, verifyUser } from "../middleware/authMiddleware";
import { createProductValidation, productUpdateValidation } from "../validations/productValidation";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import { validate } from "../middleware/validationMiddleware";


const productRoutes: Router = express.Router({ mergeParams: true });

// ✅ POST /api/products - Create new product (Admin only)
productRoutes.post(
  "/",
  verifyAdmin,
  validate(createProductValidation),
  addProduct
);

// ✅ GET /api/products - Get all products (User or Admin)
productRoutes.get("/", verifyUser, getProducts);

// ✅ PATCH /api/products/:id - Update product (Admin only)
productRoutes.patch(
  "/:id",
  verifyAdmin,
  validate(productUpdateValidation),
  updateProduct
);

// ✅ DELETE /api/products/:id - Delete product (Admin only)
productRoutes.delete("/:id", verifyAdmin, deleteProduct);

export default productRoutes;
