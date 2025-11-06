import { PrismaClient, QuoteStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateQuoteRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  monthlyOrderCount: number;
  productTypes: string[]; // Will be stored as JSON string
  specialRequirements?: string;
  hasFragileItems?: boolean;
  needsCustomPackaging?: boolean;
  preferredStartDate?: string;
}

export interface UpdateQuoteRequest {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  monthlyOrderCount?: number;
  productTypes?: string[];
  specialRequirements?: string;
  hasFragileItems?: boolean;
  needsCustomPackaging?: boolean;
  preferredStartDate?: string;
  calculatedPrice?: number;
  notes?: string;
}

export interface QuoteListOptions {
  skip?: number;
  take?: number;
  status?: QuoteStatus;
  sortBy?: 'createdAt' | 'companyName' | 'monthlyOrderCount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Create a new quote
 */
export const createQuote = async (
  request: CreateQuoteRequest,
  userId: string
) => {
  try {
    const quote = await prisma.quote.create({
      data: {
        companyName: request.companyName,
        contactName: request.contactName,
        email: request.email,
        phone: request.phone,
        monthlyOrderCount: request.monthlyOrderCount,
        productTypes: JSON.stringify(request.productTypes),
        specialRequirements: request.specialRequirements,
        hasFragileItems: request.hasFragileItems || false,
        needsCustomPackaging: request.needsCustomPackaging || false,
        preferredStartDate: request.preferredStartDate,
        createdBy: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return {
      ...quote,
      productTypes: JSON.parse(quote.productTypes),
    };
  } catch (error) {
    console.error('Create quote error:', error);
    throw new Error('Failed to create quote');
  }
};

/**
 * Get quote by ID
 */
export const getQuoteById = async (quoteId: string) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!quote) {
      return null;
    }

    return {
      ...quote,
      productTypes: JSON.parse(quote.productTypes),
    };
  } catch (error) {
    console.error('Get quote error:', error);
    throw new Error('Failed to get quote');
  }
};

/**
 * List quotes with filtering, sorting, and pagination
 */
export const listQuotes = async (options: QuoteListOptions = {}) => {
  try {
    const {
      skip = 0,
      take = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const quotes = await prisma.quote.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.quote.count({ where });

    return {
      data: quotes.map((quote) => ({
        ...quote,
        productTypes: JSON.parse(quote.productTypes),
      })),
      pagination: {
        total,
        skip,
        take,
        pages: Math.ceil(total / take),
      },
    };
  } catch (error) {
    console.error('List quotes error:', error);
    throw new Error('Failed to list quotes');
  }
};

/**
 * Update quote
 */
export const updateQuote = async (
  quoteId: string,
  request: UpdateQuoteRequest
) => {
  try {
    const updateData: any = {};

    if (request.companyName !== undefined) updateData.companyName = request.companyName;
    if (request.contactName !== undefined) updateData.contactName = request.contactName;
    if (request.email !== undefined) updateData.email = request.email;
    if (request.phone !== undefined) updateData.phone = request.phone;
    if (request.monthlyOrderCount !== undefined) updateData.monthlyOrderCount = request.monthlyOrderCount;
    if (request.productTypes !== undefined) updateData.productTypes = JSON.stringify(request.productTypes);
    if (request.specialRequirements !== undefined) updateData.specialRequirements = request.specialRequirements;
    if (request.hasFragileItems !== undefined) updateData.hasFragileItems = request.hasFragileItems;
    if (request.needsCustomPackaging !== undefined) updateData.needsCustomPackaging = request.needsCustomPackaging;
    if (request.preferredStartDate !== undefined) updateData.preferredStartDate = request.preferredStartDate;
    if (request.calculatedPrice !== undefined) updateData.calculatedPrice = request.calculatedPrice;
    if (request.notes !== undefined) updateData.notes = request.notes;

    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return {
      ...quote,
      productTypes: JSON.parse(quote.productTypes),
    };
  } catch (error) {
    console.error('Update quote error:', error);
    throw new Error('Failed to update quote');
  }
};

/**
 * Update quote status
 */
export const updateQuoteStatus = async (
  quoteId: string,
  status: QuoteStatus
) => {
  try {
    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return {
      ...quote,
      productTypes: JSON.parse(quote.productTypes),
    };
  } catch (error) {
    console.error('Update quote status error:', error);
    throw new Error('Failed to update quote status');
  }
};

/**
 * Delete quote
 */
export const deleteQuote = async (quoteId: string) => {
  try {
    await prisma.quote.delete({
      where: { id: quoteId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete quote error:', error);
    throw new Error('Failed to delete quote');
  }
};

