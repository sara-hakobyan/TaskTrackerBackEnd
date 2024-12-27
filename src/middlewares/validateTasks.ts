import { Request, Response, NextFunction } from "express";

export const validateTaskInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, completed } = req.body;

  if ("completed" in req.body && typeof completed == "boolean") {
    next();
    return;
  }

  if (!title) {
    res.status(400).json({ error: "Title and color are required." });
    return;
  }

  next();
};
