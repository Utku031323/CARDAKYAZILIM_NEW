import { PrismaClient } from '@prisma/client';
import { comparePassword } from '../utils/password';
import { generateTokens, verifyToken } from '../utils/jwt';

const prisma = new PrismaClient();

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Login user with email and password
 */
export const loginUser = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    const { email, password } = request;

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email and password are required',
        },
      };
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      };
    }

    // Check if user is active
    if (!user.isActive) {
      return {
        success: false,
        error: {
          code: 'USER_INACTIVE',
          message: 'User account is inactive',
        },
      };
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      };
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        ...tokens,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: {
        code: 'LOGIN_ERROR',
        message: 'An error occurred during login',
      },
    };
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  try {
    const { refreshToken } = request;

    if (!refreshToken) {
      return {
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Refresh token is required',
        },
      };
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      return {
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Refresh token is invalid or expired',
        },
      };
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isActive) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found or inactive',
        },
      };
    }

    // Generate new tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      data: tokens,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return {
      success: false,
      error: {
        code: 'REFRESH_ERROR',
        message: 'An error occurred during token refresh',
      },
    };
  }
};

/**
 * Get current user from token payload
 */
export const getCurrentUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

