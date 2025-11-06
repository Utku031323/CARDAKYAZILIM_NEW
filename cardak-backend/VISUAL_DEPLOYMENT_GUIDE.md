# 🎬 DEPLOYMENT GÖRSEL REHBERI - Ekran Görüntüsü Tarifi

**Tarih**: 2025-11-06  
**Proje**: Çardak Paketleme Backend API  
**Format**: Ekran görüntüsü tarifi ve adım adım talimatlar

---

## 📺 ADIM 1: GITHUB REPOSITORY OLUŞTURMA

### Ekran 1: GitHub Ana Sayfası

**Nereye gideceğim?**
- Tarayıcıda: https://github.com

**Ekran Tarifi:**
- Sayfanın sol üst köşesinde GitHub logosu
- Sayfanın sağ üst köşesinde "Sign in" ve "Sign up" butonları
- Eğer giriş yapmadıysan, "Sign up" butonuna tıkla

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ GitHub                                    Sign in Sign up│
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Where the world builds software                         │
│                                                           │
│  [Email address input field]                             │
│  [Sign up for GitHub button]                             │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 2: Giriş Yaptıktan Sonra Dashboard

**Nereye gideceğim?**
- GitHub'da giriş yaptıktan sonra

**Ekran Tarifi:**
- Sayfanın sol üst köşesinde GitHub logosu
- Sayfanın sağ üst köşesinde "+" simgesi (artı işareti)
- "+" simgesinin yanında profil resmin
- Sol tarafta "Repositories" bölümü

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ GitHub  [Search]  [+]  [Profile]                        │
├─────────────────────────────────────────────────────────┤
│ Left Sidebar:                                            │
│ ├─ Repositories                                          │
│ ├─ Starred                                               │
│ └─ Watching                                              │
│                                                           │
│ Main Area:                                               │
│ ├─ Recent repositories                                   │
│ └─ [Create new repository button]                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 3: Yeni Repository Oluşturma Formu

**Ne yapacağım?**
- "+" simgesine tıkla → "New repository" seç

**Ekran Tarifi:**
- Sayfanın başlığında "Create a new repository"
- Form alanları:
  - "Repository name" (boş input alanı)
  - "Description" (boş input alanı)
  - "Public" / "Private" seçenekleri
  - Checkbox'lar: "Add a README file", "Add .gitignore", "Choose a license"
  - "Create repository" yeşil butonu

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Create a new repository                                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Repository name *                                        │
│ [cardak-backend                                    ]     │
│                                                           │
│ Description (optional)                                   │
│ [Çardak Paketleme Backend API - Simplified Version ]    │
│                                                           │
│ ○ Public  ○ Private                                      │
│                                                           │
│ ☐ Add a README file                                      │
│ ☐ Add .gitignore                                         │
│ ☐ Choose a license                                       │
│                                                           │
│                          [Create repository]             │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Doldurulacak Alanlar:**
1. Repository name: `cardak-backend`
2. Description: `Çardak Paketleme Backend API - Simplified Version`
3. Public seçeneğini seç
4. Checkbox'ları boş bırak
5. "Create repository" butonuna tıkla

---

### Ekran 4: Yeni Repository Sayfası

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ YOUR_USERNAME / cardak-backend                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Quick setup — if you've done this kind of thing before  │
│                                                           │
│ [HTTPS] [SSH] [GitHub CLI]                              │
│                                                           │
│ https://github.com/YOUR_USERNAME/cardak-backend.git     │
│ [Copy button]                                            │
│                                                           │
│ ...or create a new repository on the command line       │
│ ...or push an existing repository from the command line │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Yapılacak İşlem:**
- HTTPS URL'ini kopyala (sonraki adımlarda kullanacaksın)

---

## 💻 ADIM 2: TERMINAL KOMUTLARI

### Terminal Ekranı 1: Repository Initialize

**Terminal'de çalıştırılacak Komutlar:**

```bash
cd c:\CardakYazılım\cardak-backend
```

**Beklenen Çıktı:**
```
C:\CardakYazılım\cardak-backend>
```

---

```bash
git init
```

**Beklenen Çıktı:**
```
Initialized empty Git repository in C:\CardakYazılım\cardak-backend\.git\
```

---

```bash
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
```

**Beklenen Çıktı:**
```
(Hiçbir çıktı yok - bu normal)
```

---

### Terminal Ekranı 2: .gitignore Oluşturma

```bash
echo ".env.production" >> .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
```

**Beklenen Çıktı:**
```
(Hiçbir çıktı yok - bu normal)
```

---

### Terminal Ekranı 3: Commit Yapma

```bash
git add .
```

**Beklenen Çıktı:**
```
(Hiçbir çıktı yok - bu normal)
```

---

```bash
git commit -m "Initial commit: Simplified Cardak Paketleme Backend"
```

**Beklenen Çıktı:**
```
[main (root-commit) abc1234] Initial commit: Simplified Cardak Paketleme Backend
 35 files changed, 2500 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 package.json
 ...
```

---

### Terminal Ekranı 4: Remote Repository Ekleme

```bash
git remote add origin https://github.com/YOUR_USERNAME/cardak-backend.git
```

**Beklenen Çıktı:**
```
(Hiçbir çıktı yok - bu normal)
```

---

```bash
git branch -M main
```

**Beklenen Çıktı:**
```
(Hiçbir çıktı yok - bu normal)
```

---

### Terminal Ekranı 5: Push Yapma

```bash
git push -u origin main
```

**Beklenen Çıktı:**
```
Enumerating objects: 35, done.
Counting objects: 100% (35/35), done.
Delta compression using up to 8 threads
Compressing objects: 100% (28/28), done.
Writing objects: 100% (35/35), 125.45 KiB | 500.00 KiB/s, done.
Total 35 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR_USERNAME/cardak-backend.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

---

## 🚀 ADIM 3: RAILWAY DASHBOARD

### Ekran 1: Railway Ana Sayfası

**Nereye gideceğim?**
- Tarayıcıda: https://railway.app

**Ekran Tarifi:**
- Sayfanın sağ üst köşesinde "Login" butonu
- Sayfanın ortasında "Deploy your app" başlığı
- Sayfanın altında "Get Started" butonu

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Railway                                      [Login]     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│              Deploy your app in seconds                  │
│                                                           │
│         [Get Started] [Documentation]                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 2: Railway Dashboard (Giriş Sonrası)

**Nereye gideceğim?**
- Railway'de giriş yaptıktan sonra

**Ekran Tarifi:**
- Sayfanın sol üst köşesinde Railway logosu
- Sayfanın sağ üst köşesinde profil resmi
- Sayfanın ortasında "New Project" butonu
- Sol tarafta "Projects" bölümü

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Railway                                    [Profile]     │
├─────────────────────────────────────────────────────────┤
│ Left Sidebar:                                            │
│ ├─ Projects                                              │
│ ├─ Deployments                                           │
│ └─ Settings                                              │
│                                                           │
│ Main Area:                                               │
│ ├─ Welcome to Railway                                    │
│ └─ [New Project button]                                  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 3: Yeni Proje Oluşturma

**Ne yapacağım?**
- "New Project" butonuna tıkla

**Ekran Tarifi:**
- Açılan menüde seçenekler:
  - "Deploy from GitHub repo"
  - "Deploy from Git URL"
  - "Create Empty Project"
  - "Create from Template"

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ New Project                                              │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ ├─ Deploy from GitHub repo                              │
│ ├─ Deploy from Git URL                                  │
│ ├─ Create Empty Project                                 │
│ └─ Create from Template                                 │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Yapılacak İşlem:**
- "Deploy from GitHub repo" seçeneğine tıkla

---

### Ekran 4: GitHub Authorization

**Ekran Tarifi:**
- GitHub authorization sayfası
- "Authorize Railway" butonu
- Railway'nin erişim istediği izinler listesi

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ GitHub                                                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Authorize Railway                                        │
│                                                           │
│ Railway by Railway is requesting access to your         │
│ GitHub account.                                          │
│                                                           │
│ [Authorize Railway]  [Cancel]                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Yapılacak İşlem:**
- "Authorize Railway" butonuna tıkla

---

### Ekran 5: Repository Seçimi

**Ekran Tarifi:**
- "Select a repository" açılır menüsü
- Repository listesi
- "cardak-backend" repository'si

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Select a repository                                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ [Select a repository ▼]                                 │
│                                                           │
│ Repositories:                                            │
│ ├─ cardak-backend                                        │
│ ├─ other-project                                         │
│ └─ another-project                                       │
│                                                           │
│                          [Deploy]                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Yapılacak İşlem:**
1. "Select a repository" açılır menüsüne tıkla
2. "cardak-backend" seçeneğini seç
3. "Deploy" butonuna tıkla

---

### Ekran 6: Build Logs

**Ekran Tarifi:**
- Sayfanın ortasında "Building..." yazısı
- Aşağıda gerçek zamanlı logs
- Logs'ta "npm install", "npm run build" komutları görülüyor

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Deployment Logs                                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Building...                                              │
│                                                           │
│ [Logs]                                                   │
│ > npm install                                            │
│ > npm run build                                          │
│ > npm start                                              │
│                                                           │
│ ✓ Build successful                                       │
│ ✓ Deployment successful                                  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Beklenen Sonuç:**
- Build 2-5 dakika içinde tamamlanır
- "✓ Build successful" mesajı görülür

---

## ⚙️ ADIM 4: ENVIRONMENT VARIABLES

### Ekran 1: Variables Sekmesi

**Nereye gideceğim?**
- Railway proje sayfasında
- Sayfanın üst kısmında sekmeler: "Deployments", "Variables", "Storage", "Settings"

**Ekran Tarifi:**
- "Variables" sekmesine tıkla
- Açılan sayfada "Add Variable" butonu
- Boş bir tablo (henüz variable yok)

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ [Deployments] [Variables] [Storage] [Settings]          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Environment Variables                                    │
│                                                           │
│ [Add Variable]                                           │
│                                                           │
│ Name          Value                                      │
│ ─────────────────────────────────────────────────────    │
│ (Henüz variable yok)                                     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 2: Variable Ekleme Formu

**Ne yapacağım?**
- "Add Variable" butonuna tıkla

**Ekran Tarifi:**
- Açılan form:
  - "Name" input alanı
  - "Value" input alanı
  - "Add" butonu

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Add Variable                                             │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Name *                                                   │
│ [JWT_SECRET                                        ]     │
│                                                           │
│ Value *                                                  │
│ [a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6]│
│                                                           │
│                          [Add]                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Doldurulacak Alanlar:**
1. Name: `JWT_SECRET`
2. Value: Terminal'de oluşturduğun uzun karakter dizisi
3. "Add" butonuna tıkla

---

### Ekran 3: Variables Listesi

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Environment Variables                                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Name                Value                                │
│ ─────────────────────────────────────────────────────    │
│ JWT_SECRET          ••••••••••••••••••••••••••••••••     │
│ SENTRY_DSN          ••••••••••••••••••••••••••••••••     │
│ NODE_ENV            production                           │
│ PORT                3000                                 │
│ DATABASE_URL        file:./production.db                 │
│ ...                 ...                                  │
│                                                           │
│ [Add Variable]                                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 ADIM 5: PERSISTENT STORAGE

### Ekran 1: Storage Sekmesi

**Nereye gideceğim?**
- Railway proje sayfasında
- "Storage" sekmesine tıkla

**Ekran Tarifi:**
- "Storage" sekmesi açılır
- "Add Storage" butonu
- Boş bir tablo (henüz storage yok)

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ [Deployments] [Variables] [Storage] [Settings]          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Storage                                                  │
│                                                           │
│ [Add Storage]                                            │
│                                                           │
│ Mount Path    Size                                       │
│ ─────────────────────────────────────────────────────    │
│ (Henüz storage yok)                                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

### Ekran 2: Storage Ekleme Formu

**Ne yapacağım?**
- "Add Storage" butonuna tıkla

**Ekran Tarifi:**
- Açılan form:
  - "Mount Path" input alanı
  - "Size" dropdown menüsü
  - "Create" butonu

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Add Storage                                              │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Mount Path *                                             │
│ [/app/prisma                                        ]    │
│                                                           │
│ Size *                                                   │
│ [1 GB ▼]                                                 │
│                                                           │
│                          [Create]                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Doldurulacak Alanlar:**
1. Mount Path: `/app/prisma`
2. Size: `1 GB`
3. "Create" butonuna tıkla

---

### Ekran 3: Storage Oluşturuldu

**Beklenen Görünüm:**
```
┌─────────────────────────────────────────────────────────┐
│ Storage                                                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Mount Path    Size      Status                           │
│ ─────────────────────────────────────────────────────    │
│ /app/prisma   1 GB      ✓ Active                         │
│                                                           │
│ [Add Storage]                                            │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ ADIM 6: POST-DEPLOYMENT TEST

### Terminal Ekranı 1: Health Check

**Terminal'de çalıştırılacak Komut:**

```bash
curl https://YOUR_RAILWAY_URL/health
```

**Beklenen Çıktı:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

---

### Terminal Ekranı 2: API Health Check

**Terminal'de çalıştırılacak Komut:**

```bash
curl https://YOUR_RAILWAY_URL/api/v1/health
```

**Beklenen Çıktı:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-11-06T15:30:00.000Z"
}
```

---

### Terminal Ekranı 3: Login Test

**Terminal'de çalıştırılacak Komut:**

```bash
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cardak.com","password":"SecurePassword123!"}'
```

**Beklenen Çıktı:**
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

## 🎉 BAŞARILI DEPLOYMENT

**Tüm Kontroller Başarılı:**
- ✅ GitHub'da repository görünüyor
- ✅ Railway'de deployment "Success" durumunda
- ✅ Health endpoint 200 OK döndürüyor
- ✅ API health endpoint database bağlantısını gösteriyor
- ✅ Login endpoint JWT token döndürüyor

**Tebrikler! Deployment tamamlandı!** 🎊

---

**Son Güncelleme**: 2025-11-06

