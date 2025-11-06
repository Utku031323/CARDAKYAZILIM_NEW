# Çardak Paketleme - Database Schema Documentation

## Overview

This document provides the complete database schema for the Çardak Paketleme backend system using PostgreSQL and Prisma ORM.

---

## Prisma Schema (prisma/schema.prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// CUSTOMERS / USERS
// ============================================

model Customer {
  id                String    @id @default(cuid())
  email             String    @unique
  passwordHash      String
  companyName       String
  contactName       String
  phone             String
  taxId             String?   @unique
  address           String?
  city              String?
  country           String    @default("Turkey")
  status            CustomerStatus @default(ACTIVE)
  
  // Relations
  quoteRequests     QuoteRequest[]
  orders            Order[]
  invoices          Invoice[]
  onboardingSessions OnboardingSession[]
  auditLogs         AuditLog[]
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLogin         DateTime?

  @@map("customers")
}

enum CustomerStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

// ============================================
// PRICING
// ============================================

model PricingTier {
  id                String    @id @default(cuid())
  orderRangeMin     Int
  orderRangeMax     Int?
  pricePerUnit      Decimal   @db.Decimal(10, 2)
  storageCharge     Decimal?  @db.Decimal(10, 2)
  features          Json      // Array of feature strings
  active            Boolean   @default(true)
  effectiveDate     DateTime
  
  // Relations
  orders            Order[]
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@map("pricing_tiers")
}

// ============================================
// QUOTES
// ============================================

model QuoteRequest {
  id                    String    @id @default(cuid())
  customerId            String?
  customer              Customer? @relation(fields: [customerId], references: [id], onDelete: SetNull)
  
  companyName           String
  contactName           String
  email                 String
  phone                 String
  monthlyOrderCount     String    // "0-100", "101-250", etc.
  productTypes          Json      // Array of product types
  specialRequirements   String?
  hasFragileItems       Boolean   @default(false)
  needsCustomPackaging  Boolean   @default(false)
  preferredStartDate    DateTime?
  
  calculatedPrice       Decimal?  @db.Decimal(10, 2)
  status                QuoteStatus @default(PENDING)
  
  // Relations
  order                 Order?
  
  // Timestamps
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("quote_requests")
}

enum QuoteStatus {
  PENDING
  REVIEWED
  QUOTED
  ACCEPTED
  REJECTED
}

// ============================================
// ORDERS
// ============================================

model Order {
  id                String    @id @default(cuid())
  customerId        String
  customer          Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  quoteId           String?   @unique
  quote             QuoteRequest? @relation(fields: [quoteId], references: [id], onDelete: SetNull)
  
  orderNumber       String    @unique
  totalPackages     Int
  pricePerUnit      Decimal   @db.Decimal(10, 2)
  totalAmount       Decimal   @db.Decimal(10, 2)
  
  status            OrderStatus @default(PENDING)
  billingPeriodStart DateTime
  billingPeriodEnd  DateTime
  
  // Relations
  invoice           Invoice?
  pricingTier       PricingTier? @relation(fields: [pricingTierId], references: [id])
  pricingTierId     String?
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@map("orders")
}

enum OrderStatus {
  PENDING
  PROCESSING
  COMPLETED
  CANCELLED
}

// ============================================
// INVOICES
// ============================================

model Invoice {
  id                String    @id @default(cuid())
  customerId        String
  customer          Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  orderId           String?   @unique
  order             Order?    @relation(fields: [orderId], references: [id], onDelete: SetNull)
  
  invoiceNumber     String    @unique
  amount            Decimal   @db.Decimal(10, 2)
  taxAmount         Decimal?  @db.Decimal(10, 2)
  totalAmount       Decimal   @db.Decimal(10, 2)
  
  status            InvoiceStatus @default(DRAFT)
  dueDate           DateTime
  paidDate          DateTime?
  paymentMethod     String?
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@map("invoices")
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}

// ============================================
// ONBOARDING
// ============================================

model OnboardingSession {
  id                String    @id @default(cuid())
  customerId        String?
  customer          Customer? @relation(fields: [customerId], references: [id], onDelete: SetNull)
  
  currentStep       Int       @default(1)
  
  step1Data         Json?     // Company info
  step2Data         Json?     // Service selection
  step3Data         Json?     // Integration
  step4Data         Json?     // Activation
  
  status            OnboardingStatus @default(IN_PROGRESS)
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  completedAt       DateTime?

  @@map("onboarding_sessions")
}

enum OnboardingStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id                String    @id @default(cuid())
  entityType        String    // "Customer", "Order", "Invoice", etc.
  entityId          String
  action            String    // "CREATE", "UPDATE", "DELETE"
  changes           Json?     // What changed
  
  userId            String?
  user              Customer? @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  // Timestamps
  createdAt         DateTime  @default(now())

  @@map("audit_logs")
}

// ============================================
// REFRESH TOKENS (for JWT)
// ============================================

model RefreshToken {
  id                String    @id @default(cuid())
  token             String    @unique
  customerId        String
  expiresAt         DateTime
  
  // Timestamps
  createdAt         DateTime  @default(now())

  @@map("refresh_tokens")
}
```

---

## Database Relationships Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOMERS                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ id (PK)                                              │  │
│  │ email (UNIQUE)                                       │  │
│  │ passwordHash                                         │  │
│  │ companyName, contactName, phone                      │  │
│  │ taxId (UNIQUE)                                       │  │
│  │ status (ACTIVE/INACTIVE/SUSPENDED)                   │  │
│  │ createdAt, updatedAt, lastLogin                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
         │                    │                    │
         │ 1:N                │ 1:N                │ 1:N
         ▼                    ▼                    ▼
    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
    │   QUOTES    │    │    ORDERS    │    │  INVOICES    │
    ├─────────────┤    ├──────────────┤    ├──────────────┤
    │ id (PK)     │    │ id (PK)      │    │ id (PK)      │
    │ customerId  │    │ customerId   │    │ customerId   │
    │ (FK)        │    │ (FK)         │    │ (FK)         │
    │ email       │    │ quoteId (FK) │    │ orderId (FK) │
    │ phone       │    │ orderNumber  │    │ invoiceNum   │
    │ monthlyOrd  │    │ totalPackages│    │ amount       │
    │ productType │    │ pricePerUnit │    │ taxAmount    │
    │ status      │    │ totalAmount  │    │ status       │
    │ calcPrice   │    │ status       │    │ dueDate      │
    │ createdAt   │    │ billingPeriod│    │ paidDate     │
    └─────────────┘    │ createdAt    │    │ createdAt    │
         │             └──────────────┘    └──────────────┘
         │                    │
         │ 1:1                │ N:1
         └────────────────────┤
                              ▼
                    ┌──────────────────┐
                    │  PRICING_TIERS   │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ orderRangeMin    │
                    │ orderRangeMax    │
                    │ pricePerUnit     │
                    │ storageCharge    │
                    │ features (JSON)  │
                    │ active           │
                    │ effectiveDate    │
                    └──────────────────┘
```

---

## Key Indexes

```sql
-- Performance indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_quote_requests_customer_id ON quote_requests(customer_id);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_billing_period ON orders(billing_period_start, billing_period_end);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_onboarding_customer_id ON onboarding_sessions(customer_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_refresh_tokens_customer_id ON refresh_tokens(customer_id);
```

---

## Migration Strategy

### Initial Migration (init)

```bash
npx prisma migrate dev --name init
```

This creates:
1. All tables
2. All indexes
3. All constraints
4. All relationships

### Subsequent Migrations

```bash
# After schema changes
npx prisma migrate dev --name descriptive_name

# Example: Add new field
npx prisma migrate dev --name add_customer_notes_field
```

---

## Data Validation Rules

### Customers Table
- `email`: Must be unique, valid email format
- `passwordHash`: Minimum 60 characters (bcrypt hash)
- `phone`: Turkish format (+90 or 0)
- `taxId`: Turkish tax ID format (11 digits)
- `status`: Only ACTIVE, INACTIVE, or SUSPENDED

### Quote Requests Table
- `monthlyOrderCount`: Must match one of the defined ranges
- `productTypes`: Array with at least 1 item
- `email`: Valid email format
- `phone`: Valid phone format

### Orders Table
- `orderNumber`: Unique, auto-generated format (e.g., ORD-2025-001)
- `totalPackages`: Must be > 0
- `pricePerUnit`: Must match pricing tier
- `totalAmount`: Must equal totalPackages * pricePerUnit

### Invoices Table
- `invoiceNumber`: Unique, auto-generated format (e.g., INV-2025-001)
- `dueDate`: Must be 24 hours after creation
- `totalAmount`: Must equal amount + taxAmount
- `status`: Only DRAFT, SENT, PAID, OVERDUE, or CANCELLED

---

## Backup & Recovery

### Daily Backup Strategy

```bash
# Automated daily backup
pg_dump -U postgres -h localhost cardak_db > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U postgres -h localhost cardak_db < backup_20250115.sql
```

### Point-in-Time Recovery

Enable WAL archiving in PostgreSQL for point-in-time recovery capability.

---

## Performance Optimization

### Query Optimization Tips

1. **Always use indexes** for WHERE, JOIN, and ORDER BY clauses
2. **Avoid N+1 queries** - use Prisma's `include` and `select`
3. **Paginate large result sets** - use `skip` and `take`
4. **Cache frequently accessed data** - use Redis
5. **Archive old data** - move completed orders to archive table

### Example Optimized Query

```typescript
// ❌ Bad - N+1 query problem
const customers = await prisma.customer.findMany();
for (const customer of customers) {
  const orders = await prisma.order.findMany({
    where: { customerId: customer.id }
  });
}

// ✅ Good - Single query with relations
const customers = await prisma.customer.findMany({
  include: {
    orders: true
  }
});
```

---

## Security Considerations

1. **Encryption**: Sensitive data (passwords) must be hashed
2. **Access Control**: Implement row-level security for multi-tenant data
3. **Audit Logging**: All changes logged to audit_logs table
4. **Data Retention**: Implement data retention policies
5. **Backups**: Regular encrypted backups to secure storage

---

## Monitoring Queries

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('cardak_db'));

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname != 'pg_catalog' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan 
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;
```

---

## Disaster Recovery Plan

1. **Daily automated backups** to secure storage
2. **Weekly full backups** to separate location
3. **Monthly backup verification** - test restore process
4. **RTO (Recovery Time Objective)**: 1 hour
5. **RPO (Recovery Point Objective)**: 1 day

---

**Document Version:** 1.0
**Last Updated:** January 15, 2025
**Status:** Ready for Implementation
