import e, { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.body.token;
  if (!token) {
    return res.status(401).send({ message: "Authorization token is required" });
  }
  try {
    const jwtSecret: string = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
  next();
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;
  if (user.role !== "ADMIN") {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;
  if (user.role !== "USER") {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};