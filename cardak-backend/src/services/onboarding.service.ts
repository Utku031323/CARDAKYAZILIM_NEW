import { PrismaClient, OnboardingStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateOnboardingRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface UpdateOnboardingRequest {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  currentStep?: number;
}

export interface OnboardingListOptions {
  skip?: number;
  take?: number;
  status?: OnboardingStatus;
  sortBy?: 'createdAt' | 'companyName' | 'currentStep';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Create a new onboarding submission
 */
export const createOnboarding = async (request: CreateOnboardingRequest, userId: string) => {
  const onboarding = await prisma.onboarding.create({
    data: {
      companyName: request.companyName,
      contactName: request.contactName,
      email: request.email,
      phone: request.phone,
      createdBy: userId,
      status: 'PENDING',
      currentStep: 1,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      steps: true,
    },
  });

  return onboarding;
};

/**
 * Get onboarding by ID with steps and documents
 */
export const getOnboardingById = async (onboardingId: string) => {
  const onboarding = await prisma.onboarding.findUnique({
    where: { id: onboardingId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      steps: {
        orderBy: { stepNumber: 'asc' },
      },
    },
  });

  return onboarding;
};

/**
 * List onboarding submissions with filtering, sorting, and pagination
 */
export const listOnboarding = async (options: OnboardingListOptions = {}) => {
  const skip = options.skip || 0;
  const take = options.take || 10;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const where: any = {};
  if (options.status) {
    where.status = options.status;
  }

  const [data, total] = await Promise.all([
    prisma.onboarding.findMany({
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
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
      },
    }),
    prisma.onboarding.count({ where }),
  ]);

  return {
    data,
    pagination: {
      total,
      skip,
      take,
      pages: Math.ceil(total / take),
    },
  };
};

/**
 * Update onboarding submission
 */
export const updateOnboarding = async (onboardingId: string, request: UpdateOnboardingRequest) => {
  const onboarding = await prisma.onboarding.update({
    where: { id: onboardingId },
    data: {
      ...(request.companyName && { companyName: request.companyName }),
      ...(request.contactName && { contactName: request.contactName }),
      ...(request.email && { email: request.email }),
      ...(request.phone && { phone: request.phone }),
      ...(request.currentStep !== undefined && { currentStep: request.currentStep }),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      steps: {
        orderBy: { stepNumber: 'asc' },
      },
    },
  });

  return onboarding;
};

/**
 * Update onboarding status
 */
export const updateOnboardingStatus = async (onboardingId: string, status: OnboardingStatus) => {
  const onboarding = await prisma.onboarding.update({
    where: { id: onboardingId },
    data: { status },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      steps: {
        orderBy: { stepNumber: 'asc' },
      },
    },
  });

  return onboarding;
};

/**
 * Delete onboarding submission (cascades to steps and documents)
 */
export const deleteOnboarding = async (onboardingId: string) => {
  await prisma.onboarding.delete({
    where: { id: onboardingId },
  });
};

/**
 * Add onboarding step
 */
export const addOnboardingStep = async (onboardingId: string, stepNumber: number, data?: any) => {
  const step = await prisma.onboardingStep.create({
    data: {
      onboardingId,
      stepNumber,
      data: data || null,
    },
  });

  return step;
};

/**
 * Update onboarding step
 */
export const updateOnboardingStep = async (stepId: string, data?: any, completedAt?: Date) => {
  const step = await prisma.onboardingStep.update({
    where: { id: stepId },
    data: {
      ...(data !== undefined && { data }),
      ...(completedAt !== undefined && { completedAt }),
    },
  });

  return step;
};

