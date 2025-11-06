# Çardak Paketleme Backend - Deployment Troubleshooting Rehberi

---

## 🔴 KRITIK HATALAR

### 1. Database Connection Error

**Hata Mesajı:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
Error: getaddrinfo ENOTFOUND postgres
```

**Nedenleri:**
- PostgreSQL çalışmıyor
- DATABASE_URL yanlış
- Firewall engelleme
- Network connectivity sorunu

**Çözüm Adımları:**

```bash
# 1. PostgreSQL çalışıyor mu kontrol et
sudo systemctl status postgresql
# Eğer çalışmıyorsa başlat:
sudo systemctl start postgresql

# 2. DATABASE_URL kontrol et
echo $DATABASE_URL
# Beklenen format: postgresql://user:password@host:port/database

# 3. psql ile bağlantı test et
psql -U cardak_user -d cardak_production -h localhost

# 4. Firewall kurallarını kontrol et
sudo ufw status
# Port 5432 açık mı kontrol et

# 5. Network connectivity test et
ping localhost
telnet localhost 5432
```

**Eğer hala çalışmazsa:**
- PostgreSQL'i yeniden kur
- Database user permissions'ı kontrol et
- PostgreSQL logs'u kontrol et: `/var/log/postgresql/`

---

### 2. Build Hatası

**Hata Mesajı:**
```
error TS2307: Cannot find module
error TS1005: ',' expected
```

**Çözüm:**

```bash
# 1. Dependencies'i yeniden kur
rm -rf node_modules package-lock.json
npm install

# 2. TypeScript cache'i temizle
rm -rf dist

# 3. Build'i tekrar dene
npm run build

# 4. Hata mesajını oku ve dosyayı kontrol et
# Örnek: src/services/payment.service.ts:45
# Dosyayı aç ve syntax'ı kontrol et
```

---

### 3. Environment Variables Eksik

**Hata Mesajı:**
```
Error: JWT_SECRET is not defined
Error: STRIPE_SECRET_KEY is not defined
```

**Çözüm:**

```bash
# 1. .env dosyasını kontrol et
cat .env

# 2. Tüm gerekli variables'ı ekle
# Şu variables'lar zorunlu:
# - NODE_ENV
# - PORT
# - DATABASE_URL
# - JWT_SECRET
# - STRIPE_SECRET_KEY
# - TWILIO_ACCOUNT_SID
# - SENDGRID_API_KEY

# 3. Environment'ı reload et
source .env
npm start
```

---

## 🟠 YAYGÜN HATALAR

### 4. Stripe Webhook Başarısız

**Hata Mesajı:**
```
Error: Webhook signature verification failed
```

**Çözüm:**

```bash
# 1. Webhook endpoint URL'i kontrol et
# Stripe Dashboard → Developers → Webhooks
# URL: https://yourdomain.com/api/v1/payments/webhook

# 2. Signing secret'ı kontrol et
# .env'de STRIPE_WEBHOOK_SECRET var mı?

# 3. Firewall webhook'u bloke etmiyor mu kontrol et
curl -X POST https://yourdomain.com/api/v1/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"test"}'

# 4. Logs'u kontrol et
tail -f logs/combined.log | grep webhook
```

---

### 5. Email Gönderimi Başarısız

**Hata Mesajı:**
```
Error: Invalid credentials
Error: EAUTH Authentication failed
```

**Çözüm:**

```bash
# 1. SendGrid API key'i kontrol et
echo $SENDGRID_API_KEY

# 2. Sender email doğrulanmış mı kontrol et
# SendGrid Dashboard → Settings → Sender Authentication

# 3. Rate limit aşıldı mı kontrol et
# SendGrid Dashboard → Mail Send → Logs

# 4. Test email gönder
curl -X POST "https://api.sendgrid.com/v3/mail/send" \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{"to": [{"email": "test@example.com"}]}],
    "from": {"email": "noreply@cardakpaketleme.com"},
    "subject": "Test",
    "content": [{"type": "text/plain", "value": "Test"}]
  }'
```

---

### 6. SMS Gönderimi Başarısız

**Hata Mesajı:**
```
Error: Invalid phone number
Error: Authentication failed
```

**Çözüm:**

```bash
# 1. Twilio credentials'ı kontrol et
echo $TWILIO_ACCOUNT_SID
echo $TWILIO_AUTH_TOKEN
echo $TWILIO_PHONE_NUMBER

# 2. Phone number format'ı kontrol et
# Format: +1234567890 (+ ile başlamalı)

# 3. Twilio account'ın trial modu mu kontrol et
# Trial modunda sadece verified numbers'a SMS gönderilebilir

# 4. Test SMS gönder
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -d "From=$TWILIO_PHONE_NUMBER" \
  -d "To=+1234567890" \
  -d "Body=Test"
```

---

### 7. S3 Upload Başarısız

**Hata Mesajı:**
```
Error: Access Denied
Error: NoSuchBucket
```

**Çözüm:**

```bash
# 1. AWS credentials'ı kontrol et
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY

# 2. S3 bucket'ı kontrol et
aws s3 ls s3://cardak-production-files/

# 3. IAM permissions'ı kontrol et
# AWS Console → IAM → Users → cardak_user
# S3 full access policy var mı?

# 4. Bucket policies'i kontrol et
aws s3api get-bucket-policy --bucket cardak-production-files

# 5. Test upload yap
echo "test" > test.txt
aws s3 cp test.txt s3://cardak-production-files/
```

---

## 🟡 PERFORMANCE SORUNLARI

### 8. Yüksek Memory Kullanımı

**Belirtiler:**
```
JavaScript heap out of memory
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
```

**Çözüm:**

```bash
# 1. Node.js memory limit'i artır
NODE_OPTIONS=--max-old-space-size=2048 npm start

# 2. Memory leak'i bul
node --inspect dist/server.js
# Chrome DevTools'da chrome://inspect açıp debug et

# 3. Database query'leri optimize et
# Prisma logs'u enable et
DATABASE_DEBUG=* npm start

# 4. Caching ekle (Redis)
npm install redis
# Redis configuration'ı ekle
```

---

### 9. Yavaş API Response

**Belirtiler:**
```
Response time > 1000ms
Timeout errors
```

**Çözüm:**

```bash
# 1. Database query'lerini optimize et
# Prisma Studio'da query'leri analiz et
npm run prisma:studio

# 2. Indexes ekle
# prisma/schema.prisma'da @@index ekle
# Migration'ı çalıştır
npm run prisma:migrate

# 3. N+1 query problem'ini kontrol et
# Prisma include/select kullan

# 4. Caching ekle
# Redis veya in-memory cache

# 5. Load testing yap
npm install -g artillery
artillery quick --count 100 --num 1000 https://yourdomain.com/api/v1/health
```

---

## 🟢 DEPLOYMENT SONRASI KONTROLLER

### 10. Health Check Başarısız

```bash
# 1. Health endpoint'i test et
curl https://yourdomain.com/health

# 2. API health endpoint'i test et
curl https://yourdomain.com/api/v1/health

# 3. Server logs'u kontrol et
# Platform provider'ın logs section'ında kontrol et

# 4. Database bağlantısını kontrol et
# Logs'ta "Database connected" mesajı var mı?

# 5. Server'ı restart et
# Platform provider'ın dashboard'unda restart et
```

---

### 11. CORS Hatası

**Hata Mesajı:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Çözüm:**

```bash
# 1. CORS_ORIGIN'i kontrol et
echo $CORS_ORIGIN

# 2. Frontend URL'si doğru mu kontrol et
# .env'de CORS_ORIGIN=https://yourdomain.com

# 3. Wildcard kullanma (production'da güvenli değil)
# Geliştirme için: CORS_ORIGIN=*
# Production için: CORS_ORIGIN=https://yourdomain.com

# 4. Preflight request'i kontrol et
curl -X OPTIONS https://yourdomain.com/api/v1/quotes \
  -H "Origin: https://yourdomain.com" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

---

## 📞 DESTEK KAYNAKLARI

- **Express.js Docs:** https://expressjs.com/
- **Prisma Docs:** https://www.prisma.io/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Stripe Support:** https://support.stripe.com/
- **Twilio Support:** https://www.twilio.com/help
- **SendGrid Support:** https://support.sendgrid.com/

---

## 🆘 ACIL DURUM PROSEDÜRÜ

**Eğer production down ise:**

1. **Hemen Kontrol Et:**
   - Server çalışıyor mu? (ping, health check)
   - Database bağlı mı? (psql test)
   - Logs'ta error var mı?

2. **Hızlı Çözümler:**
   - Server'ı restart et
   - Database connection'ı reset et
   - Environment variables'ı kontrol et

3. **Eğer hala çalışmazsa:**
   - Rollback'e git (önceki version'a dön)
   - Team'i bilgilendir
   - Post-mortem yapılacak

4. **Rollback Komutu:**
   ```bash
   # Platform provider'ın dashboard'unda
   # Previous deployment'ı seç ve "Redeploy" tıkla
   ```

---

**Son Güncelleme:** 2025-11-03


