# ⚡ HIZLI DEPLOYMENT KONTROL LİSTESİ

**Tarih**: 2025-11-06  
**Proje**: Çardak Paketleme Backend API  
**Format**: Hızlı referans kontrol listesi

---

## 📋 KONTROL LİSTESİ

### ✅ ADIM 1: GITHUB REPOSITORY (5-10 dakika)

- [ ] GitHub hesabı oluştur: https://github.com/signup
- [ ] Yeni repository oluştur: https://github.com/new
  - [ ] Repository name: `cardak-backend`
  - [ ] Description: `Çardak Paketleme Backend API - Simplified Version`
  - [ ] Public seçeneğini seç
  - [ ] Checkbox'ları boş bırak
  - [ ] "Create repository" butonuna tıkla

**Terminal Komutları:**
```bash
cd c:\CardakYazılım\cardak-backend
git init
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
echo ".env.production" >> .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
git add .
git commit -m "Initial commit: Simplified Cardak Paketleme Backend"
git remote add origin https://github.com/YOUR_USERNAME/cardak-backend.git
git branch -M main
git push -u origin main
```

- [ ] GitHub'da repository'yi kontrol et
- [ ] `.env.production` dosyasının GÖRÜLMEMESI gerekir

---

### ✅ ADIM 2: RAILWAY HESABI (5 dakika)

- [ ] Railway hesabı oluştur: https://railway.app
- [ ] GitHub hesabınla authorize et
- [ ] Railway dashboard'a giriş yap

---

### ✅ ADIM 3: RAILWAY PROJESI (10-15 dakika)

- [ ] "New Project" butonuna tıkla
- [ ] "Deploy from GitHub repo" seçeneğini seç
- [ ] GitHub'ı authorize et
- [ ] `cardak-backend` repository'sini seç
- [ ] "Deploy" butonuna tıkla
- [ ] Build logs'unu izle (2-5 dakika)
- [ ] "✓ Build successful" mesajını bekle

---

### ✅ ADIM 4: ENVIRONMENT VARIABLES (10 dakika)

**JWT_SECRET Oluştur:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Railway Dashboard'da "Variables" sekmesine git:**

| Name | Value |
|------|-------|
| `JWT_SECRET` | [Yukarıda oluşturduğun değer] |
| `SENTRY_DSN` | [Sentry'den alacağın DSN] |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `DATABASE_URL` | `file:./production.db` |
| `JWT_EXPIRY` | `15m` |
| `REFRESH_TOKEN_EXPIRY` | `7d` |
| `SENTRY_ENVIRONMENT` | `production` |
| `SENTRY_RELEASE` | `1.0.0` |
| `FRONTEND_URL` | `https://cardakpaketleme.com` |
| `CORS_ORIGIN` | `https://cardakpaketleme.com` |
| `LOG_LEVEL` | `info` |

**Sentry DSN Almak İçin:**
1. https://sentry.io adresine git
2. "Sign Up" butonuna tıkla
3. Email ve şifre ile kayıt ol
4. "Create Project" butonuna tıkla
5. "Node.js" seçeneğini seç
6. "Create Project" butonuna tıkla
7. "Settings" → "Client Keys (DSN)" sekmesine git
8. DSN'i kopyala

- [ ] JWT_SECRET ekle
- [ ] SENTRY_DSN ekle
- [ ] Diğer variables'ları ekle

---

### ✅ ADIM 5: PERSISTENT STORAGE (5 dakika)

**Railway Dashboard'da "Storage" sekmesine git:**

- [ ] "Add Storage" butonuna tıkla
- [ ] Mount Path: `/app/prisma`
- [ ] Size: `1 GB`
- [ ] "Create" butonuna tıkla

---

### ✅ ADIM 6: DEPLOYMENT KONTROL (5 dakika)

**Railway Dashboard'da "Deployments" sekmesine git:**

- [ ] Deployment durumu: "Success" (yeşil)
- [ ] Logs'ta hata mesajı yok
- [ ] Deployment URL'ini kopyala

---

### ✅ ADIM 7: POST-DEPLOYMENT TEST (5 dakika)

**Terminal'de çalıştır:**

```bash
# Health Check
curl https://YOUR_RAILWAY_URL/health

# API Health Check
curl https://YOUR_RAILWAY_URL/api/v1/health

# Login Test
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}'
```

- [ ] Health endpoint 200 OK döndürüyor
- [ ] API health endpoint database bağlantısını gösteriyor
- [ ] Login endpoint JWT token döndürüyor

---

## 🎯 HATA ÇÖZÜMÜ

### Hata: Build Failed

**Çözüm:**
1. Railway logs'unda hata mesajını oku
2. Genellikle npm paket kurulumu hatası
3. Çözüm: `npm install --legacy-peer-deps` dene

---

### Hata: Connection Refused

**Çözüm:**
1. Railway dashboard'da deployment durumunu kontrol et
2. Deployment'ın "Success" durumunda olduğundan emin ol
3. 2-3 dakika bekle ve tekrar dene

---

### Hata: 500 Internal Server Error

**Çözüm:**
1. Railway dashboard'da "Logs" sekmesine tıkla
2. Hata mesajını oku
3. Sentry dashboard'da (https://sentry.io) error'u kontrol et

---

### Hata: 401 Unauthorized

**Çözüm:**
1. Email ve şifrenin doğru olduğundan emin ol
2. JWT_SECRET'in Railway'de doğru ayarlandığından emin ol

---

## 📞 KAYNAKLAR

- **Railway Docs**: https://docs.railway.app/
- **Sentry Docs**: https://docs.sentry.io/
- **GitHub Docs**: https://docs.github.com/
- **Express Docs**: https://expressjs.com/

---

## 🎉 BAŞARILI DEPLOYMENT GÖSTERGELERI

- ✅ Railway dashboard'da "Success" durumu
- ✅ Health endpoint 200 OK döndürüyor
- ✅ API health endpoint database bağlantısını gösteriyor
- ✅ Login endpoint JWT token döndürüyor
- ✅ Sentry dashboard'da error tracking çalışıyor
- ✅ Logs'ta hata mesajı yok

---

## ⏱️ TAHMINI TOPLAM SÜRE

| Adım | Süre |
|------|------|
| GitHub Repository | 5-10 dakika |
| Railway Hesabı | 5 dakika |
| Railway Projesi | 10-15 dakika |
| Environment Variables | 10 dakika |
| Persistent Storage | 5 dakika |
| Deployment Kontrol | 5 dakika |
| Post-Deployment Test | 5 dakika |
| **TOPLAM** | **45-55 dakika** |

---

## 📚 DETAYLI REHBERLER

- **DEPLOYMENT_STEP_BY_STEP.md** - Adım adım detaylı rehber
- **VISUAL_DEPLOYMENT_GUIDE.md** - Ekran görüntüsü tarifi
- **RAILWAY_DEPLOYMENT_GUIDE.md** - Railway spesifik rehber
- **API_TEST_EXAMPLES.md** - API test örnekleri

---

**Son Güncelleme**: 2025-11-06

