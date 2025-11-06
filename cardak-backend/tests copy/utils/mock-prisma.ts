import { mockUsers, mockQuotes, mockPayments, mockAPIKeys } from './test-helpers';

// Mock Prisma client for testing
export const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  quote: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  onboarding: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  payment: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  invoice: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  aPIKey: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  auditLog: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// Reset all mocks
export const resetMockPrisma = () => {
  Object.values(mockPrisma).forEach((model: any) => {
    Object.values(model).forEach((method: any) => {
      if (jest.isMockFunction(method)) {
        method.mockReset();
      }
    });
  });
};

// Setup default mock responses
export const setupDefaultMocks = () => {
  mockPrisma.user.findUnique.mockResolvedValue(mockUsers.admin);
  mockPrisma.user.findMany.mockResolvedValue([mockUsers.admin, mockUsers.manager, mockUsers.viewer]);
  mockPrisma.quote.findUnique.mockResolvedValue(mockQuotes.basic);
  mockPrisma.quote.findMany.mockResolvedValue([mockQuotes.basic]);
  mockPrisma.payment.findUnique.mockResolvedValue(mockPayments.basic);
  mockPrisma.payment.findMany.mockResolvedValue([mockPayments.basic]);
  mockPrisma.aPIKey.findUnique.mockResolvedValue(mockAPIKeys.basic);
  mockPrisma.aPIKey.findMany.mockResolvedValue([mockAPIKeys.basic]);
};

