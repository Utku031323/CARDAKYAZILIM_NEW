# 🚀 RAILWAY DEPLOYMENT MASTER GUIDE

**Proje**: Çardak Paketleme Backend API  
**Durum**: ✅ Production'a Hazır  
**Son Güncelleme**: 2025-11-06

---

## 📋 İÇİNDEKİLER

1. [Railway Deployment Hazırlığı](#1-railway-deployment-hazırlığı)
2. [Deployment Adımları](#2-deployment-adımları)
3. [Admin Panel Erişimi](#3-admin-panel-erişimi)
4. [Deployment Sonrası Kontroller](#4-deployment-sonrası-kontroller)
5. [Hızlı Referans](#5-hızlı-referans)

---

## 1. RAILWAY DEPLOYMENT HAZIRLIĞI

### 1.1 Konfigürasyon Dosyaları

#### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "nixpacks",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
```

#### .railwayignore
```
# Development files
.env
.env.local
.env.development

# Testing
tests/
coverage/
jest.config.js

# Documentation
*.md

# Git
.git/
.gitignore

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Build artifacts (will be rebuilt)
dist/
node_modules/

# Local database
prisma/dev.db

# Uploads
uploads/

# Docker
Dockerfile
docker-compose.yml

# Scripts
scripts/

# Test copies
tests copy/
```

### 1.2 Environment Variables

**KRITIK (Zorunlu):**
```bash
JWT_SECRET=<GENERATE_STRONG_KEY_32_CHARS>
SENTRY_DSN=<YOUR_SENTRY_DSN>
```

**Varsayılan Değerler:**
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./production.db
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=1.0.0
FRONTEND_URL=https://cardakpaketleme.com
CORS_ORIGIN=https://cardakpaketleme.com
LOG_LEVEL=info
```

### 1.3 JWT_SECRET Oluştur

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.4 Sentry DSN Al

1. https://sentry.io adresine git
2. "Sign Up" butonuna tıkla
3. Email ve şifre ile kayıt ol
4. "Create Project" butonuna tıkla
5. "Node.js" seçeneğini seç
6. "Create Project" butonuna tıkla
7. "Settings" → "Client Keys (DSN)" sekmesine git
8. DSN'i kopyala

---

## 2. DEPLOYMENT ADIMLARI

### Adım 1: GitHub'a Push Et

```bash
git add .
git commit -m "Railway deployment ready"
git push origin main
```

### Adım 2: Railway'de Proje Oluştur

1. https://railway.app adresine git
2. GitHub hesabınla giriş yap
3. "New Project" butonuna tıkla
4. "Deploy from GitHub repo" seçeneğini seç
5. GitHub hesabını authorize et
6. `cardak-backend` repository'sini seç
7. "Deploy" butonuna tıkla

### Adım 3: Environment Variables Ayarla

Railway dashboard'da:
1. Proje'yi seç
2. "Variables" sekmesine tıkla
3. Aşağıdaki variables'ları ekle:
   - `JWT_SECRET`: Oluşturduğun güçlü anahtar
   - `SENTRY_DSN`: Sentry'den aldığın DSN
   - `FRONTEND_URL`: Frontend URL'i
   - `CORS_ORIGIN`: CORS origin'i

### Adım 4: Deployment'ı İzle

1. "Deployments" sekmesine tıkla
2. Build ve deploy işlemini izle
3. Başarılı olduğunu doğrula

---

## 3. ADMIN PANEL ERIŞIMI

### 3.1 Admin Hesabı

```
Email: admin@cardak.com
Şifre: SecurePassword123!
Rol: ADMIN
```

### 3.2 Login

```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cardak.com",
    "password": "SecurePassword123!"
  }'
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@cardak.com",
      "name": "Admin User",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3.3 API Endpoints

#### Quote (Teklif) Yönetimi

**Tüm Teklifleri Listele:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/quotes?skip=0&take=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Yeni Teklif Oluştur:**
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Şirketi",
    "email": "test@example.com",
    "phone": "+90 555 123 4567",
    "quantity": 100,
    "amount": 1000
  }'
```

**Teklif Durumunu Güncelle:**
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/quotes/quote_id/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "APPROVED"}'
```

#### Onboarding (Müşteri Kayıt) Yönetimi

**Tüm Onboarding'leri Listele:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/onboarding?skip=0&take=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Onboarding Durumunu Güncelle:**
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/onboarding/onboarding_id/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

#### Analytics (Analitik)

**Dashboard Analitikleri:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/analytics/dashboard" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Teklif Analitikleri:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/analytics/quotes?startDate=2025-11-01&endDate=2025-11-30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Settings (Ayarlar)

**Tüm Ayarları Listele:**
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/settings \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Ayarı Güncelle:**
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/settings/company_name \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "Yeni Şirket Adı"}'
```

#### Audit Logs (Denetim Kayıtları)

**Tüm Denetim Kayıtlarını Listele:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/audit-logs?skip=0&take=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 4. DEPLOYMENT SONRASI KONTROLLER

### 4.1 Temel Kontroller

**Health Check:**
```bash
curl https://YOUR_RAILWAY_URL/health
```

**API Health:**
```bash
curl https://YOUR_RAILWAY_URL/api/v1/health
```

### 4.2 Authentication Test

**Login Test:**
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}'
```

### 4.3 API Endpoints Test

**Quotes:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/quotes" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Onboarding:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/onboarding" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Analytics:**
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/analytics/dashboard" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4.4 Troubleshooting

| Hata | Çözüm |
|------|-------|
| 502 Bad Gateway | Railway logs'unu kontrol et, deployment'ı restart et |
| 500 Internal Server Error | Sentry dashboard'da error'u kontrol et |
| Database Connection Error | DATABASE_URL'i kontrol et, migrations'ı doğrula |
| JWT Token Error | JWT_SECRET'i kontrol et, token'ın geçerli olduğunu doğrula |
| CORS Error | CORS_ORIGIN'i kontrol et, origin header'ını doğrula |

---

## 4.5 Performance Kontrolleri

**Response Time Test:**
```bash
time curl -X GET https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Authorization: Bearer YOUR_TOKEN"
```
Beklenen: < 500ms

**Concurrent Requests Test:**
```bash
for i in {1..10}; do
  curl -X GET https://YOUR_RAILWAY_URL/api/v1/quotes \
    -H "Authorization: Bearer YOUR_TOKEN" &
done
wait
```

### 4.6 Security Kontrolleri

**CORS Test:**
```bash
curl -X OPTIONS https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Origin: https://cardakpaketleme.com" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

**Security Headers:**
```bash
curl -I https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Beklenen Headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000

### 4.7 Database Kontrolleri

**Database Bağlantısı:**
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/health \
  -H "Content-Type: application/json"
```

Beklenen: `"database": "connected"`

---

## 5. HIZLI REFERANS

### 5.1 API Endpoints Tablosu

| Endpoint | Method | Açıklama | Auth |
|----------|--------|---------|------|
| `/api/v1/auth/login` | POST | Admin giriş | ❌ |
| `/api/v1/auth/logout` | POST | Admin çıkış | ✅ |
| `/api/v1/auth/me` | GET | Mevcut kullanıcı | ✅ |
| `/api/v1/quotes` | GET | Teklifleri listele | ✅ |
| `/api/v1/quotes` | POST | Yeni teklif | ✅ |
| `/api/v1/quotes/:id` | GET | Teklif detayı | ✅ |
| `/api/v1/quotes/:id` | PUT | Teklifi güncelle | ✅ |
| `/api/v1/quotes/:id/status` | PUT | Durum güncelle | ✅ |
| `/api/v1/quotes/:id` | DELETE | Teklifi sil | ✅ |
| `/api/v1/onboarding` | GET | Onboarding'leri listele | ✅ |
| `/api/v1/onboarding` | POST | Yeni onboarding | ✅ |
| `/api/v1/onboarding/:id` | GET | Onboarding detayı | ✅ |
| `/api/v1/onboarding/:id` | PUT | Onboarding'i güncelle | ✅ |
| `/api/v1/onboarding/:id/status` | PUT | Durum güncelle | ✅ |
| `/api/v1/onboarding/:id` | DELETE | Onboarding'i sil | ✅ |
| `/api/v1/analytics/quotes` | GET | Teklif analitikleri | ✅ |
| `/api/v1/analytics/onboarding` | GET | Onboarding analitikleri | ✅ |
| `/api/v1/analytics/dashboard` | GET | Dashboard analitikleri | ✅ |
| `/api/v1/settings` | GET | Ayarları listele | ✅ |
| `/api/v1/settings/:key` | GET | Ayar detayı | ✅ |
| `/api/v1/settings/:key` | PUT | Ayarı güncelle | ✅ |
| `/api/v1/settings/:key` | DELETE | Ayarı sil | ✅ |
| `/api/v1/audit-logs` | GET | Denetim kayıtları | ✅ |
| `/api/v1/audit-logs/:id` | GET | Kayıt detayı | ✅ |

### 5.2 Environment Variables Tablosu

| Variable | Zorunlu | Varsayılan | Açıklama |
|----------|---------|-----------|---------|
| `JWT_SECRET` | ✅ | - | JWT imzalama anahtarı |
| `SENTRY_DSN` | ✅ | - | Sentry error tracking |
| `NODE_ENV` | ❌ | production | Ortam |
| `PORT` | ❌ | 3000 | API port'u |
| `DATABASE_URL` | ❌ | file:./production.db | Database URL'i |
| `JWT_EXPIRY` | ❌ | 15m | Token geçerlilik süresi |
| `REFRESH_TOKEN_EXPIRY` | ❌ | 7d | Refresh token süresi |
| `FRONTEND_URL` | ❌ | https://cardakpaketleme.com | Frontend URL'i |
| `CORS_ORIGIN` | ❌ | https://cardakpaketleme.com | CORS origin'i |
| `LOG_LEVEL` | ❌ | info | Log seviyesi |

### 5.3 Sık Karşılaşılan Hatalar ve Çözümleri

**Hata 1: Build Failed**
- Çözüm: `npm run build` komutunu lokal olarak çalıştır ve hataları düzelt

**Hata 2: Database Connection Error**
- Çözüm: DATABASE_URL'i kontrol et, migrations'ı doğrula

**Hata 3: JWT Token Invalid**
- Çözüm: JWT_SECRET'i kontrol et, token'ı yeniden oluştur

**Hata 4: CORS Error**
- Çözüm: CORS_ORIGIN'i kontrol et, frontend URL'ini doğrula

**Hata 5: Sentry Error Tracking Çalışmıyor**
- Çözüm: SENTRY_DSN'i kontrol et, Sentry dashboard'ında project'i doğrula

### 5.4 User Roles

| Role | Permissions |
|------|-------------|
| ADMIN | Tüm işlemleri yapabilir, sistem ayarlarını değiştirebilir |
| MANAGER | Teklif ve onboarding yönetimi, analitikleri görüntüleyebilir |
| VIEWER | Sadece görüntüleme, hiçbir şeyi değiştiremez |

---

## 📞 KAYNAKLAR

- **Railway Docs**: https://docs.railway.app/
- **Sentry Docs**: https://docs.sentry.io/
- **Prisma Docs**: https://www.prisma.io/docs/
- **Express Docs**: https://expressjs.com/
- **Node.js Docs**: https://nodejs.org/docs/

---

## ✅ KONTROL LİSTESİ

- [ ] JWT_SECRET oluşturuldu
- [ ] Sentry DSN alındı
- [ ] GitHub'a push edildi
- [ ] Railway'de proje oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] Deployment başlatıldı
- [ ] Health check başarılı
- [ ] Login test başarılı
- [ ] API endpoints test edildi
- [ ] Sentry error tracking çalışıyor

---

**Durum**: ✅ Production'a Hazır - Railway

