// src/utils/jwt.ts
import { sign, verify, type JwtPayload, type Secret, type SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRY as unknown as SignOptions['expiresIn']) || '7d';

export const generateToken = (payload: JwtPayload | string | Buffer): string => {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token: string): (JwtPayload & Record<string, unknown>) | string | null => {
  try {
    return verify(token, JWT_SECRET) as JwtPayload | string;
  } catch {
    return null;
  }
};

export const generateRefreshToken = (payload: JwtPayload | string | Buffer): string => {
  const REFRESH_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
  const REFRESH_EXPIRY: SignOptions['expiresIn'] = '30d';
  return sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
};