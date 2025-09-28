import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  sub: string; // userId
}

export function signJwt(payload: JwtPayload, expiresIn: string = '7d') {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, env.JWT_SECRET) as T;
}
