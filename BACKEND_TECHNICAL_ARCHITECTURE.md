# Çardak Paketleme - Backend Teknik Mimarisi

## 1. SİSTEM MİMARİSİ

### 1.1 Genel Mimari Diyagramı

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  - Müşteri Sayfaları (Index, TeklifAl, Basla)             │
│  - Yönetici Paneli (9 sayfa)                              │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ API Routes & Controllers                             │  │
│  │ - Auth, Quotes, Onboarding, Pricing, Settings       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Business Logic & Services                            │  │
│  │ - AuthService, QuoteService, EmailService           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Middleware & Security                                │  │
│  │ - Auth, Validation, Error Handling, Logging         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌──────────┐
    │PostgreSQL│  │S3/File │  │SendGrid  │
    │Database  │  │Storage │  │Email     │
    └────────┘  └────────┘  └──────────┘
```

### 1.2 Katmanlı Mimari

```
┌─────────────────────────────────────────┐
│     Presentation Layer (Frontend)       │
│  React Components + React Router        │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│      API Layer (Express Routes)         │
│  - Request validation                   │
│  - Response formatting                  │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│    Business Logic Layer (Services)      │
│  - Core business rules                  │
│  - Data processing                      │
│  - External service integration         │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│    Data Access Layer (Prisma ORM)       │
│  - Database queries                     │
│  - Data persistence                     │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│    Database Layer (PostgreSQL)          │
│  - Data storage                         │
│  - Relationships                        │
└─────────────────────────────────────────┘
```

---

## 2. API TASARIMI

### 2.1 RESTful API Prensipleri

**Base URL:** `https://api.cardakpaketleme.com/api/v1`

**HTTP Yöntemleri:**
- `GET` - Veri alma
- `POST` - Veri oluşturma
- `PUT` - Veri güncelleme
- `DELETE` - Veri silme
- `PATCH` - Kısmi güncelleme

**Yanıt Formatı:**
```json
{
  "success": true,
  "data": { /* veri */ },
  "message": "İşlem başarılı",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**Hata Yanıtı:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Doğrulama hatası",
    "details": [
      { "field": "email", "message": "Geçerli e-posta giriniz" }
    ]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.2 Kimlik Doğrulama Akışı

```
1. Kullanıcı giriş yapar
   POST /api/v1/auth/login
   { email, password }
   
2. Server JWT token döndürür
   { accessToken, refreshToken, expiresIn }
   
3. Frontend token'ı localStorage'a kaydeder
   
4. Her istekte Authorization header'ında gönderir
   Authorization: Bearer <accessToken>
   
5. Server token'ı doğrular
   - Geçerli mi?
   - Süresi dolmadı mı?
   - Kullanıcı aktif mi?
   
6. Token süresi dolmuşsa refresh token kullanılır
   POST /api/v1/auth/refresh
   { refreshToken }
   
7. Yeni accessToken döndürülür
```

### 2.3 Hata Kodları

| Kod | HTTP | Anlamı |
|-----|------|--------|
| INVALID_CREDENTIALS | 401 | Geçersiz kimlik bilgileri |
| TOKEN_EXPIRED | 401 | Token süresi doldu |
| UNAUTHORIZED | 403 | Yetkisiz erişim |
| NOT_FOUND | 404 | Kayıt bulunamadı |
| VALIDATION_ERROR | 400 | Doğrulama hatası |
| CONFLICT | 409 | Çakışma (örn: email zaten var) |
| INTERNAL_ERROR | 500 | Sunucu hatası |

---

## 3. VERİTABANI TASARIMI

### 3.1 ER Diyagramı

```
┌─────────────┐
│   users     │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ name        │
│ role        │
│ isActive    │
│ createdAt   │
└─────────────┘
      │
      │ 1:N
      │
      ▼
┌─────────────────┐
│    quotes       │
├─────────────────┤
│ id (PK)         │
│ companyName     │
│ email           │
│ status          │
│ createdBy (FK)  │
│ createdAt       │
└─────────────────┘

┌──────────────────┐
│  onboarding      │
├──────────────────┤
│ id (PK)          │
│ companyName      │
│ currentStep      │
│ status           │
│ createdAt        │
└──────────────────┘
      │
      │ 1:N
      │
      ▼
┌──────────────────┐
│ onboarding_steps │
├──────────────────┤
│ id (PK)          │
│ onboardingId(FK) │
│ stepNumber       │
│ data (JSON)      │
│ completedAt      │
└──────────────────┘

┌──────────────────┐
│  pricing_tiers   │
├──────────────────┤
│ id (PK)          │
│ name             │
│ monthlyPrice     │
│ status           │
│ createdAt        │
└──────────────────┘

┌──────────────────┐
│    settings      │
├──────────────────┤
│ id (PK)          │
│ key              │
│ value (JSON)     │
│ updatedAt        │
└──────────────────┘
```

### 3.2 Prisma Schema Örneği

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(MANAGER)
  isActive  Boolean  @default(true)
  quotes    Quote[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Quote {
  id                  String   @id @default(cuid())
  companyName         String
  contactName         String
  email               String
  phone               String
  monthlyOrderCount   Int
  productTypes        String[]
  status              QuoteStatus @default(PENDING)
  calculatedPrice     Float?
  notes               String?
  createdBy           String
  user                User     @relation(fields: [createdBy], references: [id])
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

enum Role {
  ADMIN
  MANAGER
  VIEWER
}

enum QuoteStatus {
  PENDING
  REVIEWED
  QUOTED
  ACCEPTED
  REJECTED
}
```

---

## 4. GÜVENLİK UYGULAMASI

### 4.1 Kimlik Doğrulama Stratejisi

**JWT Token Yapısı:**
```
Header: { alg: "HS256", typ: "JWT" }
Payload: {
  sub: "user_id",
  email: "user@example.com",
  role: "admin",
  iat: 1234567890,
  exp: 1234571490
}
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

**Token Süresi:**
- Access Token: 15 dakika
- Refresh Token: 7 gün

### 4.2 Şifre Güvenliği

```typescript
// Şifre hashleme (bcrypt)
const hashedPassword = await bcrypt.hash(password, 10);

// Şifre doğrulama
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 4.3 CORS Yapılandırması

```typescript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 4.4 Rate Limiting

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // 100 istek
  message: 'Çok fazla istek gönderdiniz'
});

app.use('/api/', limiter);
```

---

## 5. HATA YÖNETİMİ

### 5.1 Global Error Handler

```typescript
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Sunucu hatası';
  
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: message,
      details: err.details || []
    }
  });
});
```

### 5.2 Özel Hata Sınıfları

```typescript
class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.code = 'VALIDATION_ERROR';
    this.status = 400;
    this.details = details;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'INVALID_CREDENTIALS';
    this.status = 401;
  }
}
```

---

## 6. LOGGING VE MONİTORİNG

### 6.1 Winston Logger

```typescript
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 6.2 Denetim Günlükleri

```typescript
// Her önemli işlem kaydedilir
await auditLog.create({
  userId: user.id,
  action: 'QUOTE_CREATED',
  resourceId: quote.id,
  changes: { /* değişiklikler */ },
  timestamp: new Date()
});
```

---

## 7. TESTING STRATEJİSİ

### 7.1 Test Türleri

**Unit Tests:**
- Service fonksiyonları
- Utility fonksiyonları
- Validators

**Integration Tests:**
- API uç noktaları
- Veritabanı işlemleri
- Harici servisler

**E2E Tests:**
- Tam kullanıcı akışları
- Kimlik doğrulama
- CRUD işlemleri

### 7.2 Test Örneği

```typescript
describe('AuthService', () => {
  it('should login user with valid credentials', async () => {
    const user = await authService.login('admin@cardak.com', 'admin123');
    expect(user).toHaveProperty('accessToken');
    expect(user).toHaveProperty('refreshToken');
  });

  it('should throw error with invalid credentials', async () => {
    await expect(
      authService.login('admin@cardak.com', 'wrongpassword')
    ).rejects.toThrow('Geçersiz kimlik bilgileri');
  });
});
```

---

## 8. DAĞITIM YAPISI

### 8.1 Docker Containerization

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 8.2 Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/cardak
      - JWT_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=cardak
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 8.3 Environment Variables

```env
# Server
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cardak

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Email
SENDGRID_API_KEY=your-sendgrid-key
SENDER_EMAIL=noreply@cardakpaketleme.com

# File Storage
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=cardak-files

# Frontend
FRONTEND_URL=https://cardakpaketleme.com

# Logging
LOG_LEVEL=info
```

---

## 9. PERFORMANS OPTİMİZASYONU

### 9.1 Veritabanı Optimizasyonu

- İndeksler: email, status, createdAt
- Sorgu optimizasyonu
- Connection pooling
- Caching (Redis)

### 9.2 API Optimizasyonu

- Pagination
- Filtering
- Sorting
- Partial responses
- Compression (gzip)

### 9.3 Caching Stratejisi

```typescript
// Redis caching
const cachedData = await redis.get(`quotes:${userId}`);
if (cachedData) {
  return JSON.parse(cachedData);
}

const data = await Quote.find({ createdBy: userId });
await redis.setex(`quotes:${userId}`, 3600, JSON.stringify(data));
return data;
```

---

## 10. SONRAKI ADIMLAR

1. ✅ Backend repository oluştur
2. ✅ Node.js + Express.js kurulumu
3. ✅ PostgreSQL veritabanı kurulumu
4. ✅ Prisma ORM kurulumu
5. ✅ Temel proje yapısını oluştur
6. ✅ Kimlik doğrulama sistemi geliştir
7. ✅ API uç noktalarını geliştir
8. ✅ Frontend entegrasyonunu yap
9. ✅ Testing ve QA
10. ✅ Dağıtım ve monitoring

---

**Rapor Tarihi:** 2025-01-15
**Versiyon:** 1.0
**Durum:** Hazır Uygulama İçin
