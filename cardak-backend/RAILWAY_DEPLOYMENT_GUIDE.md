# 🚀 Railway Deployment Guide - Çardak Paketleme Backend

## Deployment Durumu: ✅ HAZIR

Bu rehber, Çardak Paketleme backend API'sini Railway'e deploy etmek için adım adım talimatlar içerir.

---

## 📋 Ön Koşullar

- ✅ GitHub hesabı (repository için)
- ✅ Railway hesabı (https://railway.app)
- ✅ Node.js 20.x
- ✅ npm veya yarn

---

## 🔧 Adım 1: GitHub Repository Hazırlığı

### 1.1 Repository'yi GitHub'a Push Et

```bash
# Repository'yi initialize et (eğer yapılmadıysa)
git init

# Remote repository'yi ekle
git remote add origin https://github.com/YOUR_USERNAME/cardak-backend.git

# Tüm dosyaları stage et
git add .

# Commit et
git commit -m "Initial commit: Simplified Cardak Paketleme Backend"

# Main branch'e push et
git branch -M main
git push -u origin main
```

### 1.2 .env.production Dosyasını Güvenli Tutun

⚠️ **ÖNEMLİ**: `.env.production` dosyasını Git'e commit etmeyin!

```bash
# .gitignore'a ekle
echo ".env.production" >> .gitignore
git add .gitignore
git commit -m "Add .env.production to gitignore"
git push
```

---

## 🚀 Adım 2: Railway'de Proje Oluştur

### 2.1 Railway Dashboard'a Giriş Yap

1. https://railway.app adresine git
2. GitHub hesabınla giriş yap
3. "New Project" butonuna tıkla

### 2.2 GitHub Repository'yi Bağla

1. "Deploy from GitHub repo" seçeneğini seç
2. GitHub hesabını authorize et
3. `cardak-backend` repository'sini seç
4. "Deploy" butonuna tıkla

---

## ⚙️ Adım 3: Environment Variables Ayarla

Railway dashboard'da aşağıdaki environment variables'ları ayarla:

### 🔴 KRITIK (Zorunlu)

```
JWT_SECRET=<GENERATE_STRONG_KEY>
SENTRY_DSN=<YOUR_SENTRY_DSN>
```

**JWT_SECRET Oluştur:**
```bash
# Terminal'de çalıştır
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**SENTRY_DSN Al:**
1. https://sentry.io adresine git
2. Yeni project oluştur (Node.js seç)
3. DSN'i kopyala ve Railway'e yapıştır

### 🟢 OPSİYONEL (Varsayılan Değerler Var)

```
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

---

## 💾 Adım 4: Persistent Storage Ayarla

SQLite database dosyasını kalıcı tutmak için:

1. Railway dashboard'da "Storage" seçeneğine tıkla
2. "Add Storage" butonuna tıkla
3. Aşağıdaki ayarları yap:
   - **Mount Path**: `/app/prisma`
   - **Size**: 1 GB (veya ihtiyacınıza göre)

---

## 🔨 Adım 5: Build ve Deploy Ayarları

Railway otomatik olarak aşağıdaki ayarları kullanacak:

```
Build Command: npm run build
Start Command: npm start
```

Eğer manuel olarak ayarlamak istersen:

1. Railway dashboard'da "Settings" seçeneğine tıkla
2. "Build Command" alanına: `npm run build`
3. "Start Command" alanına: `npm start`
4. "Save" butonuna tıkla

---

## 🚀 Adım 6: Deployment Başlat

1. Railway dashboard'da "Deploy" butonuna tıkla
2. Deployment logs'unu izle
3. Deployment tamamlanana kadar bekle (genellikle 2-5 dakika)

**Deployment Başarılı Göstergeleri:**
- ✅ Build başarılı
- ✅ Container başlatıldı
- ✅ Server port 3000'de dinliyor
- ✅ Sentry bağlantısı kuruldu

---

## ✅ Adım 7: Post-Deployment Doğrulama

### 7.1 Deployment URL'ini Bul

1. Railway dashboard'da proje sayfasına git
2. "Deployments" sekmesine tıkla
3. En son deployment'ın URL'ini kopyala

### 7.2 Health Check Endpoint'ini Test Et

```bash
# Health endpoint'i test et
curl https://YOUR_RAILWAY_URL/health

# Beklenen yanıt:
# {"status":"ok","timestamp":"2025-11-06T..."}
```

### 7.3 API Health Endpoint'ini Test Et

```bash
# API health endpoint'i test et
curl https://YOUR_RAILWAY_URL/api/v1/health

# Beklenen yanıt:
# {"status":"ok","database":"connected","timestamp":"2025-11-06T..."}
```

### 7.4 Database Bağlantısını Kontrol Et

```bash
# Sentry'de error tracking'i kontrol et
# https://sentry.io dashboard'a git
# Errors sekmesine tıkla
# Hiçbir error olmaması gerekir
```

---

## 🔗 API Endpoints

Deployment sonrası aşağıdaki endpoints kullanılabilir:

### Health Check
```
GET /health
GET /api/v1/health
```

### Authentication
```
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

### Quotes
```
GET /api/v1/quotes
POST /api/v1/quotes
GET /api/v1/quotes/:id
PUT /api/v1/quotes/:id
DELETE /api/v1/quotes/:id
```

### Onboarding
```
GET /api/v1/onboarding
POST /api/v1/onboarding
GET /api/v1/onboarding/:id
PUT /api/v1/onboarding/:id
```

### Analytics
```
GET /api/v1/analytics/dashboard
GET /api/v1/analytics/quotes
GET /api/v1/analytics/onboarding
```

### Settings
```
GET /api/v1/settings
PUT /api/v1/settings
```

### Audit Logs
```
GET /api/v1/audit-logs
```

---

## 🐛 Troubleshooting

### Build Hatası

**Hata**: `npm ERR! code ERESOLVE`

**Çözüm**:
```bash
npm install --legacy-peer-deps
git push
```

### Database Bağlantı Hatası

**Hata**: `ENOENT: no such file or directory, open 'production.db'`

**Çözüm**:
1. Railway dashboard'da persistent storage ayarlandığını kontrol et
2. Mount path'ın `/app/prisma` olduğunu doğrula
3. Deployment'ı yeniden başlat

### Sentry Bağlantı Hatası

**Hata**: `Sentry DSN is not configured`

**Çözüm**:
1. Railway dashboard'da `SENTRY_DSN` environment variable'ını kontrol et
2. DSN'in doğru olduğunu doğrula
3. Deployment'ı yeniden başlat

---

## 📊 Monitoring ve Logging

### Logs'u İzle

```bash
# Railway CLI'yi kur
npm install -g @railway/cli

# Giriş yap
railway login

# Logs'u izle
railway logs
```

### Sentry'de Errors'u İzle

1. https://sentry.io dashboard'a git
2. Proje sayfasına git
3. "Issues" sekmesine tıkla
4. Errors'u izle ve çöz

---

## 🔄 Continuous Deployment

Railway otomatik olarak GitHub'daki değişiklikleri deploy eder:

1. GitHub'da bir commit push et
2. Railway otomatik olarak build ve deploy eder
3. Deployment logs'unu Railway dashboard'da izle

---

## 📞 Destek ve Kaynaklar

- **Railway Docs**: https://docs.railway.app/
- **Sentry Docs**: https://docs.sentry.io/
- **Prisma Docs**: https://www.prisma.io/docs/
- **Express Docs**: https://expressjs.com/

---

**Son Güncelleme**: 2025-11-06
**Durum**: ✅ Production'a Hazır

