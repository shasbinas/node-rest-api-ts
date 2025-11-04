import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db"; // ✅ No .js extension in TS imports

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import studentRoutes from "./routes/studentRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));



// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/students", studentRoutes);

// ✅ Example test route (optional)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript server 👋");
});

// ✅ Error handler
app.use(errorHandler as unknown as (err: any, req: Request, res: Response, next: NextFunction) => void);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Process ID ${process.pid}: Server running on PORT ${PORT} in ${process.env.NODE_ENV} mode`);
});
