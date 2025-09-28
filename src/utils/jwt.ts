// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  sub: string; // userId
}

function getSecret() {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return env.JWT_SECRET; // string is a valid Secret
}

export function signJwt(
  payload: JwtPayload,
  expiresIn: string | number = "7d"
) {
  // spreading ensures object payload
  return jwt.sign({ ...payload }, getSecret(), { expiresIn });
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, getSecret()) as T;
}
