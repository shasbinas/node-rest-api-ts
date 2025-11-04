import express, { Router } from "express";
import { getUserByIdPublic, getUsers } from "../controllers/userController";

const userRoutes: Router = express.Router({ mergeParams: true });

// ✅ GET all users (optional filters)
userRoutes.get("/", getUsers);

// ✅ GET single user by ID (public)
userRoutes.get("/:id", getUserByIdPublic);

export default userRoutes;
