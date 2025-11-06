# 🔄 PROJE BASİTLEŞTİRME PLANI

**Tarih:** 2025-11-06
**Amaç:** Karmaşık özellikleri kaldırarak basit admin paneli backend'i oluşturma

---

## 📋 KALDIRILAN DOSYALAR

### Controllers (5 dosya)
- [ ] `src/controllers/payment.controller.ts` - Ödeme işlemleri
- [ ] `src/controllers/api-key.controller.ts` - API key yönetimi
- [ ] `src/controllers/document.controller.ts` - Dosya yönetimi
- [ ] Kısmi güncelleme: `src/controllers/onboarding.controller.ts` (dosya upload kısımları)

### Services (5 dosya)
- [ ] `src/services/payment.service.ts` - Ödeme servisi
- [ ] `src/services/sms.service.ts` - SMS servisi
- [ ] `src/services/email.service.ts` - Email servisi
- [ ] `src/services/api-key.service.ts` - API key servisi
- [ ] Kısmi güncelleme: `src/services/onboarding.service.ts` (dosya upload kısımları)

### Routes (4 dosya)
- [ ] `src/routes/payments.ts` - Ödeme route'ları
- [ ] `src/routes/api-keys.ts` - API key route'ları
- [ ] `src/routes/documents.ts` - Dosya route'ları

### Config (3 dosya)
- [ ] `src/config/stripe.ts` - Stripe konfigürasyonu
- [ ] `src/config/twilio.ts` - Twilio konfigürasyonu
- [ ] `src/config/email.ts` - Email konfigürasyonu

### Middleware (2 dosya)
- [ ] `src/middleware/api-key.middleware.ts` - API key middleware
- [ ] `src/middleware/upload.middleware.ts` - Dosya upload middleware

### Prisma (Migration)
- [ ] Yeni migration: Payment, Invoice, APIKey modellerini kaldır
- [ ] Yeni migration: OnboardingDocument modelini kaldır
- [ ] Quote modelinden payment relation'ını kaldır

---

## 📝 GÜNCELLENECEK DOSYALAR

### 1. `package.json`
**Kaldırılacak Dependencies:**
- `@stripe/stripe-js` - Stripe JS SDK
- `stripe` - Stripe Node SDK
- `twilio` - Twilio SDK
- `nodemailer` - Email SDK
- `multer` - File upload middleware
- `@types/multer` - Multer types
- `@types/nodemailer` - Nodemailer types

**Tutulacak Dependencies:**
- `@sentry/node` - Error tracking ✅
- `express` - Web framework ✅
- `bcrypt` - Password hashing ✅
- `jsonwebtoken` - JWT ✅
- `cors` - CORS ✅
- `helmet` - Security ✅
- `express-rate-limit` - Rate limiting ✅
- `winston` - Logging ✅
- `@prisma/client` - Database ORM ✅

### 2. `prisma/schema.prisma`
**Kaldırılacak Modeller:**
- `Payment` model
- `Invoice` model
- `APIKey` model
- `OnboardingDocument` model

**Güncellenecek Modeller:**
- `Quote` - `payments` relation'ını kaldır
- `User` - `apiKeys` relation'ını kaldır
- `Onboarding` - `documents` relation'ını kaldır

**Tutulacak Modeller:**
- `User` ✅
- `Quote` ✅
- `Onboarding` ✅
- `OnboardingStep` ✅
- `PricingTier` ✅
- `Settings` ✅
- `AuditLog` ✅

### 3. `src/app.ts`
**Kaldırılacak Routes:**
- `/api/v1/payments` - Ödeme route'ları
- `/api/v1/api-keys` - API key route'ları
- `/api/v1/documents` - Dosya route'ları

**Tutulacak Routes:**
- `/health` ✅
- `/api/v1/auth` ✅
- `/api/v1/quotes` ✅
- `/api/v1/onboarding` ✅
- `/api/v1/analytics` ✅
- `/api/v1/settings` ✅
- `/api/v1/audit-logs` ✅

### 4. `src/controllers/onboarding.controller.ts`
**Kaldırılacak Fonksiyonlar:**
- `uploadDocument()` - Dosya yükleme
- `getDocuments()` - Dosya listeleme
- `deleteDocument()` - Dosya silme

**Tutulacak Fonksiyonlar:**
- `createOnboarding()` ✅
- `getOnboarding()` ✅
- `updateOnboarding()` ✅
- `listOnboarding()` ✅

### 5. `src/services/onboarding.service.ts`
**Kaldırılacak Fonksiyonlar:**
- `uploadDocument()` - Dosya yükleme
- `getDocuments()` - Dosya listeleme
- `deleteDocument()` - Dosya silme

**Tutulacak Fonksiyonlar:**
- `createOnboarding()` ✅
- `getOnboarding()` ✅
- `updateOnboarding()` ✅
- `listOnboarding()` ✅

### 6. `src/routes/onboarding.ts`
**Kaldırılacak Routes:**
- `POST /documents` - Dosya yükleme
- `GET /documents` - Dosya listeleme
- `DELETE /documents/:id` - Dosya silme

**Tutulacak Routes:**
- `POST /` - Onboarding oluştur ✅
- `GET /:id` - Onboarding getir ✅
- `PUT /:id` - Onboarding güncelle ✅
- `GET /` - Onboarding listele ✅

### 7. `.env.production`
**Kaldırılacak Variables:**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `SENDGRID_API_KEY`
- `SENDER_EMAIL`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_REGION`

**Tutulacak Variables:**
- `NODE_ENV` ✅
- `PORT` ✅
- `DATABASE_URL` ✅
- `JWT_SECRET` ✅
- `JWT_EXPIRY` ✅
- `REFRESH_TOKEN_EXPIRY` ✅
- `SENTRY_DSN` ✅
- `SENTRY_ENVIRONMENT` ✅
- `SENTRY_RELEASE` ✅
- `FRONTEND_URL` ✅
- `CORS_ORIGIN` ✅
- `LOG_LEVEL` ✅

### 8. `DEPLOYMENT_CHECKLIST.md`
- Güncellenecek: Sadece Sentry DSN ve JWT_SECRET gerekli
- Güncellenecek: External services setup kısmı basitleştirilecek

### 9. `README.md`
- Güncellenecek: Proje açıklaması basitleştirilecek
- Güncellenecek: API endpoints listesi güncellenecek

---

## 🔄 ADIM ADIM UYGULAMA SIRASI

### Faz 1: Dosya Silme (10 dosya)
1. Controllers: payment, api-key, document
2. Services: payment, sms, email, api-key
3. Routes: payments, api-keys, documents
4. Config: stripe, twilio, email
5. Middleware: api-key, upload

### Faz 2: Prisma Schema Güncelleme
1. Payment, Invoice, APIKey, OnboardingDocument modellerini kaldır
2. Quote modelinden payment relation'ını kaldır
3. User modelinden apiKeys relation'ını kaldır
4. Onboarding modelinden documents relation'ını kaldır
5. Migration oluştur ve çalıştır

### Faz 3: Kod Güncellemeleri
1. `src/app.ts` - Route'ları güncelle
2. `src/controllers/onboarding.controller.ts` - Dosya fonksiyonlarını kaldır
3. `src/services/onboarding.service.ts` - Dosya fonksiyonlarını kaldır
4. `src/routes/onboarding.ts` - Dosya route'larını kaldır

### Faz 4: Dependency Temizliği
1. `package.json` - Gereksiz dependencies'i kaldır
2. `npm install` - Dependencies'i güncelle

### Faz 5: Configuration Güncelleme
1. `.env.production` - Gereksiz variables'ı kaldır
2. `DEPLOYMENT_CHECKLIST.md` - Güncelle
3. `README.md` - Güncelle

### Faz 6: Test ve Doğrulama
1. `npm run build` - Build başarılı mı?
2. `npm run lint` - Linting hataları var mı?
3. `npm run test` - Testler geçti mi?

---

## ✅ BEKLENEN SONUÇ

**Kaldırılan Dosya Sayısı:** 15
**Güncellenecek Dosya Sayısı:** 9
**Kaldırılan Dependencies:** 7
**Tutulacak Dependencies:** 12

**Yeni Proje Boyutu:** ~40% daha küçük
**Deployment Süresi:** ~50% daha hızlı
**Bakım Karmaşıklığı:** ~60% daha basit

---

## 📊 SONUÇ

Basitleştirilmiş admin paneli backend'i:
- ✅ Müşteri talebi takibi (Quote, Onboarding)
- ✅ Admin yönetimi (User, Roles)
- ✅ İstatistikler (Analytics)
- ✅ Ayarlar (Settings)
- ✅ Audit logs (Monitoring)
- ✅ Error tracking (Sentry)
- ❌ Ödeme sistemi
- ❌ SMS sistemi
- ❌ Email sistemi
- ❌ Dosya yükleme
- ❌ API key yönetimi

**Deployment'a Hazır:** ✅ EVET

