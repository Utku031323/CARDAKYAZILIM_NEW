# 🔄 PROJE BASİTLEŞTİRME - DETAYLI PLAN

**Tarih:** 2025-11-06
**Amaç:** Karmaşık özellikleri kaldırarak basit admin paneli backend'i oluşturma

---

## 📋 KALDIRILAN DOSYALAR (15 dosya)

### Controllers (3 dosya)
```
❌ src/controllers/payment.controller.ts (Ödeme işlemleri)
❌ src/controllers/api-key.controller.ts (API key yönetimi)
❌ src/controllers/document.controller.ts (Dosya yönetimi)
```

### Services (4 dosya)
```
❌ src/services/payment.service.ts (Ödeme servisi)
❌ src/services/sms.service.ts (SMS servisi)
❌ src/services/email.service.ts (Email servisi)
❌ src/services/api-key.service.ts (API key servisi)
```

### Routes (3 dosya)
```
❌ src/routes/payments.ts (Ödeme route'ları)
❌ src/routes/api-keys.ts (API key route'ları)
❌ src/routes/documents.ts (Dosya route'ları)
```

### Config (3 dosya)
```
❌ src/config/stripe.ts (Stripe konfigürasyonu)
❌ src/config/twilio.ts (Twilio konfigürasyonu)
❌ src/config/email.ts (Email konfigürasyonu)
```

### Middleware (2 dosya)
```
❌ src/middleware/api-key.middleware.ts (API key middleware)
❌ src/middleware/upload.middleware.ts (Dosya upload middleware)
```

---

## 📝 GÜNCELLENECEK DOSYALAR (9 dosya)

### 1. `package.json` - Dependencies Temizliği
**Kaldırılacak (7):**
- `@stripe/stripe-js`
- `stripe`
- `twilio`
- `nodemailer`
- `multer`
- `@types/multer`
- `@types/nodemailer`

### 2. `prisma/schema.prisma` - Schema Basitleştirme
**Kaldırılacak Modeller (4):**
- `Payment` model
- `Invoice` model
- `APIKey` model
- `OnboardingDocument` model

**Güncellenecek Modeller (3):**
- `Quote` - `payments` relation'ını kaldır
- `User` - `apiKeys` relation'ını kaldır
- `Onboarding` - `documents` relation'ını kaldır

### 3. `src/app.ts` - Routes Güncelleme
**Kaldırılacak Routes (3):**
- `/api/v1/payments`
- `/api/v1/api-keys`
- `/api/v1/documents`

### 4. `src/controllers/onboarding.controller.ts`
**Kaldırılacak Fonksiyonlar (3):**
- `uploadDocument()`
- `getDocuments()`
- `deleteDocument()`

### 5. `src/services/onboarding.service.ts`
**Kaldırılacak Fonksiyonlar (3):**
- `uploadDocument()`
- `getDocuments()`
- `deleteDocument()`

### 6. `src/routes/onboarding.ts`
**Kaldırılacak Routes (3):**
- `POST /documents`
- `GET /documents`
- `DELETE /documents/:id`

### 7. `.env.production` - Environment Variables
**Kaldırılacak (11):**
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER
- SENDGRID_API_KEY
- SENDER_EMAIL
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET
- AWS_REGION

### 8. `DEPLOYMENT_CHECKLIST.md`
- Sadece Sentry DSN ve JWT_SECRET gerekli
- External services setup basitleştirilecek

### 9. `README.md`
- Proje açıklaması basitleştirilecek
- API endpoints listesi güncellenecek

---

## 🔄 UYGULAMA SIRASI (6 Faz)

### Faz 1: Dosya Silme (15 dosya)
### Faz 2: Prisma Schema Güncelleme
### Faz 3: Kod Güncellemeleri
### Faz 4: Dependency Temizliği
### Faz 5: Configuration Güncelleme
### Faz 6: Test ve Doğrulama

---

## 📊 BEKLENEN SONUÇ

| Metrik | Değer |
|--------|-------|
| Kaldırılan Dosya | 15 |
| Güncellenecek Dosya | 9 |
| Kaldırılan Dependencies | 7 |
| Proje Boyutu Azalması | ~40% |
| Deployment Süresi | ~50% daha hızlı |

---

## ✅ TUTULACAK ÖZELLIKLER

- ✅ Authentication (Admin girişi)
- ✅ Quote Management (Teklif talepleri)
- ✅ Onboarding Management (Onboarding talepleri)
- ✅ Analytics (İstatistikler)
- ✅ Settings (Ayarlar)
- ✅ Pricing (Fiyatlandırma)
- ✅ Audit Logs (İşlem takibi)
- ✅ Error Tracking (Sentry)
- ✅ Rate Limiting (Güvenlik)
- ✅ Security Headers (Helmet)
- ✅ Logging (Winston)

---

## ❌ KALDIRILAN ÖZELLIKLER

- ❌ Payment Processing (Stripe)
- ❌ SMS Notifications (Twilio)
- ❌ Email Sending (SendGrid/Nodemailer)
- ❌ File Upload (Multer/AWS S3)
- ❌ API Key Management

