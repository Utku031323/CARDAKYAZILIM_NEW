import { Request, Response } from 'express';
import * as settingsService from '../services/settings.service';

/**
 * Get all settings
 * GET /api/v1/settings
 */
export const getAllSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await settingsService.getAllSettings();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Get all settings controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get settings',
      },
    });
  }
};

/**
 * Get setting by key
 * GET /api/v1/settings/:key
 */
export const getSettingByKey = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;

    const setting = await settingsService.getSettingByKey(key);

    if (!setting) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Setting not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Get setting by key controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get setting',
      },
    });
  }
};

/**
 * Update setting
 * PUT /api/v1/settings/:key
 */
export const updateSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (!value) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Value is required',
        },
      });
      return;
    }

    const setting = await settingsService.updateSetting(key, value);

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Update setting controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update setting',
      },
    });
  }
};

/**
 * Delete setting
 * DELETE /api/v1/settings/:key
 */
export const deleteSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;

    // Check if setting exists
    const existingSetting = await settingsService.getSettingByKey(key);
    if (!existingSetting) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Setting not found',
        },
      });
      return;
    }

    await settingsService.deleteSetting(key);

    res.status(200).json({
      success: true,
      message: 'Setting deleted successfully',
    });
  } catch (error) {
    console.error('Delete setting controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete setting',
      },
    });
  }
};

