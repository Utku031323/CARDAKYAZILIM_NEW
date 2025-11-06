# Çardak Paketleme - API Specifications

## Base Information

**Base URL:** `https://api.cardakpaketleme.com/v1`
**Authentication:** JWT Bearer Token
**Content-Type:** `application/json`
**Response Format:** JSON

---

## Authentication Endpoints

### 1. Register Customer

```
POST /auth/register
```

**Request:**
```json
{
  "email": "customer@example.com",
  "password": "SecurePassword123!",
  "companyName": "ABC Ticaret Ltd.",
  "contactName": "Ahmet Yılmaz",
  "phone": "+905551234567"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "customerId": "cuid123",
    "email": "customer@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### 2. Login

```
POST /auth/login
```

**Request:**
```json
{
  "email": "customer@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "customerId": "cuid123",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

---

### 3. Refresh Token

```
POST /auth/refresh
```

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

---

## Quote Endpoints

### 1. Create Quote Request

```
POST /quotes
```

**Request:**
```json
{
  "companyName": "ABC Ticaret Ltd.",
  "contactName": "Ahmet Yılmaz",
  "email": "ahmet@abc.com",
  "phone": "+905551234567",
  "monthlyOrderCount": "101-250",
  "productTypes": ["Elektronik", "Giyim & Aksesuar"],
  "specialRequirements": "Hızlı işlem gerekli",
  "hasFragileItems": true,
  "needsCustomPackaging": false,
  "preferredStartDate": "2025-02-01"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "quote123",
    "status": "pending",
    "calculatedPrice": 24,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 2. Get Quote Details

```
GET /quotes/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "quote123",
    "companyName": "ABC Ticaret Ltd.",
    "contactName": "Ahmet Yılmaz",
    "email": "ahmet@abc.com",
    "phone": "+905551234567",
    "monthlyOrderCount": "101-250",
    "productTypes": ["Elektronik", "Giyim & Aksesuar"],
    "specialRequirements": "Hızlı işlem gerekli",
    "hasFragileItems": true,
    "needsCustomPackaging": false,
    "preferredStartDate": "2025-02-01",
    "calculatedPrice": 24,
    "status": "pending",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 3. List Customer Quotes

```
GET /quotes?page=1&limit=10&status=pending
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "quote123",
        "companyName": "ABC Ticaret Ltd.",
        "status": "pending",
        "calculatedPrice": 24,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

### 4. Accept Quote

```
POST /quotes/:id/accept
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "quoteId": "quote123",
    "orderId": "order123",
    "invoiceId": "invoice123",
    "status": "accepted"
  }
}
```

---

## Order Endpoints

### 1. Create Order

```
POST /orders
Authorization: Bearer {token}
```

**Request:**
```json
{
  "quoteId": "quote123",
  "totalPackages": 150
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "orderNumber": "ORD-2025-001",
    "totalPackages": 150,
    "pricePerUnit": 24,
    "totalAmount": 3600,
    "status": "pending",
    "billingPeriodStart": "2025-01-15",
    "billingPeriodEnd": "2025-02-15",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 2. Get Order Details

```
GET /orders/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "orderNumber": "ORD-2025-001",
    "customerId": "customer123",
    "totalPackages": 150,
    "pricePerUnit": 24,
    "totalAmount": 3600,
    "status": "processing",
    "billingPeriodStart": "2025-01-15",
    "billingPeriodEnd": "2025-02-15",
    "invoice": {
      "id": "invoice123",
      "invoiceNumber": "INV-2025-001",
      "amount": 3600,
      "taxAmount": 576,
      "totalAmount": 4176,
      "status": "sent",
      "dueDate": "2025-01-16"
    },
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 3. List Customer Orders

```
GET /orders?page=1&limit=10&status=processing
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "order123",
        "orderNumber": "ORD-2025-001",
        "totalPackages": 150,
        "totalAmount": 3600,
        "status": "processing",
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

## Pricing Endpoints

### 1. Get All Pricing Tiers

```
GET /pricing/tiers
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "tier1",
      "orderRangeMin": 0,
      "orderRangeMax": 100,
      "pricePerUnit": 30,
      "storageCharge": 1000,
      "features": ["Sabit fiyat", "Güvenli paketleme", "7/24 destek"],
      "active": true,
      "effectiveDate": "2025-05-16"
    },
    {
      "id": "tier2",
      "orderRangeMin": 101,
      "orderRangeMax": 250,
      "pricePerUnit": 24,
      "storageCharge": null,
      "features": ["Sabit fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem"],
      "active": true,
      "effectiveDate": "2025-05-16"
    }
  ]
}
```

---

### 2. Calculate Price

```
POST /pricing/calculate
```

**Request:**
```json
{
  "monthlyOrderCount": "101-250"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "monthlyOrderCount": "101-250",
    "pricePerUnit": 24,
    "estimatedMonthlyRange": {
      "min": 2424,
      "max": 6000
    },
    "features": ["Sabit fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem"]
  }
}
```

---

## Customer Endpoints

### 1. Get Customer Profile

```
GET /customers/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "customer123",
    "email": "customer@example.com",
    "companyName": "ABC Ticaret Ltd.",
    "contactName": "Ahmet Yılmaz",
    "phone": "+905551234567",
    "taxId": "12345678901",
    "address": "Ankara Cad. No:123",
    "city": "Istanbul",
    "country": "Turkey",
    "status": "active",
    "createdAt": "2025-01-15T10:30:00Z",
    "lastLogin": "2025-01-15T10:30:00Z"
  }
}
```

---

### 2. Update Customer Profile

```
PUT /customers/:id
Authorization: Bearer {token}
```

**Request:**
```json
{
  "contactName": "Mehmet Yılmaz",
  "phone": "+905559876543",
  "address": "Ankara Cad. No:456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "customer123",
    "email": "customer@example.com",
    "companyName": "ABC Ticaret Ltd.",
    "contactName": "Mehmet Yılmaz",
    "phone": "+905559876543",
    "address": "Ankara Cad. No:456",
    "updatedAt": "2025-01-15T11:00:00Z"
  }
}
```

---

### 3. Get Customer Dashboard

```
GET /customers/:id/dashboard
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "customerId": "customer123",
    "activeOrders": 3,
    "totalSpent": 12500,
    "nextInvoiceDate": "2025-02-15",
    "pendingInvoices": 1,
    "recentOrders": [
      {
        "id": "order123",
        "orderNumber": "ORD-2025-001",
        "totalAmount": 3600,
        "status": "processing",
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## Invoice Endpoints

### 1. Get Customer Invoices

```
GET /customers/:id/invoices?page=1&limit=10&status=sent
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "invoice123",
        "invoiceNumber": "INV-2025-001",
        "amount": 3600,
        "taxAmount": 576,
        "totalAmount": 4176,
        "status": "sent",
        "dueDate": "2025-01-16",
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

## Onboarding Endpoints

### 1. Start Onboarding

```
POST /onboarding/start
Authorization: Bearer {token}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "sessionId": "session123",
    "customerId": "customer123",
    "currentStep": 1,
    "status": "in_progress",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 2. Save Onboarding Step

```
POST /onboarding/:sessionId/step/:stepNumber
Authorization: Bearer {token}
```

**Request (Step 1):**
```json
{
  "companyName": "ABC Ticaret Ltd.",
  "taxId": "12345678901",
  "contactPerson": "Ahmet Yılmaz",
  "email": "ahmet@abc.com",
  "phone": "+905551234567"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sessionId": "session123",
    "currentStep": 2,
    "progress": 25,
    "status": "in_progress"
  }
}
```

---

### 3. Complete Onboarding

```
POST /onboarding/:sessionId/complete
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sessionId": "session123",
    "customerId": "customer123",
    "status": "completed",
    "completedAt": "2025-01-15T11:30:00Z"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "email": "Invalid email format",
    "phone": "Phone must be at least 10 characters"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized - Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden - You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "requestId": "req-12345"
}
```

---

## Rate Limiting

- **Limit:** 100 requests per minute per IP
- **Headers:**
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 95`
  - `X-RateLimit-Reset: 1642252800`

---

## Pagination

All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

---

**Document Version:** 1.0
**Last Updated:** January 15, 2025
**Status:** Ready for Implementation
