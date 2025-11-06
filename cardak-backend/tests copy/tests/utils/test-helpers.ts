import jwt from 'jsonwebtoken';

// Mock user data for testing
export const mockUsers = {
  admin: {
    id: 'admin-id-123',
    email: 'admin@cardak.com',
    name: 'Admin User',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  manager: {
    id: 'manager-id-456',
    email: 'manager@cardak.com',
    name: 'Manager User',
    role: 'MANAGER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  viewer: {
    id: 'viewer-id-789',
    email: 'viewer@cardak.com',
    name: 'Viewer User',
    role: 'VIEWER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Generate JWT token for testing
export const generateTestToken = (userId: string, role: string = 'ADMIN'): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret-key-for-testing-only',
    { expiresIn: '15m' }
  );
};

// Generate refresh token for testing
export const generateTestRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-key-for-testing-only',
    { expiresIn: '7d' }
  );
};

// Mock quote data
export const mockQuotes = {
  basic: {
    id: 'quote-id-1',
    companyName: 'Test Company',
    contactName: 'John Doe',
    email: 'john@test.com',
    phone: '+1234567890',
    packageType: 'STANDARD',
    quantity: 100,
    description: 'Test quote',
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Mock onboarding data
export const mockOnboarding = {
  basic: {
    id: 'onboarding-id-1',
    companyName: 'Test Company',
    email: 'company@test.com',
    phone: '+1234567890',
    status: 'PENDING',
    currentStep: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Mock payment data
export const mockPayments = {
  basic: {
    id: 'payment-id-1',
    quoteId: 'quote-id-1',
    amount: 1000,
    currency: 'USD',
    status: 'PENDING',
    stripePaymentIntentId: 'pi_test_123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Mock API key data
export const mockAPIKeys = {
  basic: {
    id: 'api-key-id-1',
    key: 'sk_test_abc123def456',
    name: 'Test API Key',
    permissions: JSON.stringify(['read', 'write']),
    isActive: true,
    expiresAt: null,
    createdBy: 'admin-id-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Wait helper for async operations
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Create mock request object
export const createMockRequest = (overrides = {}) => {
  return {
    headers: {},
    body: {},
    params: {},
    query: {},
    user: mockUsers.admin,
    ...overrides,
  };
};

// Create mock response object
export const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  return res;
};

// Create mock next function
export const createMockNext = () => jest.fn();

