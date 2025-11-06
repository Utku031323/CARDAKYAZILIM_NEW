# 📖 DEPLOYMENT ADIM ADIM REHBERI - Yeni Başlayanlar İçin

**Tarih**: 2025-11-06  
**Proje**: Çardak Paketleme Backend API  
**Hedef**: Production'a deploy etmek

---

## 🎯 GENEL BAKIŞ

Bu rehber 6 ana adımdan oluşur:

1. ✅ GitHub Repository Hazırlığı
2. ✅ Railway Hesabı ve Proje Kurulumu
3. ✅ Environment Variables Ayarlama
4. ✅ Persistent Storage Konfigürasyonu
5. ✅ Deployment Başlatma
6. ✅ Post-Deployment Test

**Tahmini Süre**: 30-45 dakika

---

## 📋 ADIM 1: GITHUB REPOSITORY HAZIRLIĞI

### 1.1 GitHub Hesabı Oluştur (Eğer yoksa)

**Nereye gideceğim?**
- Web tarayıcında: https://github.com adresine git

**Ne yapacağım?**
1. Sayfanın sağ üst köşesinde "Sign up" butonunu gör
2. "Sign up" butonuna tıkla
3. Email adresini gir
4. Güçlü bir şifre oluştur
5. Kullanıcı adı seç (örn: `cardak-paketleme`)
6. Tüm adımları tamamla

**Beklenen Sonuç**: GitHub hesabın oluşturuldu ve giriş yaptın

---

### 1.2 Yeni Repository Oluştur

**Nereye gideceğim?**
- GitHub'da giriş yaptıktan sonra, sayfanın sol üst köşesinde "+" simgesini gör
- "+" simgesine tıkla → "New repository" seçeneğini seç

**Ne yapacağım?**

**Adım 1: Repository Adı**
- "Repository name" alanına: `cardak-backend` yaz

**Adım 2: Açıklama**
- "Description" alanına: `Çardak Paketleme Backend API - Simplified Version` yaz

**Adım 3: Gizlilik Ayarı**
- "Public" seçeneğini seç (herkes görebilir)
- VEYA "Private" seçeneğini seç (sadece sen görebilirsin)

**Adım 4: Initialize Repository**
- "Add a README file" kutusunu işaretleme (boş bırak)
- "Add .gitignore" kutusunu işaretleme (boş bırak)
- "Choose a license" kutusunu işaretleme (boş bırak)

**Adım 5: Oluştur**
- "Create repository" butonuna tıkla

**Beklenen Sonuç**: 
- Yeni bir boş repository oluşturuldu
- URL şu şekilde: `https://github.com/YOUR_USERNAME/cardak-backend`

---

### 1.3 Yerel Bilgisayardan Repository'ye Push Et

**Nereye gideceğim?**
- Terminal/PowerShell'i aç
- Proje klasörüne git: `cd c:\CardakYazılım\cardak-backend`

**Ne yapacağım?**

**Adım 1: Git Konfigürasyonu (İlk kez yapıyorsan)**
```bash
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
```

**Adım 2: Repository'yi Initialize Et**
```bash
git init
```

**Beklenen Sonuç**: Terminal'de hiçbir hata mesajı görülmemeli

---

**Adım 3: .gitignore Dosyasını Oluştur**

Terminal'de şu komutu çalıştır:
```bash
echo ".env.production" >> .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

**Beklenen Sonuç**: `.gitignore` dosyası oluşturuldu

---

**Adım 4: Tüm Dosyaları Stage Et**
```bash
git add .
```

**Beklenen Sonuç**: Hiçbir hata mesajı görülmemeli

---

**Adım 5: İlk Commit'i Yap**
```bash
git commit -m "Initial commit: Simplified Cardak Paketleme Backend"
```

**Beklenen Sonuç**: 
```
[main (root-commit) abc1234] Initial commit: Simplified Cardak Paketleme Backend
 XX files changed, XXXX insertions(+)
```

---

**Adım 6: Remote Repository'yi Ekle**

GitHub sayfasında "Quick setup" bölümünde HTTPS URL'ini kopyala (şu şekilde görünür):
```
https://github.com/YOUR_USERNAME/cardak-backend.git
```

Terminal'de şu komutu çalıştır (URL'yi kopyaladığın URL ile değiştir):
```bash
git remote add origin https://github.com/YOUR_USERNAME/cardak-backend.git
```

**Beklenen Sonuç**: Hiçbir hata mesajı görülmemeli

---

**Adım 7: Main Branch'e Yeniden Adlandır**
```bash
git branch -M main
```

**Beklenen Sonuç**: Hiçbir hata mesajı görülmemeli

---

**Adım 8: Push Et**
```bash
git push -u origin main
```

**Beklenen Sonuç**: 
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/YOUR_USERNAME/cardak-backend.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

---

**Adım 9: GitHub'da Kontrol Et**

1. Web tarayıcında GitHub sayfasını yenile (F5)
2. Tüm dosyaların GitHub'da göründüğünü kontrol et
3. `.env.production` dosyasının GÖRÜLMEMESI gerekir (güvenlik için)

**Beklenen Sonuç**: 
- Tüm dosyalar GitHub'da görünüyor
- `.env.production` dosyası görülmüyor

---

## 🚀 ADIM 2: RAILWAY HESABI VE PROJE KURULUMU

### 2.1 Railway Hesabı Oluştur

**Nereye gideceğim?**
- Web tarayıcında: https://railway.app adresine git

**Ne yapacağım?**

1. Sayfanın sağ üst köşesinde "Login" butonunu gör
2. "Login" butonuna tıkla
3. "Sign up" seçeneğini seç
4. "Continue with GitHub" butonuna tıkla
5. GitHub hesabınla authorize et
6. Tüm adımları tamamla

**Beklenen Sonuç**: Railway hesabın oluşturuldu ve dashboard'a giriş yaptın

---

### 2.2 Yeni Railway Projesi Oluştur

**Nereye gideceğim?**
- Railway dashboard'da (https://railway.app/dashboard)

**Ne yapacağım?**

**Adım 1: Yeni Proje Oluştur**
1. Dashboard'da "New Project" butonunu gör
2. "New Project" butonuna tıkla

**Adım 2: Deployment Yöntemi Seç**
1. Açılan menüde "Deploy from GitHub repo" seçeneğini gör
2. "Deploy from GitHub repo" seçeneğine tıkla

**Beklenen Sonuç**: GitHub authorization sayfasına yönlendirildin

---

**Adım 3: GitHub'ı Authorize Et**

1. "Authorize Railway" butonuna tıkla
2. GitHub hesabınla giriş yap (eğer giriş yapmadıysan)
3. Railway'e izin ver

**Beklenen Sonuç**: Railway, GitHub repository'lerine erişim izni aldı

---

**Adım 4: Repository'yi Seç**

1. "Select a repository" açılır menüsüne tıkla
2. `cardak-backend` repository'sini ara ve seç
3. "Deploy" butonuna tıkla

**Beklenen Sonuç**: 
- Railway, repository'yi klonlamaya başladı
- Deployment logs'u görünmeye başladı
- Sayfada "Building..." yazısı görülüyor

---

**Adım 5: Build Tamamlanmasını Bekle**

1. Logs'u izle (sayfada gerçek zamanlı olarak görünüyor)
2. Build tamamlanana kadar bekle (2-5 dakika)

**Beklenen Sonuç**: 
```
✓ Build successful
✓ Deployment successful
```

---

## ⚙️ ADIM 3: ENVIRONMENT VARIABLES AYARLAMA

### 3.1 Environment Variables Sayfasına Git

**Nereye gideceğim?**
- Railway dashboard'da proje sayfasında
- Sayfanın üst kısmında "Variables" sekmesini gör
- "Variables" sekmesine tıkla

**Ne yapacağım?**

Açılan sayfada "Add Variable" butonunu gör

---

### 3.2 JWT_SECRET Oluştur

**Adım 1: JWT_SECRET Değerini Oluştur**

Terminal'de şu komutu çalıştır:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Beklenen Sonuç**: 
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

Bu uzun karakter dizisini kopyala (her seferinde farklı olacak)

---

**Adım 2: Railway'de JWT_SECRET Ekle**

1. Railway dashboard'da "Variables" sekmesinde "Add Variable" butonuna tıkla
2. "Name" alanına: `JWT_SECRET` yaz
3. "Value" alanına: Yukarıda oluşturduğun uzun karakter dizisini yapıştır
4. "Add" butonuna tıkla

**Beklenen Sonuç**: 
- JWT_SECRET değişkeni listeye eklendi
- Değer gizli olarak gösterildi (noktalar ile)

---

### 3.3 Sentry DSN Ekle

**Adım 1: Sentry Hesabı Oluştur**

1. Web tarayıcında: https://sentry.io adresine git
2. "Sign Up" butonuna tıkla
3. Email ve şifre ile kayıt ol
4. Email'i doğrula

**Beklenen Sonuç**: Sentry dashboard'a giriş yaptın

---

**Adım 2: Yeni Sentry Projesi Oluştur**

1. Sentry dashboard'da "Create Project" butonuna tıkla
2. "Node.js" seçeneğini seç
3. "Create Project" butonuna tıkla

**Beklenen Sonuç**: Yeni Sentry projesi oluşturuldu

---

**Adım 3: Sentry DSN'i Kopyala**

1. Sentry proje sayfasında "Settings" sekmesine tıkla
2. Sol menüde "Client Keys (DSN)" seçeneğini seç
3. DSN değerini kopyala (şu şekilde görünür):
```
https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Beklenen Sonuç**: DSN değerini kopyaladın

---

**Adım 4: Railway'de SENTRY_DSN Ekle**

1. Railway dashboard'a geri dön
2. "Variables" sekmesinde "Add Variable" butonuna tıkla
3. "Name" alanına: `SENTRY_DSN` yaz
4. "Value" alanına: Kopyaladığın DSN değerini yapıştır
5. "Add" butonuna tıkla

**Beklenen Sonuç**: SENTRY_DSN değişkeni listeye eklendi

---

### 3.4 Diğer Environment Variables'ları Ekle

Aşağıdaki variables'ları aynı şekilde ekle:

| Name | Value |
|------|-------|
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

**Beklenen Sonuç**: Tüm variables Railway dashboard'da görünüyor

---

## 💾 ADIM 4: PERSISTENT STORAGE KONFIGÜRASYONU

### 4.1 Storage Sayfasına Git

**Nereye gideceğim?**
- Railway dashboard'da proje sayfasında
- Sayfanın üst kısmında "Storage" sekmesini gör
- "Storage" sekmesine tıkla

**Ne yapacağım?**

Açılan sayfada "Add Storage" butonunu gör

---

### 4.2 Storage Ekle

**Adım 1: Storage Oluştur**

1. "Add Storage" butonuna tıkla
2. Açılan formda:
   - **Mount Path**: `/app/prisma` yaz
   - **Size**: `1 GB` seç (veya ihtiyacına göre)
3. "Create" butonuna tıkla

**Beklenen Sonuç**: 
- Storage oluşturuldu
- Sayfada storage bilgileri görünüyor
- Mount path: `/app/prisma`
- Size: 1 GB

---

## 🚀 ADIM 5: DEPLOYMENT BAŞLATMA

### 5.1 Deployment Kontrol Et

**Nereye gideceğim?**
- Railway dashboard'da proje sayfasında
- Sayfanın üst kısmında "Deployments" sekmesini gör
- "Deployments" sekmesine tıkla

**Ne yapacağım?**

1. En son deployment'ı gör
2. Deployment durumunu kontrol et

**Beklenen Sonuç**: 
- Deployment durumu: "Success" (yeşil)
- VEYA "Building" (sarı) - hala build ediliyor
- VEYA "Failed" (kırmızı) - hata var

---

### 5.2 Logs'u İzle

**Adım 1: Logs Sayfasına Git**

1. Railway dashboard'da "Logs" sekmesine tıkla

**Adım 2: Logs'u Oku**

Logs'ta şu mesajları ara:

**Başarılı Deployment Göstergeleri:**
```
✓ Build successful
✓ Deployment successful
✓ Server running on port 3000
✓ Sentry initialized
```

**Hata Göstergeleri:**
```
✗ Build failed
✗ Deployment failed
✗ Error: ...
```

---

### 5.3 Deployment URL'ini Bul

**Nereye gideceğim?**
- Railway dashboard'da proje sayfasında
- Sayfanın sağ üst köşesinde "View Logs" butonunun yanında URL'i gör

**Ne yapacağım?**

1. URL'i kopyala (şu şekilde görünür):
```
https://cardak-backend-production-xxxx.railway.app
```

2. Bu URL'i not et (sonraki adımlarda kullanacaksın)

**Beklenen Sonuç**: Deployment URL'ini kopyaladın

---

## ✅ ADIM 6: POST-DEPLOYMENT TEST

### 6.1 Health Check Test

**Nereye gideceğim?**
- Terminal/PowerShell'i aç

**Ne yapacağım?**

**Adım 1: Basic Health Check**

Terminal'de şu komutu çalıştır (URL'yi kopyaladığın URL ile değiştir):
```bash
curl https://YOUR_RAILWAY_URL/health
```

**Beklenen Sonuç:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

---

**Adım 2: API Health Check**

Terminal'de şu komutu çalıştır:
```bash
curl https://YOUR_RAILWAY_URL/api/v1/health
```

**Beklenen Sonuç:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

---

### 6.2 Login Test

**Adım 1: Login Yap**

Terminal'de şu komutu çalıştır:
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}'
```

**Beklenen Sonuç:**
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

---

### 6.3 Hata Alırsan Ne Yapacaksın?

**Hata 1: Connection Refused**
```
curl: (7) Failed to connect to YOUR_RAILWAY_URL port 443
```

**Çözüm:**
1. Railway dashboard'da deployment durumunu kontrol et
2. Deployment'ın "Success" durumunda olduğundan emin ol
3. 2-3 dakika bekle ve tekrar dene

---

**Hata 2: 500 Internal Server Error**
```json
{
  "error": "Internal Server Error"
}
```

**Çözüm:**
1. Railway dashboard'da "Logs" sekmesine tıkla
2. Hata mesajını oku
3. Sentry dashboard'da (https://sentry.io) error'u kontrol et

---

**Hata 3: 401 Unauthorized**
```json
{
  "error": "Unauthorized"
}
```

**Çözüm:**
1. Email ve şifrenin doğru olduğundan emin ol
2. JWT_SECRET'in Railway'de doğru ayarlandığından emin ol

---

## 🎉 BAŞARILI DEPLOYMENT GÖSTERGELERI

Aşağıdaki tüm kontroller başarılı olursa, deployment tamamlanmıştır:

- ✅ Railway dashboard'da "Success" durumu
- ✅ Health endpoint 200 OK döndürüyor
- ✅ API health endpoint database bağlantısını gösteriyor
- ✅ Login endpoint JWT token döndürüyor
- ✅ Sentry dashboard'da error tracking çalışıyor
- ✅ Logs'ta hata mesajı yok

---

## 📞 SORUN GIDERME

### Sık Karşılaşılan Sorunlar

**Sorun 1: Build Failed**
- Çözüm: Railway logs'unda hata mesajını oku
- Genellikle: npm paket kurulumu hatası
- Çözüm: `npm install --legacy-peer-deps` dene

**Sorun 2: Database Connection Error**
- Çözüm: Persistent storage'ın ayarlandığından emin ol
- Mount path: `/app/prisma` olmalı

**Sorun 3: Sentry Not Working**
- Çözüm: SENTRY_DSN'in doğru olduğundan emin ol
- Sentry dashboard'da proje oluşturduğundan emin ol

---

## 📚 KAYNAKLAR

- **Railway Docs**: https://docs.railway.app/
- **Sentry Docs**: https://docs.sentry.io/
- **GitHub Docs**: https://docs.github.com/
- **Express Docs**: https://expressjs.com/

---

**Tebrikler! Deployment tamamlandı!** 🎊

Sorularınız varsa, Railway ve Sentry documentation'larına bakabilirsiniz.

---

**Son Güncelleme**: 2025-11-06

