import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null
): void => {
  res.status(statusCode).json({ message, data, error: "" });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  error: string
): void => {
  res.status(statusCode).json({ message: "", data: null, error });
};
