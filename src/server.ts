import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db"; // PostgreSQL connection
// import authRoutes from "./routes/authRoutes";
// import userRoutes from "./routes/userRoutes";
// import productRoutes from "./routes/productRoutes";
// import studentRoutes from "./routes/studentRoutes";
// import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Database connection
connectDB();

// Routes
// app.use("/api", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/students", studentRoutes);

// Error Handler
// app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (PID: ${process.pid})`);
});
