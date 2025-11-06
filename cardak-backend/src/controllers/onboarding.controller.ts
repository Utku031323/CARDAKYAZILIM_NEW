import { Request, Response } from 'express';
import { OnboardingStatus } from '@prisma/client';
import * as onboardingService from '../services/onboarding.service';

/**
 * Create a new onboarding submission
 * POST /api/v1/onboarding
 */
export const createOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyName, contactName, email, phone } = req.body;

    // Validation
    if (!companyName || !contactName || !email || !phone) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields: companyName, contactName, email, phone',
        },
      });
      return;
    }

    const onboarding = await onboardingService.createOnboarding(
      { companyName, contactName, email, phone },
      req.user!.userId
    );

    res.status(201).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error('Create onboarding controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create onboarding',
      },
    });
  }
};

/**
 * Get onboarding by ID
 * GET /api/v1/onboarding/:id
 */
export const getOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const onboarding = await onboardingService.getOnboardingById(id);

    if (!onboarding) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Onboarding not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error('Get onboarding controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get onboarding',
      },
    });
  }
};

/**
 * List onboarding submissions
 * GET /api/v1/onboarding
 */
export const listOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skip = 0, take = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const options: any = {
      skip: parseInt(skip as string) || 0,
      take: Math.min(parseInt(take as string) || 10, 100), // Max 100 per page
      sortBy: (sortBy as string) || 'createdAt',
      sortOrder: (sortOrder as string) || 'desc',
    };

    if (status && Object.values(OnboardingStatus).includes(status as OnboardingStatus)) {
      options.status = status as OnboardingStatus;
    }

    const result = await onboardingService.listOnboarding(options);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('List onboarding controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to list onboarding',
      },
    });
  }
};

/**
 * Update onboarding
 * PUT /api/v1/onboarding/:id
 */
export const updateOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if onboarding exists
    const existingOnboarding = await onboardingService.getOnboardingById(id);
    if (!existingOnboarding) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Onboarding not found',
        },
      });
      return;
    }

    const onboarding = await onboardingService.updateOnboarding(id, req.body);

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error('Update onboarding controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update onboarding',
      },
    });
  }
};

/**
 * Update onboarding status
 * PUT /api/v1/onboarding/:id/status
 */
export const updateOnboardingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Status is required',
        },
      });
      return;
    }

    if (!Object.values(OnboardingStatus).includes(status)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: `Invalid status. Must be one of: ${Object.values(OnboardingStatus).join(', ')}`,
        },
      });
      return;
    }

    // Check if onboarding exists
    const existingOnboarding = await onboardingService.getOnboardingById(id);
    if (!existingOnboarding) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Onboarding not found',
        },
      });
      return;
    }

    const onboarding = await onboardingService.updateOnboardingStatus(id, status);

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error('Update onboarding status controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update onboarding status',
      },
    });
  }
};

/**
 * Delete onboarding
 * DELETE /api/v1/onboarding/:id
 */
export const deleteOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if onboarding exists
    const existingOnboarding = await onboardingService.getOnboardingById(id);
    if (!existingOnboarding) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Onboarding not found',
        },
      });
      return;
    }

    await onboardingService.deleteOnboarding(id);

    res.status(200).json({
      success: true,
      message: 'Onboarding deleted successfully',
    });
  } catch (error) {
    console.error('Delete onboarding controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete onboarding',
      },
    });
  }
};

