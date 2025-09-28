import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  sub: string; // userId
}

function getSecret(): string {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return env.JWT_SECRET;
}

export function signJwt(payload: JwtPayload, expiresIn: string = "7d") {
  return jwt.sign(payload, getSecret(), { expiresIn });
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, getSecret()) as T;
}
