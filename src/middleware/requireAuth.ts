// src/middlewares/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.slice(7); // remove "Bearer "

  try {
    const payload = verifyJwt(token) as { sub: string };
    (req as any).userId = payload.sub; // 👈 this is what `me` uses
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
