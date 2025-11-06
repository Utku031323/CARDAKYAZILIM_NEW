import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as onboardingController from '../controllers/onboarding.controller';

const router = Router();

/**
 * All onboarding routes require authentication
 */
router.use(authMiddleware);

/**
 * GET /api/v1/onboarding
 * List all onboarding submissions with filtering, sorting, and pagination
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/', onboardingController.listOnboarding);

/**
 * POST /api/v1/onboarding
 * Create a new onboarding submission
 * Accessible by: ADMIN, MANAGER
 */
router.post('/', authorize('ADMIN', 'MANAGER'), onboardingController.createOnboarding);

/**
 * GET /api/v1/onboarding/:id
 * Get onboarding details (including steps and documents)
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/:id', onboardingController.getOnboarding);

/**
 * PUT /api/v1/onboarding/:id
 * Update onboarding submission
 * Accessible by: ADMIN, MANAGER
 */
router.put('/:id', authorize('ADMIN', 'MANAGER'), onboardingController.updateOnboarding);

/**
 * PUT /api/v1/onboarding/:id/status
 * Update onboarding status
 * Accessible by: ADMIN, MANAGER
 */
router.put('/:id/status', authorize('ADMIN', 'MANAGER'), onboardingController.updateOnboardingStatus);

/**
 * DELETE /api/v1/onboarding/:id
 * Delete onboarding submission
 * Accessible by: ADMIN
 */
router.delete('/:id', authorize('ADMIN'), onboardingController.deleteOnboarding);

export default router;

