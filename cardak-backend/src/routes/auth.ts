import express, { Router } from 'express';
import { login, logout, refresh, getCurrentUserInfo } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

/**
 * POST /api/v1/auth/login
 * Login with email and password
 */
router.post('/login', login);

/**
 * POST /api/v1/auth/logout
 * Logout user
 */
router.post('/logout', authMiddleware, logout);

/**
 * POST /api/v1/auth/refresh
 * Refresh access token
 */
router.post('/refresh', refresh);

/**
 * GET /api/v1/auth/me
 * Get current user info
 */
router.get('/me', authMiddleware, getCurrentUserInfo);

export default router;

