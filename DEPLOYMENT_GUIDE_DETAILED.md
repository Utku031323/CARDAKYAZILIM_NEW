# Çardak Paketleme Backend - Detaylı Deployment Rehberi

**Hedef Kitle:** İlk kez deployment yapacak geliştiriciler
**Zorluk Seviyesi:** Orta
**Tahmini Süre:** 40-60 saat

---

## 📋 İçindekiler

1. [Ön Koşullar](#ön-koşullar)
2. [Faz 1: Kritik Hazırlıklar](#faz-1-kritik-hazırlıklar)
3. [Faz 2: Dış Servisler Kurulumu](#faz-2-dış-servisler-kurulumu)
4. [Faz 3: Deployment Platform Seçimi](#faz-3-deployment-platform-seçimi)
5. [Faz 4: Production Deployment](#faz-4-production-deployment)
6. [Faz 5: Post-Deployment Verification](#faz-5-post-deployment-verification)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Ön Koşullar

### Gerekli Araçlar
- Git
- Node.js 18+ LTS
- npm veya yarn
- Docker & Docker Compose (opsiyonel ama önerilen)
- PostgreSQL 15+ (local test için)

### Gerekli Hesaplar
- GitHub (code repository)
- Stripe (payment processing)
- Twilio (SMS)
- SendGrid veya Mailgun (email)
- AWS (S3 file storage)
- Hosting provider (Heroku, Railway, DigitalOcean, vb.)

---

## 🚀 Faz 1: Kritik Hazırlıklar

### 1.1 PostgreSQL Kurulumu

**Windows:**
```bash
# PostgreSQL indir ve kur
# https://www.postgresql.org/download/windows/

# Kurulum sonrası, psql ile bağlan
psql -U postgres

# Production database oluştur
CREATE DATABASE cardak_production;
CREATE USER cardak_user WITH PASSWORD 'strong_password_here';
ALTER ROLE cardak_user SET client_encoding TO 'utf8';
ALTER ROLE cardak_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE cardak_user SET default_transaction_deferrable TO on;
ALTER ROLE cardak_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE cardak_production TO cardak_user;
```

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb cardak_production
createuser cardak_user
```

**Linux (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb cardak_production
sudo -u postgres createuser cardak_user
```

### 1.2 Environment Variables Hazırlanması

**Production .env dosyası oluştur:**
```bash
# cardak-backend/.env.production

# Server
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://cardak_user:strong_password@localhost:5432/cardak_production

# JWT (GÜÇLÜ ŞIFRELER KULLAN!)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-change-this
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@cardakpaketleme.com

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=cardak-production-files
AWS_REGION=eu-west-1

# Frontend
FRONTEND_URL=https://cardakpaketleme.com
CORS_ORIGIN=https://cardakpaketleme.com

# Logging
LOG_LEVEL=info
```

**⚠️ GÜVENLİK UYARISI:**
- `.env.production` dosyasını ASLA git'e commit etmeyin
- `.gitignore` dosyasında `.env*` olduğundan emin olun
- Production secrets'ları hosting provider'ın secret management sisteminde saklayın

### 1.3 Database Migration

```bash
# Production database'e migration'ları uygula
npm run prisma:migrate -- --name production_initial

# Seed data ekle (opsiyonel)
npm run prisma:seed
```

---

## 🔌 Faz 2: Dış Servisler Kurulumu

### 2.1 Stripe Setup

1. **Stripe Account Oluştur:**
   - https://dashboard.stripe.com/register
   - Email ve şifre ile kayıt ol
   - Business bilgilerini doldur

2. **API Keys Al:**
   - Dashboard → Developers → API Keys
   - Secret Key'i kopyala (sk_live_...)
   - Publishable Key'i kopyala (pk_live_...)

3. **Webhook Endpoint Konfigür:**
   - Developers → Webhooks
   - "Add endpoint" tıkla
   - URL: `https://yourdomain.com/api/v1/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 2.2 Twilio Setup

1. **Twilio Account Oluştur:**
   - https://www.twilio.com/console
   - Phone number satın al

2. **Credentials Al:**
   - Account SID
   - Auth Token
   - Phone Number

### 2.3 SendGrid Setup

1. **SendGrid Account Oluştur:**
   - https://sendgrid.com/
   - Email ve şifre ile kayıt ol

2. **API Key Oluştur:**
   - Settings → API Keys
   - "Create API Key" tıkla
   - Full Access seç
   - Key'i kopyala

3. **Sender Email Doğrula:**
   - Settings → Sender Authentication
   - Domain veya Single Sender doğrula

### 2.4 AWS S3 Setup

1. **AWS Account Oluştur:**
   - https://aws.amazon.com/
   - Kredi kartı ile kayıt ol

2. **S3 Bucket Oluştur:**
   ```bash
   # AWS CLI ile
   aws s3 mb s3://cardak-production-files --region eu-west-1
   ```

3. **IAM User Oluştur:**
   - IAM → Users → Create User
   - Programmatic access seç
   - S3 full access policy ekle
   - Access Key ID ve Secret Access Key'i kopyala

---

## 🏠 Faz 3: Deployment Platform Seçimi

### Seçenek 1: Railway (Önerilen - Başlangıç için)

**Avantajlar:**
- Kolay setup
- PostgreSQL built-in
- GitHub integration
- $5/ay free tier

**Kurulum:**
```bash
# 1. Railway.app'a git ve GitHub ile login ol
# 2. "New Project" → "Deploy from GitHub repo"
# 3. cardak-backend repository seç
# 4. Environment variables ekle
# 5. Deploy et
```

### Seçenek 2: Heroku

**Kurulum:**
```bash
# Heroku CLI kur
npm install -g heroku

# Login ol
heroku login

# App oluştur
heroku create cardak-backend

# PostgreSQL add-on ekle
heroku addons:create heroku-postgresql:standard-0

# Environment variables ekle
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
# ... diğer variables

# Deploy et
git push heroku main
```

### Seçenek 3: DigitalOcean App Platform

**Kurulum:**
```bash
# 1. DigitalOcean.com'a git
# 2. App Platform → Create App
# 3. GitHub repository seç
# 4. Environment variables ekle
# 5. Deploy et
```

---

## 🚀 Faz 4: Production Deployment

### 4.1 Build Process

```bash
# Production build yap
npm run build

# Build'i test et
npm start
```

### 4.2 Database Setup

```bash
# Production database'e migration'ları uygula
NODE_ENV=production npm run prisma:migrate

# Seed data ekle
NODE_ENV=production npm run prisma:seed
```

### 4.3 Health Check

```bash
# Server'ın çalışıp çalışmadığını kontrol et
curl https://yourdomain.com/health

# Beklenen response:
# {
#   "status": "OK",
#   "timestamp": "2025-11-03T10:00:00.000Z",
#   "uptime": 123.456
# }
```

---

## ✅ Faz 5: Post-Deployment Verification

### 5.1 API Endpoints Test

```bash
# Health check
curl https://yourdomain.com/api/v1/health

# Login test
curl -X POST https://yourdomain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"Admin@123456"}'

# Quote list test
curl https://yourdomain.com/api/v1/quotes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5.2 Monitoring Setup

- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Log aggregation (Datadog, ELK)
- Performance monitoring (New Relic)

### 5.3 Backup Configuration

```bash
# Automated daily backups
# PostgreSQL backup script
pg_dump cardak_production > backup_$(date +%Y%m%d).sql

# S3'e upload et
aws s3 cp backup_*.sql s3://cardak-backups/
```

---

## 🔧 Troubleshooting

### Problem: Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Çözüm:**
- PostgreSQL çalışıyor mu kontrol et: `sudo systemctl status postgresql`
- DATABASE_URL doğru mu kontrol et
- Firewall kurallarını kontrol et

### Problem: Stripe Webhook Fails
```
Error: Webhook signature verification failed
```
**Çözüm:**
- Webhook endpoint URL'i doğru mu kontrol et
- Signing secret'ı doğru mu kontrol et
- Firewall webhook'u bloke etmiyor mu kontrol et

### Problem: Email Not Sending
```
Error: Invalid credentials
```
**Çözüm:**
- SendGrid API key doğru mu kontrol et
- Sender email doğrulanmış mı kontrol et
- Rate limit aşıldı mı kontrol et

### Problem: High Memory Usage
```
Error: JavaScript heap out of memory
```
**Çözüm:**
- Node.js memory limit artır: `NODE_OPTIONS=--max-old-space-size=2048`
- Database query'leri optimize et
- Caching ekle (Redis)

---

## 📞 Destek ve Kaynaklar

- **Express.js Docs:** https://expressjs.com/
- **Prisma Docs:** https://www.prisma.io/docs/
- **Stripe Docs:** https://stripe.com/docs
- **Railway Docs:** https://docs.railway.app/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

**Sonraki Adım:** Deployment tamamlandıktan sonra `MONITORING_SETUP.md` dosyasını okuyun.


