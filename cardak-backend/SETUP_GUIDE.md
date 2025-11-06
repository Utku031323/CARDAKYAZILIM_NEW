# Backend Setup Guide

## 🚀 Week 1: Infrastructure Setup - COMPLETE

This guide walks you through setting up the Çardak Paketleme backend infrastructure.

---

## ✅ COMPLETED TASKS

### 1. ✅ Project Initialization
- [x] Created Node.js project with npm
- [x] Installed core dependencies (Express, TypeScript, ts-node)
- [x] Installed dev dependencies (ESLint, Prettier, Prisma)
- [x] Configured TypeScript (tsconfig.json)

### 2. ✅ Code Quality Tools
- [x] ESLint configuration (.eslintrc.json)
- [x] Prettier configuration (.prettierrc.json)
- [x] Git ignore setup (.gitignore)

### 3. ✅ Environment Configuration
- [x] Created .env.example with all required variables
- [x] Created .env for development
- [x] Configured CORS, JWT, Database, Email, File Storage

### 4. ✅ Database Setup
- [x] Created Prisma schema (prisma/schema.prisma)
- [x] Defined 8 data models:
  - User (admin authentication)
  - Quote (quote requests)
  - Onboarding (onboarding submissions)
  - OnboardingStep (step data)
  - OnboardingDocument (uploaded files)
  - PricingTier (pricing tiers)
  - Settings (system settings)
  - AuditLog (audit logs)
- [x] Generated Prisma client

### 5. ✅ Express Application
- [x] Created main app.ts with middleware setup
- [x] Configured CORS
- [x] Configured JSON parsing
- [x] Added request logging
- [x] Added error handling
- [x] Added 404 handler

### 6. ✅ API Routes
- [x] Created health check routes
- [x] Implemented /health endpoint
- [x] Implemented /api/v1/health endpoint

### 7. ✅ Server Entry Point
- [x] Created server.ts with graceful shutdown
- [x] Added signal handlers (SIGTERM, SIGINT)
- [x] Added error handlers
- [x] Added Prisma client initialization

### 8. ✅ Docker Setup
- [x] Created docker-compose.yml
- [x] Configured PostgreSQL service
- [x] Configured pgAdmin service
- [x] Set up volumes and networks

### 9. ✅ Documentation
- [x] Created README.md
- [x] Created SETUP_GUIDE.md (this file)
- [x] Updated package.json scripts

### 10. ✅ Testing
- [x] Server starts successfully on port 3000
- [x] Health check endpoint responds correctly
- [x] API health endpoint responds correctly

---

## 📁 Project Structure

```
cardak-backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── routes/
│   │   └── health.ts          # Health check routes
│   ├── controllers/           # (Coming Week 2)
│   ├── services/              # (Coming Week 2)
│   ├── middleware/            # (Coming Week 2)
│   ├── models/                # (Coming Week 2)
│   ├── utils/                 # (Coming Week 2)
│   └── types/                 # (Coming Week 2)
├── prisma/
│   └── schema.prisma          # Database schema
├── dist/                      # Compiled JavaScript (generated)
├── node_modules/              # Dependencies (generated)
├── .env                       # Environment variables (dev)
├── .env.example               # Environment template
├── .eslintrc.json             # ESLint config
├── .prettierrc.json           # Prettier config
├── .gitignore                 # Git ignore rules
├── tsconfig.json              # TypeScript config
├── docker-compose.yml         # Docker services
├── package.json               # Project metadata
├── README.md                  # Project README
└── SETUP_GUIDE.md             # This file
```

---

## 🔧 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (optional, for PostgreSQL)

### Installation Steps

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env if needed (defaults work for development)
```

#### 3. Setup Database (Option A: Docker)
```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Run Prisma migrations
npm run prisma:migrate
```

#### 3. Setup Database (Option B: Local PostgreSQL)
```bash
# Create database
createdb cardak_db

# Run Prisma migrations
npm run prisma:migrate
```

#### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

#### 5. Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:3000`

---

## 📊 Available Scripts

```bash
# Development
npm run dev                    # Start dev server with hot reload

# Building
npm run build                  # Compile TypeScript to JavaScript
npm start                      # Start production server

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:migrate         # Run database migrations
npm run prisma:studio          # Open Prisma Studio (GUI)

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix               # Fix ESLint issues
npm run format                 # Format code with Prettier
```

---

## 🧪 Testing Endpoints

### Health Check
```bash
# Basic health check
curl http://localhost:3000/health

# API health check
curl http://localhost:3000/api/v1/health
```

### Expected Responses

**GET /health**
```json
{
  "status": "OK",
  "timestamp": "2025-11-02T11:47:51.031Z",
  "uptime": 20.2747523
}
```

**GET /api/v1/health**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2025-11-02T11:47:58.092Z",
    "uptime": 27.3349244,
    "environment": "development"
  },
  "message": "Server is running"
}
```

---

## 🗄️ Database

### Prisma Studio
```bash
npm run prisma:studio
```
Opens GUI at `http://localhost:5555`

### Database Models
1. **User** - Admin users with roles (ADMIN, MANAGER, VIEWER)
2. **Quote** - Quote requests with status tracking
3. **Onboarding** - Onboarding submissions with multi-step support
4. **OnboardingStep** - Individual step data
5. **OnboardingDocument** - Uploaded documents
6. **PricingTier** - Pricing tier definitions
7. **Settings** - System settings (key-value pairs)
8. **AuditLog** - Audit trail for all actions

### Migrations
```bash
# Create new migration
npm run prisma:migrate

# View migration history
ls prisma/migrations/
```

---

## 🐳 Docker Setup

### Start Services
```bash
docker-compose up -d
```

### Services
- **PostgreSQL** - Port 5432
  - User: postgres
  - Password: postgres
  - Database: cardak_db

- **pgAdmin** - Port 5050
  - Email: admin@cardak.com
  - Password: admin123

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f postgres
```

---

## 📝 Environment Variables

### Required Variables
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cardak_db
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SENDGRID_API_KEY=dev-key
SENDER_EMAIL=noreply@cardakpaketleme.com
AWS_ACCESS_KEY_ID=dev-key
AWS_SECRET_ACCESS_KEY=dev-secret
AWS_S3_BUCKET=cardak-files
AWS_REGION=eu-west-1
FRONTEND_URL=http://localhost:8080
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:8080
```

---

## 🔐 Security Notes

- Change JWT_SECRET in production
- Use strong database passwords
- Enable HTTPS in production
- Configure CORS properly for production
- Use environment variables for sensitive data
- Never commit .env file

---

## 📚 Next Steps

### Week 2: Authentication System
- [ ] Create User model and database table
- [ ] Implement JWT token generation
- [ ] Create login/logout endpoints
- [ ] Implement auth middleware
- [ ] Add password hashing with bcrypt

### Week 3: Quote API
- [ ] Create Quote CRUD endpoints
- [ ] Add filtering and pagination
- [ ] Implement status management
- [ ] Add validation

### Week 4: Onboarding API
- [ ] Create Onboarding CRUD endpoints
- [ ] Implement multi-step logic
- [ ] Add document upload support
- [ ] Add validation

### Week 5: Additional APIs
- [ ] Pricing API
- [ ] Settings API
- [ ] Analytics API

### Week 6: Frontend Integration
- [ ] Create API client
- [ ] Update useAuth hook
- [ ] Integrate React Query
- [ ] Replace mock data

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process on port 3000
taskkill /PID <PID> /F
```

### Database connection error
```bash
# Check PostgreSQL is running
docker-compose ps

# Check connection string in .env
# Default: postgresql://postgres:postgres@localhost:5432/cardak_db
```

### Prisma client not found
```bash
npm run prisma:generate
```

### TypeScript errors
```bash
npm run lint:fix
npm run format
```

---

## 📞 Support

For issues or questions, refer to:
- [Backend Requirements Analysis](../BACKEND_REQUIREMENTS_ANALYSIS.md)
- [Technical Architecture](../BACKEND_TECHNICAL_ARCHITECTURE.md)
- [Implementation Roadmap](../BACKEND_IMPLEMENTATION_ROADMAP.md)

---

**Status:** ✅ WEEK 1 COMPLETE
**Next:** Week 2 - Authentication System
**Estimated Time:** 4-6 weeks to MVP

