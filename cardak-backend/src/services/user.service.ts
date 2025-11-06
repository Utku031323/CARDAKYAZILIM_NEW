import { PrismaClient, Role } from '@prisma/client';
import { hashPassword, validatePasswordStrength } from '../utils/password';

const prisma = new PrismaClient();

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export interface UpdateUserRequest {
  name?: string;
  role?: Role;
  isActive?: boolean;
}

/**
 * Create a new user
 */
export const createUser = async (request: CreateUserRequest) => {
  try {
    const { email, password, name, role = 'MANAGER' } = request;

    // Validate input
    if (!email || !password || !name) {
      throw new Error('Email, password, and name are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      throw new Error(`Password is too weak: ${passwordValidation.errors.join(', ')}`);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string) => {
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
    console.error('Get user error:', error);
    throw error;
  }
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
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
    console.error('Get user by email error:', error);
    throw error;
  }
};

/**
 * Update user
 */
export const updateUser = async (userId: string, request: UpdateUserRequest) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: request,
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
    console.error('Update user error:', error);
    throw error;
  }
};

/**
 * List all users
 */
export const listUsers = async (skip = 0, take = 10) => {
  try {
    const users = await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.user.count();

    return {
      users,
      total,
      skip,
      take,
    };
  } catch (error) {
    console.error('List users error:', error);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

