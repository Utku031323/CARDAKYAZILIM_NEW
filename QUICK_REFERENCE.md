# Çardak Paketleme - Backend Quick Reference Guide

## 🎯 One-Page Summary

### Recommended Stack
```
Frontend: React 18 + TypeScript + Vite
Backend: Node.js 20 + Express + TypeScript
Database: PostgreSQL 15 + Prisma ORM
Auth: JWT + bcryptjs
Email: SendGrid/Mailgun
Hosting: DigitalOcean
```

### Architecture
```
React Frontend → Cloudflare CDN → Express API → PostgreSQL
                                    ↓
                              Redis Cache
                              Bull Queue
                              S3 Storage
```

---

## 📊 Key Numbers

| Metric | Value |
|--------|-------|
| Total API Endpoints | 50+ |
| Database Tables | 8 |
| Implementation Phases | 5 |
| Timeline | 16 weeks |
| Team Size | 2-3 developers |
| Development Cost | $32-48K |
| Monthly Infrastructure | $135-335 |
| Uptime Target | 99.9% |
| Response Time Target | <200ms |

---

## 🗄️ Database Tables

```
customers
├── id, email, password, company, contact, phone, tax_id, status
├── Relations: quotes, orders, invoices, onboarding

pricing_tiers
├── id, order_range_min/max, price_per_unit, storage_charge
├── Relations: orders

quote_requests
├── id, customer_id, company, contact, email, phone
├── monthly_order_count, product_types, special_requirements
├── has_fragile_items, needs_custom_packaging, preferred_start_date
├── calculated_price, status

orders
├── id, customer_id, quote_id, order_number
├── total_packages, price_per_unit, total_amount, status
├── billing_period_start/end

invoices
├── id, customer_id, order_id, invoice_number
├── amount, tax_amount, total_amount, status, due_date, paid_date

onboarding_sessions
├── id, customer_id, current_step, status
├── step1_data, step2_data, step3_data, step4_data

audit_logs
├── id, entity_type, entity_id, action, changes, user_id

refresh_tokens
├── id, token, customer_id, expires_at
```

---

## 🔌 API Endpoints Quick List

### Auth (5)
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/forgot-password
```

### Quotes (4)
```
POST   /quotes
GET    /quotes/:id
GET    /quotes
POST   /quotes/:id/accept
```

### Orders (4)
```
POST   /orders
GET    /orders/:id
GET    /orders
PUT    /orders/:id/status
```

### Pricing (3)
```
GET    /pricing/tiers
POST   /pricing/calculate
GET    /pricing/tiers/:id
```

### Customers (4)
```
POST   /customers
GET    /customers/:id
PUT    /customers/:id
GET    /customers/:id/dashboard
```

### Invoices (2)
```
GET    /customers/:id/invoices
POST   /invoices/:id/send
```

### Onboarding (3)
```
POST   /onboarding/start
POST   /onboarding/:sessionId/step/:stepNumber
POST   /onboarding/:sessionId/complete
```

### Admin (6+)
```
GET    /admin/dashboard
GET    /admin/customers
GET    /admin/orders
GET    /admin/invoices
POST   /admin/invoices/:id/send
PUT    /admin/pricing-tiers/:id
```

---

## 📦 NPM Dependencies

### Core
```json
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  "helmet": "^7.0.0",
  "express-validator": "^7.0.0"
}
```

### Database
```json
{
  "@prisma/client": "^5.0.0",
  "prisma": "^5.0.0"
}
```

### Auth
```json
{
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3"
}
```

### Email
```json
{
  "nodemailer": "^6.9.0"
}
```

### Validation
```json
{
  "zod": "^3.22.0"
}
```

### Logging
```json
{
  "winston": "^3.10.0"
}
```

### Dev
```json
{
  "typescript": "^5.0.0",
  "@types/express": "^4.17.0",
  "@types/node": "^20.0.0",
  "ts-node": "^10.9.0",
  "nodemon": "^3.0.0",
  "jest": "^29.0.0",
  "@types/jest": "^29.0.0",
  "ts-jest": "^29.0.0",
  "supertest": "^6.3.0"
}
```

---

## 🚀 Implementation Timeline

```
Week 1-4:   Phase 1 - Foundation
            ├── Project setup
            ├── Database schema
            ├── Authentication
            └── Basic CRUD

Week 5-10:  Phase 2 - Core Features
            ├── Quote endpoints
            ├── Order endpoints
            ├── Pricing logic
            ├── Email service
            └── Invoice generation

Week 11-14: Phase 3 - Onboarding & Integration
            ├── Onboarding flow
            ├── Payment gateway
            ├── Webhooks
            └── Testing

Week 15-16: Phase 4 - Deployment
            ├── CI/CD pipeline
            ├── Production setup
            ├── Monitoring
            └── Security audit

Week 17+:   Phase 5 - Advanced Features
            ├── E-commerce integrations
            ├── SMS/WhatsApp
            ├── Advanced reporting
            └── Portal enhancements
```

---

## 💰 Cost Breakdown

### Monthly Infrastructure
```
Backend Hosting:     $50-100
Database:            $30-50
Redis Cache:         $15-30
Object Storage:      $10-20
Email Service:       $20-50
CDN:                 $0-20
Monitoring:          $0-50
Domain & SSL:        $10-15
─────────────────────────────
Total:              $135-335
```

### Development (One-time)
```
Phase 1 (4 weeks):   $8-12K
Phase 2 (6 weeks):   $12-18K
Phase 3 (4 weeks):   $8-12K
Phase 4 (2 weeks):   $4-6K
─────────────────────────────
Total:              $32-48K
```

---

## 🔐 Security Checklist

- [ ] JWT authentication implemented
- [ ] Passwords hashed with bcryptjs
- [ ] HTTPS/TLS enabled
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS protection (Helmet)
- [ ] CSRF protection
- [ ] Audit logging enabled
- [ ] Secrets management configured
- [ ] Regular security audits scheduled

---

## 📈 Performance Targets

```
API Response Time:    < 200ms (p95)
Database Query Time:  < 100ms (p95)
Uptime:              99.9%
Concurrent Users:    1000+
Requests/Second:     100+
Error Rate:          < 0.1%
```

---

## 🔄 Data Flow Examples

### Quote to Order Flow
```
1. Customer submits quote form
   POST /quotes
   
2. Quote stored in database
   status: 'pending'
   
3. Admin reviews quote
   PUT /quotes/:id (status: 'quoted')
   
4. Customer accepts quote
   POST /quotes/:id/accept
   
5. Order created automatically
   POST /orders (auto-triggered)
   
6. Invoice generated
   POST /invoices (auto-triggered)
   
7. Email sent to customer
   Email service triggered
```

### Authentication Flow
```
1. User registers
   POST /auth/register
   
2. Password hashed with bcryptjs
   
3. JWT token generated
   
4. Token returned to frontend
   
5. Token stored in localStorage
   
6. Token sent in Authorization header
   Authorization: Bearer {token}
   
7. Token verified on each request
   
8. Token refreshed when expired
   POST /auth/refresh
```

---

## 🛠️ Development Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd cardak-backend

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your values

# 4. Set up database
npx prisma migrate dev --name init

# 5. Start development server
npm run dev

# 6. Run tests
npm test

# 7. Build for production
npm run build

# 8. Start production server
npm start
```

---

## 📚 Documentation Files

| File | Purpose | Size |
|------|---------|------|
| BACKEND_SUMMARY.md | Overview | ~300 lines |
| BACKEND_ARCHITECTURE_PLAN.md | Main document | ~600 lines |
| BACKEND_IMPLEMENTATION_GUIDE.md | Setup guide | ~400 lines |
| DATABASE_SCHEMA.md | Database reference | ~400 lines |
| API_SPECIFICATIONS.md | API reference | ~500 lines |
| BACKEND_DOCUMENTATION_INDEX.md | Navigation | ~300 lines |
| QUICK_REFERENCE.md | This file | ~300 lines |

---

## 🎯 Success Criteria

### Phase 1 Complete
- [ ] API running locally
- [ ] Authentication working
- [ ] Database migrations successful
- [ ] Basic CRUD operations tested
- [ ] Documentation complete

### Phase 2 Complete
- [ ] All core endpoints implemented
- [ ] Email service working
- [ ] Invoice generation working
- [ ] Admin dashboard functional
- [ ] Integration tests passing

### Phase 3 Complete
- [ ] Onboarding flow complete
- [ ] Payment gateway integrated
- [ ] Webhooks working
- [ ] End-to-end tests passing
- [ ] Ready for staging

### Phase 4 Complete
- [ ] CI/CD pipeline working
- [ ] Production deployment successful
- [ ] Monitoring and alerting active
- [ ] Security audit passed
- [ ] Ready for launch

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database connection failed | Check DATABASE_URL in .env |
| JWT token invalid | Verify JWT_SECRET is set |
| CORS errors | Update CORS config in app.ts |
| Email not sending | Check SendGrid API key |
| Port already in use | Change PORT in .env |
| Prisma migration failed | Check database permissions |

---

## 📞 Quick Links

- **Express.js:** https://expressjs.com
- **Prisma:** https://www.prisma.io
- **PostgreSQL:** https://www.postgresql.org
- **JWT:** https://jwt.io
- **DigitalOcean:** https://www.digitalocean.com
- **Iyzico:** https://www.iyzico.com
- **SendGrid:** https://sendgrid.com

---

## ✅ Pre-Implementation Checklist

- [ ] Team reviewed all documentation
- [ ] Technology stack approved
- [ ] Development environment ready
- [ ] GitHub repository created
- [ ] PostgreSQL server available
- [ ] Email service account created
- [ ] Hosting provider selected
- [ ] Budget approved
- [ ] Timeline agreed upon
- [ ] Success criteria defined

---

**Ready to start? Begin with BACKEND_IMPLEMENTATION_GUIDE.md! 🚀**
