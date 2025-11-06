# 🧪 API Test Examples - Çardak Paketleme Backend

Bu dosya, deployment sonrası API endpoints'lerini test etmek için örnek curl komutları içerir.

**Not**: `YOUR_RAILWAY_URL` yerine gerçek Railway deployment URL'inizi yazın.

---

## 🏥 Health Check Endpoints

### Basic Health Check
```bash
curl -X GET https://YOUR_RAILWAY_URL/health
```

**Beklenen Yanıt:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

### API Health Check
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/health
```

**Beklenen Yanıt:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

---

## 🔐 Authentication Endpoints

### Login
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cardak.com",
    "password": "SecurePassword123!"
  }'
```

**Beklenen Yanıt:**
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

### Refresh Token
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Logout
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📋 Quote Endpoints

### List All Quotes
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Quote
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "companyName": "Acme Corporation",
    "contactName": "John Doe",
    "email": "john@acme.com",
    "phone": "+90 555 123 4567",
    "monthlyOrderCount": 100,
    "productTypes": "[\"boxes\", \"packaging\"]",
    "specialRequirements": "Custom branding",
    "hasFragileItems": true,
    "needsCustomPackaging": true,
    "preferredStartDate": "2025-12-01"
  }'
```

### Get Quote by ID
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/quotes/QUOTE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Quote
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/quotes/QUOTE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "APPROVED",
    "calculatedPrice": 5000
  }'
```

### Delete Quote
```bash
curl -X DELETE https://YOUR_RAILWAY_URL/api/v1/quotes/QUOTE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🚀 Onboarding Endpoints

### List All Onboarding
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/onboarding \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Onboarding
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "companyName": "Acme Corporation",
    "contactName": "John Doe",
    "email": "john@acme.com",
    "phone": "+90 555 123 4567",
    "currentStatus": "PLANNING"
  }'
```

### Get Onboarding by ID
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/onboarding/ONBOARDING_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Onboarding
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/onboarding/ONBOARDING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "currentStatus": "IN_PROGRESS"
  }'
```

---

## 📊 Analytics Endpoints

### Dashboard Analytics
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/analytics/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Beklenen Yanıt:**
```json
{
  "success": true,
  "data": {
    "totalQuotes": 42,
    "totalOnboarding": 15,
    "totalRevenue": 125000,
    "activeUsers": 8,
    "conversionRate": 35.7
  }
}
```

### Quote Analytics
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/analytics/quotes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Onboarding Analytics
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/analytics/onboarding \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## ⚙️ Settings Endpoints

### Get Settings
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/settings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Settings
```bash
curl -X PUT https://YOUR_RAILWAY_URL/api/v1/settings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "companyName": "Çardak Paketleme",
    "supportEmail": "support@cardak.com",
    "maintenanceMode": false
  }'
```

---

## 📝 Audit Logs Endpoints

### List Audit Logs
```bash
curl -X GET https://YOUR_RAILWAY_URL/api/v1/audit-logs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### List Audit Logs with Filters
```bash
curl -X GET "https://YOUR_RAILWAY_URL/api/v1/audit-logs?action=CREATE&limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🧪 Test Senaryoları

### Senaryo 1: Tam Akış Testi

```bash
# 1. Health check
curl -X GET https://YOUR_RAILWAY_URL/health

# 2. Login
TOKEN=$(curl -s -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}' \
  | jq -r '.data.token')

# 3. Create quote
curl -X POST https://YOUR_RAILWAY_URL/api/v1/quotes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"companyName":"Test Company","contactName":"Test User","email":"test@example.com","phone":"+90 555 123 4567","monthlyOrderCount":50,"productTypes":"[\"boxes\"]"}'

# 4. Get analytics
curl -X GET https://YOUR_RAILWAY_URL/api/v1/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN"

# 5. Logout
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

### Senaryo 2: Rate Limiting Testi

```bash
# Hızlı ardışık istekler gönder (rate limiting test)
for i in {1..20}; do
  curl -X GET https://YOUR_RAILWAY_URL/api/v1/health
  echo "Request $i"
done

# 15. request'ten sonra 429 (Too Many Requests) hatası almalısın
```

### Senaryo 3: CORS Testi

```bash
# Frontend'den gelen istek simüle et
curl -X GET https://YOUR_RAILWAY_URL/api/v1/health \
  -H "Origin: https://cardakpaketleme.com" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Beklenen headers:
# Access-Control-Allow-Origin: https://cardakpaketleme.com
# Access-Control-Allow-Credentials: true
```

---

## 🔍 Debugging Komutları

### Verbose Output ile Test
```bash
curl -v -X GET https://YOUR_RAILWAY_URL/api/v1/health
```

### Response Headers'ı Göster
```bash
curl -i -X GET https://YOUR_RAILWAY_URL/api/v1/health
```

### JSON Formatında Güzel Çıktı (jq gerekli)
```bash
curl -s -X GET https://YOUR_RAILWAY_URL/api/v1/health | jq .
```

### Timing Bilgisi
```bash
curl -w "\nTime: %{time_total}s\n" -X GET https://YOUR_RAILWAY_URL/api/v1/health
```

---

## 📊 Postman Collection

Postman'da kullanmak için:

1. Postman'ı aç
2. "Import" butonuna tıkla
3. "Raw text" seçeneğini seç
4. Aşağıdaki JSON'ı yapıştır:

```json
{
  "info": {
    "name": "Cardak Paketleme API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/v1/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"admin@cardak.com\",\"password\":\"SecurePassword123!\"}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "https://YOUR_RAILWAY_URL"
    }
  ]
}
```

---

## ✅ Başarılı Test Göstergeleri

- ✅ Health endpoints 200 OK döndürüyor
- ✅ Login başarılı, JWT token alınıyor
- ✅ Authenticated endpoints 200 OK döndürüyor
- ✅ Rate limiting 429 döndürüyor (15+ requests)
- ✅ CORS headers doğru ayarlanmış
- ✅ Database queries çalışıyor
- ✅ Sentry errors capture ediyor

---

**Son Güncelleme**: 2025-11-06

