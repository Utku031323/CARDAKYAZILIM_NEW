import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as quoteController from '../controllers/quote.controller';

const router = Router();

/**
 * All quote routes require authentication
 */
router.use(authMiddleware);

/**
 * GET /api/v1/quotes
 * List all quotes with filtering, sorting, and pagination
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/', quoteController.listQuotes);

/**
 * POST /api/v1/quotes
 * Create a new quote
 * Accessible by: ADMIN, MANAGER
 */
router.post('/', authorize('ADMIN', 'MANAGER'), quoteController.createQuote);

/**
 * GET /api/v1/quotes/:id
 * Get quote details
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/:id', quoteController.getQuote);

/**
 * PUT /api/v1/quotes/:id
 * Update quote
 * Accessible by: ADMIN, MANAGER
 */
router.put('/:id', authorize('ADMIN', 'MANAGER'), quoteController.updateQuote);

/**
 * PUT /api/v1/quotes/:id/status
 * Update quote status
 * Accessible by: ADMIN, MANAGER
 */
router.put('/:id/status', authorize('ADMIN', 'MANAGER'), quoteController.updateQuoteStatus);

/**
 * DELETE /api/v1/quotes/:id
 * Delete quote
 * Accessible by: ADMIN
 */
router.delete('/:id', authorize('ADMIN'), quoteController.deleteQuote);

export default router;

