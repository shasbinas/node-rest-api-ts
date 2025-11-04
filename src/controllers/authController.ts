import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";


// ✅ Define a type for the JWT payload
interface JwtPayload {
  id: string;
  name: string;
  admin: boolean;
}

// ✅ Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  console.log(">>>> Register user function called");

  try {
    const { username, email, password, role, age } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Please fill all required fields" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
      age: age || null,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      age: user.age,
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        admin: user.role === "admin",
      } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
