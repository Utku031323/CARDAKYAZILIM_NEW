import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

const JWT_SECRET: string = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_EXPIRY: string = process.env.JWT_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY: string = process.env.REFRESH_TOKEN_EXPIRY || '7d';

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRY as any,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  const options: SignOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRY as any,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokens = (payload: Omit<TokenPayload, 'iat' | 'exp'>): TokenResponse => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    expiresIn: JWT_EXPIRY,
  };
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Decode JWT token without verification (for debugging)
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

