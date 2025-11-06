import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export interface QuoteAnalytics {
  totalQuotes: number;
  quotesByStatus: {
    PENDING: number;
    REVIEWED: number;
    QUOTED: number;
    ACCEPTED: number;
    REJECTED: number;
  };
  conversionRate: number; // ACCEPTED / total
  averageOrderCount: number;
}

export interface OnboardingAnalytics {
  totalOnboarding: number;
  onboardingByStatus: {
    PENDING: number;
    IN_PROGRESS: number;
    COMPLETED: number;
    REJECTED: number;
  };
  completionRate: number; // COMPLETED / total
  averageTimeToComplete: number; // in days
}

export interface RevenueAnalytics {
  totalRevenue: number;
  revenueByPricingTier: Array<{
    tierName: string;
    monthlyPrice: number;
    count: number;
    totalRevenue: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    revenue: number;
    quoteCount: number;
  }>;
}

export interface DashboardAnalytics {
  quotes: QuoteAnalytics;
  onboarding: OnboardingAnalytics;
  revenue: RevenueAnalytics;
  summary: {
    totalQuotes: number;
    totalOnboarding: number;
    totalRevenue: number;
    conversionRate: number;
    completionRate: number;
  };
}

/**
 * Get quote analytics
 */
export const getQuoteAnalytics = async (dateRange?: DateRange): Promise<QuoteAnalytics> => {
  const where: any = {};

  if (dateRange?.startDate || dateRange?.endDate) {
    where.createdAt = {};
    if (dateRange.startDate) where.createdAt.gte = dateRange.startDate;
    if (dateRange.endDate) where.createdAt.lte = dateRange.endDate;
  }

  const quotes = await prisma.quote.findMany({ where });

  const quotesByStatus = {
    PENDING: quotes.filter((q) => q.status === 'PENDING').length,
    REVIEWED: quotes.filter((q) => q.status === 'REVIEWED').length,
    QUOTED: quotes.filter((q) => q.status === 'QUOTED').length,
    ACCEPTED: quotes.filter((q) => q.status === 'ACCEPTED').length,
    REJECTED: quotes.filter((q) => q.status === 'REJECTED').length,
  };

  const totalQuotes = quotes.length;
  const acceptedQuotes = quotesByStatus.ACCEPTED;
  const conversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;
  const averageOrderCount = totalQuotes > 0 ? quotes.reduce((sum, q) => sum + q.monthlyOrderCount, 0) / totalQuotes : 0;

  return {
    totalQuotes,
    quotesByStatus,
    conversionRate: Math.round(conversionRate * 100) / 100,
    averageOrderCount: Math.round(averageOrderCount * 100) / 100,
  };
};

/**
 * Get onboarding analytics
 */
export const getOnboardingAnalytics = async (dateRange?: DateRange): Promise<OnboardingAnalytics> => {
  const where: any = {};

  if (dateRange?.startDate || dateRange?.endDate) {
    where.createdAt = {};
    if (dateRange.startDate) where.createdAt.gte = dateRange.startDate;
    if (dateRange.endDate) where.createdAt.lte = dateRange.endDate;
  }

  const onboarding = await prisma.onboarding.findMany({ where });

  const onboardingByStatus = {
    PENDING: onboarding.filter((o) => o.status === 'PENDING').length,
    IN_PROGRESS: onboarding.filter((o) => o.status === 'IN_PROGRESS').length,
    COMPLETED: onboarding.filter((o) => o.status === 'COMPLETED').length,
    REJECTED: onboarding.filter((o) => o.status === 'REJECTED').length,
  };

  const totalOnboarding = onboarding.length;
  const completedOnboarding = onboardingByStatus.COMPLETED;
  const completionRate = totalOnboarding > 0 ? (completedOnboarding / totalOnboarding) * 100 : 0;

  // Calculate average time to complete
  const completedItems = onboarding.filter((o) => o.status === 'COMPLETED');
  let averageTimeToComplete = 0;
  if (completedItems.length > 0) {
    const totalTime = completedItems.reduce((sum, o) => {
      const timeDiff = o.updatedAt.getTime() - o.createdAt.getTime();
      return sum + timeDiff;
    }, 0);
    averageTimeToComplete = totalTime / completedItems.length / (1000 * 60 * 60 * 24); // Convert to days
  }

  return {
    totalOnboarding,
    onboardingByStatus,
    completionRate: Math.round(completionRate * 100) / 100,
    averageTimeToComplete: Math.round(averageTimeToComplete * 100) / 100,
  };
};

/**
 * Get revenue analytics
 */
export const getRevenueAnalytics = async (dateRange?: DateRange): Promise<RevenueAnalytics> => {
  const where: any = { status: 'ACCEPTED' };

  if (dateRange?.startDate || dateRange?.endDate) {
    where.createdAt = {};
    if (dateRange.startDate) where.createdAt.gte = dateRange.startDate;
    if (dateRange.endDate) where.createdAt.lte = dateRange.endDate;
  }

  const acceptedQuotes = await prisma.quote.findMany({ where });
  const pricingTiers = await prisma.pricingTier.findMany();

  // Calculate revenue by pricing tier
  const revenueByPricingTier = pricingTiers.map((tier) => {
    const matchingQuotes = acceptedQuotes.filter((q) => {
      const orderCount = q.monthlyOrderCount;
      return orderCount >= tier.orderVolumeMin && (!tier.orderVolumeMax || orderCount <= tier.orderVolumeMax);
    });

    const totalRevenue = matchingQuotes.length * tier.monthlyPrice;

    return {
      tierName: tier.name,
      monthlyPrice: tier.monthlyPrice,
      count: matchingQuotes.length,
      totalRevenue,
    };
  });

  // Calculate monthly trends
  const monthlyTrends: { [key: string]: { revenue: number; quoteCount: number } } = {};

  acceptedQuotes.forEach((quote) => {
    const monthKey = quote.createdAt.toISOString().substring(0, 7); // YYYY-MM

    if (!monthlyTrends[monthKey]) {
      monthlyTrends[monthKey] = { revenue: 0, quoteCount: 0 };
    }

    monthlyTrends[monthKey].quoteCount += 1;

    // Find matching pricing tier
    const matchingTier = pricingTiers.find((tier) => {
      const orderCount = quote.monthlyOrderCount;
      return orderCount >= tier.orderVolumeMin && (!tier.orderVolumeMax || orderCount <= tier.orderVolumeMax);
    });

    if (matchingTier) {
      monthlyTrends[monthKey].revenue += matchingTier.monthlyPrice;
    }
  });

  const monthlyTrendsArray = Object.entries(monthlyTrends)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      ...data,
    }));

  const totalRevenue = revenueByPricingTier.reduce((sum, tier) => sum + tier.totalRevenue, 0);

  return {
    totalRevenue,
    revenueByPricingTier,
    monthlyTrends: monthlyTrendsArray,
  };
};

/**
 * Get dashboard analytics (combined)
 */
export const getDashboardAnalytics = async (dateRange?: DateRange): Promise<DashboardAnalytics> => {
  const quotes = await getQuoteAnalytics(dateRange);
  const onboarding = await getOnboardingAnalytics(dateRange);
  const revenue = await getRevenueAnalytics(dateRange);

  return {
    quotes,
    onboarding,
    revenue,
    summary: {
      totalQuotes: quotes.totalQuotes,
      totalOnboarding: onboarding.totalOnboarding,
      totalRevenue: revenue.totalRevenue,
      conversionRate: quotes.conversionRate,
      completionRate: onboarding.completionRate,
    },
  };
};

export default {
  getQuoteAnalytics,
  getOnboardingAnalytics,
  getRevenueAnalytics,
  getDashboardAnalytics,
};

