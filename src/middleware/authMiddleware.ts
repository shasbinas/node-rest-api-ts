import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ Extend Express Request type to include `user`
export interface AuthRequest extends Request {
  user?: string | JwtPayload | { id: string; name: string; admin: boolean };
}

// ✅ Middleware: Verify token
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization; // e.g. "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // attach decoded user info
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware: Verify admin user
export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (req.user && typeof req.user === "object" && "admin" in req.user && req.user.admin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Admins only" });
    }
  });
};

// ✅ Middleware: Verify any logged-in user
export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    next(); // any valid user
  });
};