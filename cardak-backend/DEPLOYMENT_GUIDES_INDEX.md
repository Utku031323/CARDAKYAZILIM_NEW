# 📚 DEPLOYMENT REHBERLERI İNDEKSİ

**Tarih**: 2025-11-06  
**Proje**: Çardak Paketleme Backend API  
**Amaç**: Production deployment rehberleri

---

## 🎯 REHBER SEÇİMİ

Hangi rehberi kullanacağını seç:

### 1️⃣ **HIZLI BAŞLAMAK İSTİYORSAN**
👉 **QUICK_DEPLOYMENT_CHECKLIST.md**
- ⏱️ Tahmini Süre: 5 dakika okuma
- 📋 Format: Kontrol listesi
- 🎯 İçerik: Yapılacaklar listesi ve komutlar
- 👥 Uygun: Tecrübeli geliştiriciler

---

### 2️⃣ **ADIM ADIM DETAYLI REHBER İSTİYORSAN**
👉 **DEPLOYMENT_STEP_BY_STEP.md**
- ⏱️ Tahmini Süre: 30 dakika okuma
- 📖 Format: Detaylı adım adım talimatlar
- 🎯 İçerik: Her adımın açıklaması, beklenen sonuçlar, hata çözümü
- 👥 Uygun: Yeni başlayanlar

---

### 3️⃣ **GÖRSEL REHBER İSTİYORSAN**
👉 **VISUAL_DEPLOYMENT_GUIDE.md**
- ⏱️ Tahmini Süre: 20 dakika okuma
- 🎬 Format: Ekran görüntüsü tarifi
- 🎯 İçerik: Her ekranın nasıl görüneceği, nereye tıklayacağın
- 👥 Uygun: Çok yeni başlayanlar

---

### 4️⃣ **RAILWAY SPESIFIK REHBER İSTİYORSAN**
👉 **RAILWAY_DEPLOYMENT_GUIDE.md**
- ⏱️ Tahmini Süre: 25 dakika okuma
- 🚀 Format: Railway platformu spesifik
- 🎯 İçerik: Railway dashboard, konfigürasyon, troubleshooting
- 👥 Uygun: Railway'i ilk kez kullananlar

---

### 5️⃣ **API TEST ÖRNEKLERI İSTİYORSAN**
👉 **API_TEST_EXAMPLES.md**
- ⏱️ Tahmini Süre: 15 dakika okuma
- 🧪 Format: curl komutları ve örnekler
- 🎯 İçelik: Tüm API endpoints'leri test etme
- 👥 Uygun: Deployment sonrası doğrulama

---

## 📊 REHBER KARŞILAŞTIRMASI

| Rehber | Süre | Format | Seviye | Kullanım |
|--------|------|--------|--------|----------|
| **QUICK_DEPLOYMENT_CHECKLIST** | 5 min | Kontrol Listesi | ⭐⭐⭐ | Hızlı başlama |
| **DEPLOYMENT_STEP_BY_STEP** | 30 min | Detaylı Talimatlar | ⭐⭐ | Yeni başlayanlar |
| **VISUAL_DEPLOYMENT_GUIDE** | 20 min | Ekran Görüntüsü | ⭐ | Çok yeni başlayanlar |
| **RAILWAY_DEPLOYMENT_GUIDE** | 25 min | Platform Spesifik | ⭐⭐ | Railway kullanıcıları |
| **API_TEST_EXAMPLES** | 15 min | Test Komutları | ⭐⭐⭐ | Post-deployment |

---

## 🚀 DEPLOYMENT SÜRECI ÖZETI

### Adım 1: GitHub Repository (5-10 dakika)
```bash
cd c:\CardakYazılım\cardak-backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cardak-backend.git
git push -u origin main
```

### Adım 2: Railway Hesabı (5 dakika)
- https://railway.app adresine git
- GitHub hesabınla authorize et

### Adım 3: Railway Projesi (10-15 dakika)
- "New Project" → "Deploy from GitHub repo"
- `cardak-backend` repository'sini seç
- Build logs'unu izle

### Adım 4: Environment Variables (10 dakika)
- JWT_SECRET ekle
- SENTRY_DSN ekle
- Diğer variables'ları ekle

### Adım 5: Persistent Storage (5 dakika)
- Mount Path: `/app/prisma`
- Size: `1 GB`

### Adım 6: Post-Deployment Test (5 dakika)
```bash
curl https://YOUR_RAILWAY_URL/health
curl https://YOUR_RAILWAY_URL/api/v1/health
```

---

## 📋 KONTROL LİSTESİ

### Deployment Öncesi
- [ ] GitHub repository oluşturuldu
- [ ] Tüm dosyalar GitHub'a push edildi
- [ ] `.env.production` dosyası `.gitignore`'da
- [ ] Railway hesabı oluşturuldu
- [ ] Sentry hesabı oluşturuldu

### Deployment Sırasında
- [ ] Railway projesi oluşturuldu
- [ ] GitHub repository bağlandı
- [ ] Build başarılı oldu
- [ ] Environment variables ayarlandı
- [ ] Persistent storage ayarlandı

### Deployment Sonrası
- [ ] Health endpoint test edildi
- [ ] API health endpoint test edildi
- [ ] Login endpoint test edildi
- [ ] Sentry error tracking çalışıyor
- [ ] Logs'ta hata mesajı yok

---

## 🎯 HIZLI REFERANS

### Önemli URL'ler
- **GitHub**: https://github.com
- **Railway**: https://railway.app
- **Sentry**: https://sentry.io
- **Deployment URL**: https://YOUR_RAILWAY_URL

### Önemli Komutlar
```bash
# JWT_SECRET Oluştur
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Health Check
curl https://YOUR_RAILWAY_URL/health

# API Health Check
curl https://YOUR_RAILWAY_URL/api/v1/health

# Login Test
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}'
```

### Önemli Environment Variables
```bash
JWT_SECRET=<GENERATE_STRONG_KEY>
SENTRY_DSN=<YOUR_SENTRY_DSN>
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./production.db
```

---

## 🆘 HATA ÇÖZÜMÜ

### Build Failed
- Railway logs'unda hata mesajını oku
- `npm install --legacy-peer-deps` dene

### Connection Refused
- Deployment'ın "Success" durumunda olduğundan emin ol
- 2-3 dakika bekle

### 500 Internal Server Error
- Railway logs'unda hata mesajını oku
- Sentry dashboard'da error'u kontrol et

### 401 Unauthorized
- Email ve şifrenin doğru olduğundan emin ol
- JWT_SECRET'in doğru ayarlandığından emin ol

---

## 📞 KAYNAKLAR

- **Railway Docs**: https://docs.railway.app/
- **Sentry Docs**: https://docs.sentry.io/
- **GitHub Docs**: https://docs.github.com/
- **Express Docs**: https://expressjs.com/
- **Node.js Docs**: https://nodejs.org/docs/

---

## 🎓 ÖĞRENME YOLU

### Başlangıç Seviyesi
1. QUICK_DEPLOYMENT_CHECKLIST.md - Genel bakış
2. VISUAL_DEPLOYMENT_GUIDE.md - Ekran görüntüleri
3. DEPLOYMENT_STEP_BY_STEP.md - Detaylı talimatlar

### Orta Seviye
1. RAILWAY_DEPLOYMENT_GUIDE.md - Platform spesifik
2. API_TEST_EXAMPLES.md - Test komutları
3. DEPLOYMENT_CHECKLIST.md - Kontrol listesi

### İleri Seviye
1. Railway CLI kullanımı
2. Automated deployments
3. CI/CD pipeline kurulumu

---

## ✅ BAŞARILI DEPLOYMENT GÖSTERGELERI

- ✅ Railway dashboard'da "Success" durumu
- ✅ Health endpoint 200 OK döndürüyor
- ✅ API health endpoint database bağlantısını gösteriyor
- ✅ Login endpoint JWT token döndürüyor
- ✅ Sentry dashboard'da error tracking çalışıyor
- ✅ Logs'ta hata mesajı yok

---

## 🎉 TEBRIKLER!

Deployment rehberleri hazır! Şimdi:

1. **Uygun rehberi seç** (yukarıdaki seçeneklerden)
2. **Adım adım takip et**
3. **Sorularınız varsa, rehberlerdeki kaynakları kontrol edin**
4. **Deployment tamamlandıktan sonra API'yi test edin**

---

## 📝 NOTLAR

- Tüm rehberler Türkçe yazılmıştır
- Komutlar Windows PowerShell için optimize edilmiştir
- Tahmini süreler yaklaşık değerlerdir
- Hızınıza göre değişebilir

---

**Son Güncelleme**: 2025-11-06  
**Durum**: ✅ Production'a Hazır

Deployment'a başlamak için uygun rehberi seç ve başla! 🚀

