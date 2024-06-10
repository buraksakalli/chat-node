import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
