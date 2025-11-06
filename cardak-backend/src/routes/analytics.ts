import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

/**
 * All analytics routes require authentication and ADMIN/MANAGER role
 */
router.use(authMiddleware);
router.use(authorize('ADMIN', 'MANAGER'));

/**
 * GET /api/v1/analytics/quotes
 * Get quote analytics with optional date range filtering
 * Query parameters:
 *   - startDate: ISO date string (e.g., 2025-01-01)
 *   - endDate: ISO date string (e.g., 2025-12-31)
 * Accessible by: ADMIN, MANAGER
 */
router.get('/quotes', analyticsController.getQuoteAnalytics);

/**
 * GET /api/v1/analytics/onboarding
 * Get onboarding analytics with optional date range filtering
 * Query parameters:
 *   - startDate: ISO date string
 *   - endDate: ISO date string
 * Accessible by: ADMIN, MANAGER
 */
router.get('/onboarding', analyticsController.getOnboardingAnalytics);

/**
 * GET /api/v1/analytics/revenue
 * Get revenue analytics with optional date range filtering
 * Query parameters:
 *   - startDate: ISO date string
 *   - endDate: ISO date string
 * Accessible by: ADMIN, MANAGER
 */
router.get('/revenue', analyticsController.getRevenueAnalytics);

/**
 * GET /api/v1/analytics/dashboard
 * Get combined dashboard analytics with optional date range filtering
 * Query parameters:
 *   - startDate: ISO date string
 *   - endDate: ISO date string
 * Accessible by: ADMIN, MANAGER
 */
router.get('/dashboard', analyticsController.getDashboardAnalytics);

export default router;

