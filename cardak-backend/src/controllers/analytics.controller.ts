import { Request, Response } from 'express';
import * as analyticsService from '../services/analytics.service';

/**
 * Parse date from query parameter
 */
const parseDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};

/**
 * Get quote analytics
 * GET /api/v1/analytics/quotes
 */
export const getQuoteAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const dateRange = {
      startDate: parseDate(startDate as string),
      endDate: parseDate(endDate as string),
    };

    const analytics = await analyticsService.getQuoteAnalytics(dateRange);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get quote analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get quote analytics',
      },
    });
  }
};

/**
 * Get onboarding analytics
 * GET /api/v1/analytics/onboarding
 */
export const getOnboardingAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const dateRange = {
      startDate: parseDate(startDate as string),
      endDate: parseDate(endDate as string),
    };

    const analytics = await analyticsService.getOnboardingAnalytics(dateRange);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get onboarding analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get onboarding analytics',
      },
    });
  }
};

/**
 * Get revenue analytics
 * GET /api/v1/analytics/revenue
 */
export const getRevenueAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const dateRange = {
      startDate: parseDate(startDate as string),
      endDate: parseDate(endDate as string),
    };

    const analytics = await analyticsService.getRevenueAnalytics(dateRange);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get revenue analytics',
      },
    });
  }
};

/**
 * Get dashboard analytics (combined)
 * GET /api/v1/analytics/dashboard
 */
export const getDashboardAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const dateRange = {
      startDate: parseDate(startDate as string),
      endDate: parseDate(endDate as string),
    };

    const analytics = await analyticsService.getDashboardAnalytics(dateRange);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get dashboard analytics',
      },
    });
  }
};

export default {
  getQuoteAnalytics,
  getOnboardingAnalytics,
  getRevenueAnalytics,
  getDashboardAnalytics,
};

