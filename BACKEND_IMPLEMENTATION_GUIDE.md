# Backend Implementation Guide - Quick Start

## Project Setup Instructions

### Prerequisites
- Node.js 20 LTS
- PostgreSQL 15+
- Redis (optional, for caching)
- Git
- npm or yarn

### Step 1: Initialize Project

```bash
# Create project directory
mkdir cardak-backend
cd cardak-backend

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors dotenv helmet express-validator
npm install -D typescript @types/express @types/node ts-node nodemon

# Install database & ORM
npm install @prisma/client
npm install -D prisma

# Install authentication
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken

# Install email
npm install nodemailer
npm install -D @types/nodemailer

# Install validation
npm install zod

# Install logging
npm install winston

# Install testing
npm install -D jest @types/jest ts-jest supertest @types/supertest
```

### Step 2: Project Structure

```
cardak-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── logger.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── quoteController.ts
│   │   ├── orderController.ts
│   │   ├── customerController.ts
│   │   └── pricingController.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── quoteService.ts
│   │   ├── orderService.ts
│   │   ├── emailService.ts
│   │   └── pricingService.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── quotes.ts
│   │   ├── orders.ts
│   │   ├── customers.ts
│   │   └── pricing.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── validators.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── .gitignore
├── tsconfig.json
├── jest.config.js
└── package.json
```

### Step 3: Environment Configuration

Create `.env` file:

```env
# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cardak_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=24h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRY=7d

# Email
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@cardakpaketleme.com

# Payment (Iyzico)
IYZICO_API_KEY=your-iyzico-api-key
IYZICO_SECRET_KEY=your-iyzico-secret-key

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
```

### Step 4: TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### Step 5: Prisma Setup

Initialize Prisma:

```bash
npx prisma init
```

Update `prisma/schema.prisma` with the schema from BACKEND_ARCHITECTURE_PLAN.md

Create migration:

```bash
npx prisma migrate dev --name init
```

### Step 6: Basic Express App

Create `src/app.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
```

Create `src/index.ts`:

```typescript
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 7: Package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "lint": "eslint src --ext .ts"
  }
}
```

### Step 8: Run Development Server

```bash
npm run dev
```

Server should start on http://localhost:3000

---

## Key Implementation Patterns

### Authentication Pattern

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Service Pattern

```typescript
// services/quoteService.ts
import { prisma } from '../config/database';

export class QuoteService {
  async createQuote(data: any) {
    return prisma.quoteRequest.create({
      data: {
        ...data,
        status: 'pending'
      }
    });
  }

  async getQuote(id: string) {
    return prisma.quoteRequest.findUnique({
      where: { id }
    });
  }

  async listQuotes(customerId: string, page: number = 1, limit: number = 10) {
    return prisma.quoteRequest.findMany({
      where: { customer_id: customerId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' }
    });
  }
}
```

### Controller Pattern

```typescript
// controllers/quoteController.ts
import { Request, Response } from 'express';
import { QuoteService } from '../services/quoteService';

const quoteService = new QuoteService();

export const createQuote = async (req: Request, res: Response) => {
  try {
    const quote = await quoteService.createQuote(req.body);
    res.status(201).json({ success: true, data: quote });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const quote = await quoteService.getQuote(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote not found' });
    }
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
```

### Route Pattern

```typescript
// routes/quotes.ts
import express from 'express';
import { createQuote, getQuote } from '../controllers/quoteController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', createQuote);
router.get('/:id', authMiddleware, getQuote);

export default router;
```

---

## Testing Strategy

### Unit Test Example

```typescript
// tests/unit/quoteService.test.ts
import { QuoteService } from '../../src/services/quoteService';

describe('QuoteService', () => {
  let quoteService: QuoteService;

  beforeEach(() => {
    quoteService = new QuoteService();
  });

  test('should create a quote', async () => {
    const quoteData = {
      companyName: 'Test Company',
      email: 'test@example.com',
      monthlyOrderCount: '0-100'
    };

    const quote = await quoteService.createQuote(quoteData);
    expect(quote).toHaveProperty('id');
    expect(quote.status).toBe('pending');
  });
});
```

### Integration Test Example

```typescript
// tests/integration/quotes.test.ts
import request from 'supertest';
import app from '../../src/app';

describe('Quote API', () => {
  test('POST /api/quotes should create a quote', async () => {
    const response = await request(app)
      .post('/api/quotes')
      .send({
        companyName: 'Test Company',
        contactName: 'John Doe',
        email: 'john@example.com',
        phone: '5551234567',
        monthlyOrderCount: '0-100',
        productTypes: ['Elektronik']
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Tests passing
- [ ] Build successful
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting implemented
- [ ] API documentation complete
- [ ] SSL/TLS configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Disaster recovery plan

---

## Common Issues & Solutions

### Issue: Database Connection Failed
**Solution:** Check DATABASE_URL in .env, ensure PostgreSQL is running

### Issue: JWT Token Invalid
**Solution:** Verify JWT_SECRET is set and consistent

### Issue: CORS Errors
**Solution:** Update CORS configuration in app.ts with correct frontend URL

### Issue: Email Not Sending
**Solution:** Verify SendGrid API key and sender email configuration

---

## Next Steps

1. Set up the project following these steps
2. Implement Phase 1 endpoints
3. Create comprehensive tests
4. Set up CI/CD pipeline
5. Deploy to staging environment
6. Integrate with frontend
7. Begin Phase 2 implementation

For detailed API specifications, refer to BACKEND_ARCHITECTURE_PLAN.md Section 5.
