import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  sub: string; // userId
}

function getSecret(): Secret {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  // jsonwebtoken's Secret type accepts string | Buffer | KeyObject
  return env.JWT_SECRET as Secret;
}

export function signJwt(
  payload: JwtPayload,
  expiresIn: string | number = "7d"
) {
  const options: SignOptions = { expiresIn };
  // Spread forces "object" payload and avoids any special-claim inference issues
  return jwt.sign({ ...payload }, getSecret(), options);
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, getSecret()) as T;
}
