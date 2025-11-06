import { PrismaClient, PricingStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePricingRequest {
  name: string;
  monthlyPrice: number;
  pricePerOrder: number;
  description: string;
  features: string[]; // Will be stored as JSON string
  orderVolumeMin: number;
  orderVolumeMax?: number;
  status?: PricingStatus;
}

export interface UpdatePricingRequest {
  name?: string;
  monthlyPrice?: number;
  pricePerOrder?: number;
  description?: string;
  features?: string[];
  orderVolumeMin?: number;
  orderVolumeMax?: number;
  status?: PricingStatus;
}

export interface PricingListOptions {
  skip?: number;
  take?: number;
  status?: PricingStatus;
  sortBy?: 'createdAt' | 'name' | 'monthlyPrice' | 'orderVolumeMin';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Create a new pricing tier
 */
export const createPricing = async (request: CreatePricingRequest) => {
  const pricing = await prisma.pricingTier.create({
    data: {
      name: request.name,
      monthlyPrice: request.monthlyPrice,
      pricePerOrder: request.pricePerOrder,
      description: request.description,
      features: JSON.stringify(request.features),
      orderVolumeMin: request.orderVolumeMin,
      orderVolumeMax: request.orderVolumeMax,
      status: request.status || 'ACTIVE',
    },
  });

  // Parse features back to array
  return {
    ...pricing,
    features: JSON.parse(pricing.features),
  };
};

/**
 * Get pricing tier by ID
 */
export const getPricingById = async (pricingId: string) => {
  const pricing = await prisma.pricingTier.findUnique({
    where: { id: pricingId },
  });

  if (!pricing) {
    return null;
  }

  // Parse features back to array
  return {
    ...pricing,
    features: JSON.parse(pricing.features),
  };
};

/**
 * List pricing tiers with filtering, sorting, and pagination
 */
export const listPricing = async (options: PricingListOptions = {}) => {
  const skip = options.skip || 0;
  const take = options.take || 10;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const where: any = {};
  if (options.status) {
    where.status = options.status;
  }

  const [data, total] = await Promise.all([
    prisma.pricingTier.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.pricingTier.count({ where }),
  ]);

  // Parse features for all pricing tiers
  const parsedData = data.map((pricing) => ({
    ...pricing,
    features: JSON.parse(pricing.features),
  }));

  return {
    data: parsedData,
    pagination: {
      total,
      skip,
      take,
      pages: Math.ceil(total / take),
    },
  };
};

/**
 * Update pricing tier
 */
export const updatePricing = async (pricingId: string, request: UpdatePricingRequest) => {
  const updateData: any = {};

  if (request.name !== undefined) updateData.name = request.name;
  if (request.monthlyPrice !== undefined) updateData.monthlyPrice = request.monthlyPrice;
  if (request.pricePerOrder !== undefined) updateData.pricePerOrder = request.pricePerOrder;
  if (request.description !== undefined) updateData.description = request.description;
  if (request.features !== undefined) updateData.features = JSON.stringify(request.features);
  if (request.orderVolumeMin !== undefined) updateData.orderVolumeMin = request.orderVolumeMin;
  if (request.orderVolumeMax !== undefined) updateData.orderVolumeMax = request.orderVolumeMax;
  if (request.status !== undefined) updateData.status = request.status;

  const pricing = await prisma.pricingTier.update({
    where: { id: pricingId },
    data: updateData,
  });

  // Parse features back to array
  return {
    ...pricing,
    features: JSON.parse(pricing.features),
  };
};

/**
 * Delete pricing tier
 */
export const deletePricing = async (pricingId: string) => {
  await prisma.pricingTier.delete({
    where: { id: pricingId },
  });
};

/**
 * Get pricing by order volume
 */
export const getPricingByOrderVolume = async (orderCount: number) => {
  const pricing = await prisma.pricingTier.findFirst({
    where: {
      status: 'ACTIVE',
      orderVolumeMin: {
        lte: orderCount,
      },
      orderVolumeMax: {
        gte: orderCount,
      },
    },
    orderBy: {
      orderVolumeMin: 'desc',
    },
  });

  if (!pricing) {
    return null;
  }

  // Parse features back to array
  return {
    ...pricing,
    features: JSON.parse(pricing.features),
  };
};

/**
 * Get all active pricing tiers
 */
export const getActivePricing = async () => {
  const pricings = await prisma.pricingTier.findMany({
    where: {
      status: 'ACTIVE',
    },
    orderBy: {
      orderVolumeMin: 'asc',
    },
  });

  // Parse features for all pricing tiers
  return pricings.map((pricing) => ({
    ...pricing,
    features: JSON.parse(pricing.features),
  }));
};

