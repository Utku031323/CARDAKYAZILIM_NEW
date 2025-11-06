import { Request, Response } from 'express';
import { QuoteStatus } from '@prisma/client';
import * as quoteService from '../services/quote.service';

/**
 * Create a new quote
 * POST /api/v1/quotes
 */
export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyName, contactName, email, phone, monthlyOrderCount, productTypes, ...rest } = req.body;

    // Validation
    if (!companyName || !contactName || !email || !phone || monthlyOrderCount === undefined || !productTypes) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields: companyName, contactName, email, phone, monthlyOrderCount, productTypes',
        },
      });
      return;
    }

    if (!Array.isArray(productTypes) || productTypes.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'productTypes must be a non-empty array',
        },
      });
      return;
    }

    const quote = await quoteService.createQuote(
      {
        companyName,
        contactName,
        email,
        phone,
        monthlyOrderCount,
        productTypes,
        ...rest,
      },
      req.user!.userId
    );

    res.status(201).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error('Create quote controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create quote',
      },
    });
  }
};

/**
 * Get quote by ID
 * GET /api/v1/quotes/:id
 */
export const getQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const quote = await quoteService.getQuoteById(id);

    if (!quote) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Quote not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error('Get quote controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get quote',
      },
    });
  }
};

/**
 * List quotes
 * GET /api/v1/quotes
 */
export const listQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skip = 0, take = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const options: any = {
      skip: parseInt(skip as string) || 0,
      take: Math.min(parseInt(take as string) || 10, 100), // Max 100 per page
      sortBy: (sortBy as string) || 'createdAt',
      sortOrder: (sortOrder as string) || 'desc',
    };

    if (status && Object.values(QuoteStatus).includes(status as QuoteStatus)) {
      options.status = status as QuoteStatus;
    }

    const result = await quoteService.listQuotes(options);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('List quotes controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to list quotes',
      },
    });
  }
};

/**
 * Update quote
 * PUT /api/v1/quotes/:id
 */
export const updateQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if quote exists
    const existingQuote = await quoteService.getQuoteById(id);
    if (!existingQuote) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Quote not found',
        },
      });
      return;
    }

    const quote = await quoteService.updateQuote(id, req.body);

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error('Update quote controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update quote',
      },
    });
  }
};

/**
 * Update quote status
 * PUT /api/v1/quotes/:id/status
 */
export const updateQuoteStatus = async (req: Request, res: Response): Promise<void> => {
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

    if (!Object.values(QuoteStatus).includes(status)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: `Invalid status. Must be one of: ${Object.values(QuoteStatus).join(', ')}`,
        },
      });
      return;
    }

    // Check if quote exists
    const existingQuote = await quoteService.getQuoteById(id);
    if (!existingQuote) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Quote not found',
        },
      });
      return;
    }

    const quote = await quoteService.updateQuoteStatus(id, status);

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error('Update quote status controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update quote status',
      },
    });
  }
};

/**
 * Delete quote
 * DELETE /api/v1/quotes/:id
 */
export const deleteQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if quote exists
    const existingQuote = await quoteService.getQuoteById(id);
    if (!existingQuote) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Quote not found',
        },
      });
      return;
    }

    await quoteService.deleteQuote(id);

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully',
    });
  } catch (error) {
    console.error('Delete quote controller error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete quote',
      },
    });
  }
};

