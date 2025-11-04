import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { validate } from "../middleware/validationMiddleware";
import { registerValidation } from "../validations/authValidation";


const authRoutes: Router = express.Router({ mergeParams: true });

// ✅ POST /api/register
authRoutes.post("/register", validate(registerValidation), registerUser);

// ✅ POST /api/login
authRoutes.post("/login", loginUser);

export default authRoutes;
