import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      // Clean and user-friendly messages
      const errors = error.details.map((detail) =>
        detail.message.replace(/["]/g, "")
      );

      // If only one error, show as single string; otherwise show list
      res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors,
      });
      return; // stop execution
    }

    next();
  };