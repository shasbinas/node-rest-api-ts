import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/User";

// ✅ Get all users (with filters)
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: Record<string, any> = {};

    // Age filter
    if (req.query.age) {
      query.age = Number(req.query.age);
    }

    // Role filter (case-insensitive)
    if (req.query.role) {
      query.role = { $regex: new RegExp(`^${(req.query.role as string).trim()}$`, "i") };
    }

    console.log("Final Query:", query);

    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// ✅ Get a single user by ID (public)
export const getUserByIdPublic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id.trim();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const user: IUser | null = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ message: `User with ID ${userId} not found` });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
