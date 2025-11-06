import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as pricingController from '../controllers/pricing.controller';

const router = Router();

/**
 * All pricing routes require authentication
 */
router.use(authMiddleware);

/**
 * GET /api/v1/pricing
 * List all pricing tiers with filtering, sorting, and pagination
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/', pricingController.listPricing);

/**
 * POST /api/v1/pricing
 * Create a new pricing tier
 * Accessible by: ADMIN
 */
router.post('/', authorize('ADMIN'), pricingController.createPricing);

/**
 * GET /api/v1/pricing/:id
 * Get pricing tier details
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/:id', pricingController.getPricing);

/**
 * PUT /api/v1/pricing/:id
 * Update pricing tier
 * Accessible by: ADMIN
 */
router.put('/:id', authorize('ADMIN'), pricingController.updatePricing);

/**
 * DELETE /api/v1/pricing/:id
 * Delete pricing tier
 * Accessible by: ADMIN
 */
router.delete('/:id', authorize('ADMIN'), pricingController.deletePricing);

export default router;

