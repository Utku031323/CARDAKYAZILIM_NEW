# Çardak Paketleme - Backend Testing Guide

## 📋 Testing Infrastructure Setup

### Installed Dependencies
- **jest** - Testing framework
- **@types/jest** - TypeScript types for Jest
- **ts-jest** - TypeScript support for Jest
- **supertest** - HTTP assertion library
- **@types/supertest** - TypeScript types for Supertest

### Configuration Files
- **jest.config.js** - Jest configuration with ts-jest preset
- **tests/setup.ts** - Test environment setup and global configuration
- **tests/utils/test-helpers.ts** - Mock data and utility functions
- **tests/utils/mock-prisma.ts** - Prisma client mocks

## 🧪 Test Structure

### Test Categories

#### 1. Unit Tests (`tests/unit/services/`)
- **auth.service.test.ts** - Authentication service tests
- **quote.service.test.ts** - Quote management tests
- **payment.service.test.ts** - Payment processing tests
- **api-key.service.test.ts** - API key management tests

**Coverage:**
- Service function logic
- Input validation
- Error handling
- Edge cases

#### 2. Integration Tests (`tests/integration/`)
- **auth.integration.test.ts** - Authentication endpoints
- **api-key.integration.test.ts** - API key endpoints

**Coverage:**
- HTTP request/response handling
- Authentication middleware
- Authorization checks
- Database operations

#### 3. End-to-End Tests (`tests/e2e/`)
- **quote-workflow.e2e.test.ts** - Complete quote to payment workflow

**Coverage:**
- Multi-step user workflows
- Data consistency across operations
- Error recovery

#### 4. Security Tests (`tests/security/`)
- **auth-security.test.ts** - Authentication and input validation

**Coverage:**
- Token validation
- Input sanitization
- SQL injection prevention
- XSS prevention
- Authorization enforcement

#### 5. Performance Tests (`tests/performance/`)
- **api-performance.test.ts** - API response times and efficiency

**Coverage:**
- Response time benchmarks
- Bulk operations
- Concurrent requests
- Memory usage
- Query optimization

## 🚀 Running Tests

### Run All Tests
```bash
npm run test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

### Run Specific Test Categories
```bash
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # End-to-end tests only
```

### Run Specific Test File
```bash
npm run test -- tests/unit/services/auth.service.test.ts
```

## 📊 Test Coverage Goals

### Coverage Thresholds
- **Branches:** 60%
- **Functions:** 65%
- **Lines:** 65%
- **Statements:** 65%

### Current Coverage Status
- Unit Tests: Ready for implementation
- Integration Tests: Ready for implementation
- E2E Tests: Ready for implementation
- Security Tests: Ready for implementation
- Performance Tests: Ready for implementation

## 🔧 Mock Data

### Available Mock Objects
- **mockUsers** - Admin, Manager, Viewer users
- **mockQuotes** - Sample quote data
- **mockOnboarding** - Sample onboarding data
- **mockPayments** - Sample payment data
- **mockAPIKeys** - Sample API key data

### Mock Functions
- **generateTestToken()** - Generate JWT tokens
- **generateTestRefreshToken()** - Generate refresh tokens
- **createMockRequest()** - Create mock Express request
- **createMockResponse()** - Create mock Express response
- **createMockNext()** - Create mock next function

## 🛡️ Security Testing

### Test Coverage
- ✅ Token validation and expiration
- ✅ Invalid token format detection
- ✅ Email format validation
- ✅ Password strength validation
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ Role-based access control
- ✅ Authorization enforcement

## ⚡ Performance Benchmarks

### Target Response Times
- Single resource retrieval: < 100ms
- List operations: < 200ms
- Create operations: < 150ms
- Bulk operations (100 items): < 300ms
- Concurrent requests (10): < 200ms

## 📝 Test Utilities

### Helper Functions
```typescript
// Generate test tokens
const token = generateTestToken(userId, role);
const refreshToken = generateTestRefreshToken(userId);

// Create mock objects
const req = createMockRequest({ user: mockUsers.admin });
const res = createMockResponse();
const next = createMockNext();

// Wait for async operations
await wait(1000);
```

## 🔍 Debugging Tests

### Enable Verbose Output
```bash
npm run test -- --verbose
```

### Run Single Test
```bash
npm run test -- --testNamePattern="should login successfully"
```

### Debug with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📚 Best Practices

### Writing Tests
1. Use descriptive test names
2. Follow AAA pattern (Arrange, Act, Assert)
3. Mock external dependencies
4. Test both success and failure cases
5. Use meaningful assertions

### Test Organization
1. Group related tests with `describe()`
2. Use `beforeEach()` for setup
3. Use `afterEach()` for cleanup
4. Keep tests focused and isolated

### Mocking
1. Mock Prisma database calls
2. Mock external services (Stripe, Twilio)
3. Mock authentication tokens
4. Reset mocks between tests

## 🐛 Common Issues

### Issue: Module not found
**Solution:** Ensure mock paths match actual file structure

### Issue: Type errors in tests
**Solution:** Use proper TypeScript types and interfaces

### Issue: Tests timing out
**Solution:** Increase timeout in jest.config.js or individual tests

### Issue: Flaky tests
**Solution:** Avoid time-dependent assertions, use proper async/await

## 📖 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)

## ✅ Checklist for Test Implementation

- [x] Jest and dependencies installed
- [x] Jest configuration created
- [x] Test setup file created
- [x] Mock utilities created
- [x] Unit test templates created
- [x] Integration test templates created
- [x] E2E test templates created
- [x] Security test templates created
- [x] Performance test templates created
- [ ] All tests passing
- [ ] Coverage thresholds met
- [ ] CI/CD integration configured

## 📞 Support

For issues or questions about testing:
1. Check this guide
2. Review test examples
3. Check Jest documentation
4. Review test output for specific errors

