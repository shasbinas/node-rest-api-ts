import express from "express";
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.ts";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Connect DB
await connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript ESM server 👋");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
