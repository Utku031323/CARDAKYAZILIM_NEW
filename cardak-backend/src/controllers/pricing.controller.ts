import { Request, Response } from 'express';
import { PricingStatus } from '@prisma/client';
import * as pricingService from '../services/pricing.service';

/**
 * Create a new pricing tier
 * POST /api/v1/pricing
 */
export const createPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, monthlyPrice, pricePerOrder, description, features, orderVolumeMin, orderVolumeMax } = req.body;

    // Validation
    if (!name || monthlyPrice === undefined || pricePerOrder === undefined || !description || !features || orderVolumeMin === undefined) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields: name, monthlyPrice, pricePerOrder, description, features, orderVolumeMin',
        },
      });
      return;
    }

    if (!Array.isArray(features) || features.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'features must be a non-empty array',
        },
      });
      return;
    }

    if (typeof monthlyPrice !== 'number' || typeof pricePerOrder !== 'number' || typeof orderVolumeMin !== 'number') {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'monthlyPrice, pricePerOrder, and orderVolumeMin must be numbers',
        },
      });
      return;
    }

    const pricing = await pricingService.createPricing({
      name,
      monthlyPrice,
      pricePerOrder,
      description,
      features,
      orderVolumeMin,
      orderVolumeMax,
    });

    res.status(201).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Create pricing controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create pricing tier',
      },
    });
  }
};

/**
 * Get pricing tier by ID
 * GET /api/v1/pricing/:id
 */
export const getPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const pricing = await pricingService.getPricingById(id);

    if (!pricing) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Pricing tier not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Get pricing controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get pricing tier',
      },
    });
  }
};

/**
 * List pricing tiers
 * GET /api/v1/pricing
 */
export const listPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skip = 0, take = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const options: any = {
      skip: parseInt(skip as string) || 0,
      take: Math.min(parseInt(take as string) || 10, 100), // Max 100 per page
      sortBy: (sortBy as string) || 'createdAt',
      sortOrder: (sortOrder as string) || 'desc',
    };

    if (status && Object.values(PricingStatus).includes(status as PricingStatus)) {
      options.status = status as PricingStatus;
    }

    const result = await pricingService.listPricing(options);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('List pricing controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to list pricing tiers',
      },
    });
  }
};

/**
 * Update pricing tier
 * PUT /api/v1/pricing/:id
 */
export const updatePricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if pricing exists
    const existingPricing = await pricingService.getPricingById(id);
    if (!existingPricing) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Pricing tier not found',
        },
      });
      return;
    }

    const pricing = await pricingService.updatePricing(id, req.body);

    res.status(200).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Update pricing controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update pricing tier',
      },
    });
  }
};

/**
 * Delete pricing tier
 * DELETE /api/v1/pricing/:id
 */
export const deletePricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if pricing exists
    const existingPricing = await pricingService.getPricingById(id);
    if (!existingPricing) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Pricing tier not found',
        },
      });
      return;
    }

    await pricingService.deletePricing(id);

    res.status(200).json({
      success: true,
      message: 'Pricing tier deleted successfully',
    });
  } catch (error) {
    console.error('Delete pricing controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete pricing tier',
      },
    });
  }
};

