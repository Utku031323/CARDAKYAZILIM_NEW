# Test Structure & Organization

## 📁 Directory Structure

```
cardak-backend/
├── tests/
│   ├── setup.ts                          # Global test setup
│   ├── utils/
│   │   ├── test-helpers.ts              # Mock data and utilities
│   │   └── mock-prisma.ts               # Prisma client mocks
│   ├── unit/
│   │   ├── middleware/
│   │   │   └── auth.middleware.test.ts  # Authentication tests
│   │   └── validation/
│   │       └── input-validation.test.ts # Input validation tests
│   ├── integration/                      # (Ready for implementation)
│   ├── e2e/                             # (Ready for implementation)
│   ├── security/                        # (Ready for implementation)
│   └── performance/                     # (Ready for implementation)
├── jest.config.js                        # Jest configuration
├── TESTING_GUIDE.md                      # Testing documentation
├── WEEK_13_TEST_SUMMARY.md              # Test summary
├── WEEK_13_COMPLETION_REPORT.md         # Completion report
└── TEST_STRUCTURE.md                     # This file
```

---

## 🧪 Test Categories

### 1. Unit Tests (`tests/unit/`)
Tests for individual functions and utilities in isolation.

#### Middleware Tests
- **File:** `tests/unit/middleware/auth.middleware.test.ts`
- **Tests:** 20
- **Coverage:**
  - Token generation and validation
  - Mock object creation
  - Request/response mocking
  - User role management
  - JWT structure validation

#### Validation Tests
- **File:** `tests/unit/validation/input-validation.test.ts`
- **Tests:** 23
- **Coverage:**
  - Email validation
  - Password validation
  - Phone number validation
  - Company name validation
  - Quantity and amount validation
  - Status validation
  - URL validation
  - XSS prevention
  - SQL injection prevention

### 2. Integration Tests (`tests/integration/`)
Tests for API endpoints with authentication and database operations.

**Ready for implementation:**
- Auth endpoints
- Quote endpoints
- Onboarding endpoints
- Payment endpoints
- API key endpoints

### 3. End-to-End Tests (`tests/e2e/`)
Tests for complete user workflows.

**Ready for implementation:**
- Quote creation → Onboarding → Payment workflow
- Authentication flow (login → refresh → logout)
- Multi-step business processes

### 4. Security Tests (`tests/security/`)
Tests for security features and vulnerabilities.

**Ready for implementation:**
- Authentication and authorization
- Input validation and sanitization
- Rate limiting effectiveness
- SQL injection prevention
- XSS prevention

### 5. Performance Tests (`tests/performance/`)
Tests for API response times and efficiency.

**Ready for implementation:**
- Response time benchmarks
- Bulk operations
- Concurrent requests
- Memory usage
- Query optimization

---

## 🛠️ Test Utilities

### Mock Data (`tests/utils/test-helpers.ts`)

#### User Mocks
```typescript
mockUsers.admin    // { id, email, role: 'ADMIN' }
mockUsers.manager  // { id, email, role: 'MANAGER' }
mockUsers.viewer   // { id, email, role: 'VIEWER' }
```

#### Helper Functions
```typescript
generateTestToken(userId, role)      // Generate JWT token
createMockRequest(options)           // Create mock Express request
createMockResponse()                 // Create mock Express response
createMockNext()                     // Create mock next function
```

### Prisma Mocks (`tests/utils/mock-prisma.ts`)
```typescript
mockPrisma.user      // User model mock
mockPrisma.quote     // Quote model mock
mockPrisma.payment   // Payment model mock
mockPrisma.aPIKey    // API Key model mock
// ... other models
```

---

## 📝 Test File Template

### Basic Test Structure
```typescript
describe('Feature Name', () => {
  describe('Specific Functionality', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test data';
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe('expected output');
    });
  });
});
```

### With Setup/Teardown
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should test something', () => {
    // Test code
  });
});
```

---

## 🚀 Running Tests

### All Tests
```bash
npm run test
```

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm run test -- tests/unit/middleware/auth.middleware.test.ts
```

### Specific Test Suite
```bash
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # E2E tests only
```

### With Pattern Matching
```bash
npm run test -- --testNamePattern="should validate email"
```

---

## 📊 Test Statistics

### Current Status
- **Total Tests:** 43
- **Passing:** 43 (100%)
- **Failing:** 0
- **Skipped:** 0
- **Execution Time:** ~7 seconds

### Test Breakdown
- Unit Tests: 43
- Integration Tests: 0 (ready for implementation)
- E2E Tests: 0 (ready for implementation)
- Security Tests: 0 (ready for implementation)
- Performance Tests: 0 (ready for implementation)

---

## 🎯 Coverage Goals

### Current Coverage
- Statements: 0% (utility functions only)
- Branches: 0% (utility functions only)
- Functions: 0% (utility functions only)
- Lines: 0% (utility functions only)

### Target Coverage (Phase 2)
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

---

## 📚 Test Examples

### Example 1: Email Validation Test
```typescript
it('should validate correct email format', () => {
  const validEmails = [
    'admin@cardak.com',
    'user@example.com',
  ];

  validEmails.forEach((email) => {
    expect(emailRegex.test(email)).toBe(true);
  });
});
```

### Example 2: Token Generation Test
```typescript
it('should generate valid JWT token', () => {
  const token = generateTestToken(mockUsers.admin.id, 'ADMIN');
  
  expect(token).toBeTruthy();
  expect(token.split('.').length).toBe(3); // JWT has 3 parts
});
```

### Example 3: Mock Request Test
```typescript
it('should mock request with custom data', () => {
  const customReq = createMockRequest({
    body: { email: 'test@example.com' },
  });
  
  expect(customReq.body.email).toBe('test@example.com');
});
```

---

## 🔍 Debugging Tests

### Enable Verbose Output
```bash
npm run test -- --verbose
```

### Run Single Test
```bash
npm run test -- --testNamePattern="specific test name"
```

### Debug with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### View Test Coverage
```bash
npm run test:coverage
# Coverage report in: coverage/
```

---

## ✅ Best Practices

1. **Test Naming**
   - Use descriptive names
   - Start with "should"
   - Example: "should validate email format"

2. **Test Organization**
   - Group related tests with `describe()`
   - Use `beforeEach()` for setup
   - Use `afterEach()` for cleanup

3. **Assertions**
   - Use meaningful assertions
   - Test both success and failure cases
   - Keep assertions simple and focused

4. **Mocking**
   - Mock external dependencies
   - Reset mocks between tests
   - Use centralized mock data

5. **Documentation**
   - Add comments for complex tests
   - Document test purpose
   - Include examples

---

## 🔗 Related Documentation

- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Comprehensive testing guide
- [WEEK_13_TEST_SUMMARY.md](./WEEK_13_TEST_SUMMARY.md) - Test summary
- [WEEK_13_COMPLETION_REPORT.md](./WEEK_13_COMPLETION_REPORT.md) - Completion report

---

## 📞 Support

For questions about test structure:
1. Review this document
2. Check TESTING_GUIDE.md
3. Review test examples
4. Check Jest documentation

---

**Last Updated:** 2025-11-03
**Status:** Ready for Phase 2 Testing

