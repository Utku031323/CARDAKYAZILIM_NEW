import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as settingsController from '../controllers/settings.controller';

const router = Router();

/**
 * All settings routes require authentication
 */
router.use(authMiddleware);

/**
 * GET /api/v1/settings
 * List all settings
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/', settingsController.getAllSettings);

/**
 * GET /api/v1/settings/:key
 * Get setting by key
 * Accessible by: ADMIN, MANAGER, VIEWER
 */
router.get('/:key', settingsController.getSettingByKey);

/**
 * PUT /api/v1/settings/:key
 * Update setting
 * Accessible by: ADMIN
 */
router.put('/:key', authorize('ADMIN'), settingsController.updateSetting);

/**
 * DELETE /api/v1/settings/:key
 * Delete setting
 * Accessible by: ADMIN
 */
router.delete('/:key', authorize('ADMIN'), settingsController.deleteSetting);

export default router;

