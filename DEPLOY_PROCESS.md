# Çardak Paketleme - Frontend Dağıtım Rehberi

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Dağıtım Platformları Karşılaştırması](#dağıtım-platformları-karşılaştırması)
3. [Vercel ile Dağıtım](#vercel-ile-dağıtım)
4. [Netlify ile Dağıtım](#netlify-ile-dağıtım)
5. [GitHub Pages ile Dağıtım](#github-pages-ile-dağıtım)
6. [Alan Adı ve DNS Yapılandırması](#alan-adı-ve-dns-yapılandırması)
7. [SSL/HTTPS Kurulumu](#sslhttps-kurulumu)
8. [Ortam Değişkenleri](#ortam-değişkenleri)
9. [Dağıtım Sonrası Doğrulama](#dağıtım-sonrası-doğrulama)
10. [Sorun Giderme](#sorun-giderme)
11. [Maliyet Analizi](#maliyet-analizi)

---

## 🎯 Genel Bakış

Çardak Paketleme React/TypeScript uygulaması, modern frontend dağıtım platformlarına kolayca dağıtılabilir. Bu rehber, adım adım dağıtım sürecini açıklamaktadır.

### Proje Özellikleri
- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.19
- **Dil:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 3.4.17
- **Hosting:** Statik site (CDN uyumlu)

---

## 📊 Dağıtım Platformları Karşılaştırması

| Özellik | Vercel | Netlify | GitHub Pages | AWS S3 |
|---------|--------|---------|--------------|--------|
| **Kurulum Kolaylığı** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Otomatik Dağıtım** | ✅ | ✅ | ✅ | ❌ |
| **SSL/HTTPS** | ✅ Ücretsiz | ✅ Ücretsiz | ✅ Ücretsiz | ✅ Ücretsiz |
| **CDN** | ✅ Global | ✅ Global | ✅ GitHub | ✅ Evet |
| **Ücretsiz Tier** | ✅ | ✅ | ✅ | ✅ |
| **Türkiye Desteği** | ✅ İyi | ✅ İyi | ✅ İyi | ✅ Mükemmel |
| **Aylık Maliyet** | $0-20 | $0-19 | $0 | $1-5 |
| **Önerilen** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

**Tavsiye:** Vercel veya Netlify kullanmanız önerilir.

---

## 🚀 Vercel ile Dağıtım

### Adım 1: Vercel Hesabı Oluşturma

1. https://vercel.com adresine gidin
2. "Sign Up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın (veya email ile kayıt olun)
4. Email doğrulamasını tamamlayın

### Adım 2: Projeyi GitHub'a Yükleme

```bash
# Proje dizinine gidin
cd c:\CardakYazılım

# Git repository'sini başlatın (eğer yoksa)
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit yapın
git commit -m "Initial commit: Çardak Paketleme frontend"

# GitHub'a bağlantı kurun
git remote add origin https://github.com/YOUR_USERNAME/cardak-paketleme.git

# Main branch'e push yapın
git branch -M main
git push -u origin main
```

### Adım 3: Vercel'de Proje Oluşturma

1. Vercel Dashboard'a gidin (https://vercel.com/dashboard)
2. "Add New..." → "Project" seçin
3. GitHub repository'nizi seçin
4. "Import" butonuna tıklayın

### Adım 4: Build Ayarlarını Yapılandırma

Vercel otomatik olarak Vite projesini tanıyacaktır:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Tüm ayarlar doğru görünüyorsa "Deploy" butonuna tıklayın.

### Adım 5: Dağıtım Tamamlama

```
✅ Dağıtım başarılı!
Siteniz şu adreste yayında: https://cardak-paketleme.vercel.app
```

### Adım 6: Özel Alan Adı Bağlama (Opsiyonel)

1. Vercel Dashboard → Settings → Domains
2. "Add Domain" butonuna tıklayın
3. Alan adınızı girin (örn: cardakpaketleme.com)
4. DNS ayarlarını yapılandırın (aşağıya bakın)

---

## 🌐 Netlify ile Dağıtım

### Adım 1: Netlify Hesabı Oluşturma

1. https://netlify.com adresine gidin
2. "Sign up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın
4. Email doğrulamasını tamamlayın

### Adım 2: Projeyi Bağlama

1. Netlify Dashboard'a gidin
2. "Add new site" → "Import an existing project" seçin
3. GitHub'ı seçin ve repository'nizi seçin
4. "Authorize Netlify" butonuna tıklayın

### Adım 3: Build Ayarlarını Yapılandırma

Netlify otomatik olarak ayarları algılayacaktır:

- **Base directory:** (boş bırakın)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Adım 4: Dağıtım Başlatma

"Deploy site" butonuna tıklayın ve dağıtımın tamamlanmasını bekleyin.

```
✅ Dağıtım başarılı!
Siteniz şu adreste yayında: https://cardak-paketleme.netlify.app
```

### Adım 5: Özel Alan Adı Bağlama

1. Site settings → Domain management
2. "Add custom domain" seçin
3. Alan adınızı girin
4. DNS ayarlarını yapılandırın

---

## 📄 GitHub Pages ile Dağıtım

### Adım 1: Repository Ayarları

1. GitHub'da repository'nize gidin
2. Settings → Pages seçin
3. "Source" olarak "GitHub Actions" seçin

### Adım 2: GitHub Actions Workflow Oluşturma

`.github/workflows/deploy.yml` dosyası oluşturun:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Adım 3: Dağıtım

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

Dağıtım otomatik olarak başlayacaktır. Tamamlandıktan sonra:

```
✅ Siteniz şu adreste yayında: https://YOUR_USERNAME.github.io/cardak-paketleme
```

---

## 🌍 Alan Adı ve DNS Yapılandırması

### Alan Adı Satın Alma

Önerilen sağlayıcılar:
- **Namecheap** (https://namecheap.com)
- **GoDaddy** (https://godaddy.com)
- **Hetzner** (https://hetzner.com) - Türkiye dostu
- **Turhost** (https://turhost.com) - Türk sağlayıcı

### DNS Kayıtlarını Yapılandırma

#### Vercel için DNS Ayarları

1. Vercel Dashboard → Settings → Domains
2. Alan adınızı ekleyin
3. Vercel tarafından sağlanan nameservers'ı kopyalayın
4. Alan adı sağlayıcısında nameservers'ı güncelleyin

**Vercel Nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Netlify için DNS Ayarları

1. Netlify Site settings → Domain management
2. "Add custom domain" seçin
3. Alan adı sağlayıcısında şu A kaydını ekleyin:

```
A Record: 75.2.60.5
```

Veya Netlify nameservers'ı kullanın:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

### DNS Yayılması

DNS değişiklikleri 24-48 saat içinde yayılır. Kontrol etmek için:

```bash
# Windows PowerShell
nslookup cardakpaketleme.com

# Veya online araç kullanın
# https://mxtoolbox.com/
```

---

## 🔒 SSL/HTTPS Kurulumu

### Vercel/Netlify ile Otomatik SSL

Vercel ve Netlify otomatik olarak Let's Encrypt SSL sertifikası sağlar:

✅ **Otomatik HTTPS** - Tüm trafiği HTTPS'ye yönlendir
✅ **Ücretsiz Sertifika** - Let's Encrypt tarafından
✅ **Otomatik Yenileme** - Sertifika otomatik yenilenir

### SSL Sertifikasını Doğrulama

```bash
# Sertifikayı kontrol edin
curl -I https://cardakpaketleme.com

# Çıktı:
# HTTP/2 200
# content-type: text/html
# strict-transport-security: max-age=31536000; includeSubDomains
```

---

## 🔐 Ortam Değişkenleri

### Üretim Ortamı Değişkenleri

Vercel/Netlify Dashboard'da ortam değişkenlerini ayarlayın:

1. Project Settings → Environment Variables
2. Aşağıdaki değişkenleri ekleyin:

```
VITE_API_URL=https://api.cardakpaketleme.com
VITE_APP_NAME=Çardak Paketleme
VITE_APP_VERSION=1.0.0
```

### .env.production Dosyası

```env
# .env.production
VITE_API_URL=https://api.cardakpaketleme.com
VITE_APP_NAME=Çardak Paketleme
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

### Ortam Değişkenlerini Kullanma

```typescript
// src/config/env.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Çardak Paketleme';
export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';
```

---

## ✅ Dağıtım Sonrası Doğrulama

### Kontrol Listesi

- [ ] Site açılıyor ve yükleniyor
- [ ] Tüm sayfalar erişilebilir (/, /teklif-al, /basla)
- [ ] Navigasyon düzgün çalışıyor
- [ ] Formlar gönderiliyor
- [ ] Responsive tasarım mobilde çalışıyor
- [ ] HTTPS bağlantısı aktif
- [ ] Performans iyi (< 3 saniye yükleme)
- [ ] SEO meta etiketleri doğru
- [ ] Sitemap.xml erişilebilir
- [ ] robots.txt doğru yapılandırılmış

### Performans Testi

```bash
# Lighthouse ile test edin
# Chrome DevTools → Lighthouse → Generate report

# Veya online araç kullanın
# https://pagespeed.web.dev/
```

### Hata Kontrolü

```bash
# Browser console'da hata olup olmadığını kontrol edin
# F12 → Console sekmesi

# Network sekmesinde başarısız istekleri kontrol edin
# F12 → Network sekmesi
```

---

## 🐛 Sorun Giderme

### Sorun: Build Hatası

**Hata:** `npm run build` başarısız

**Çözüm:**
```bash
# Bağımlılıkları temizleyin
rm -r node_modules
npm install

# Build'i tekrar deneyin
npm run build
```

### Sorun: Sayfa Bulunamıyor (404)

**Hata:** Vercel/Netlify'de `/teklif-al` sayfası 404 hatası veriyor

**Çözüm:** Vercel/Netlify'de SPA yönlendirmesini yapılandırın

**Vercel:** Otomatik olarak yapılır
**Netlify:** `netlify.toml` dosyası oluşturun:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Sorun: Ortam Değişkenleri Çalışmıyor

**Hata:** `VITE_API_URL` undefined

**Çözüm:**
1. Ortam değişkeninin adı `VITE_` ile başlamalı
2. Build'i yeniden yapın
3. Cache'i temizleyin (Ctrl+Shift+Delete)

### Sorun: DNS Çalışmıyor

**Hata:** Alan adı çalışmıyor

**Çözüm:**
```bash
# DNS yayılmasını kontrol edin
nslookup cardakpaketleme.com

# Nameservers doğru mu kontrol edin
nslookup -type=NS cardakpaketleme.com

# 24-48 saat bekleyin
```

### Sorun: HTTPS Sertifikası Hatası

**Hata:** "Sertifika geçersiz" uyarısı

**Çözüm:**
1. Vercel/Netlify'de SSL sertifikasını yenileyin
2. Cache'i temizleyin
3. 24 saat bekleyin

---

## 💰 Maliyet Analizi

### Aylık Maliyet Tahmini

| Bileşen | Vercel | Netlify | GitHub Pages | AWS S3 |
|---------|--------|---------|--------------|--------|
| **Hosting** | $0-20 | $0-19 | $0 | $1-5 |
| **Alan Adı** | $10-15 | $10-15 | $10-15 | $10-15 |
| **SSL** | $0 | $0 | $0 | $0 |
| **CDN** | Dahil | Dahil | Dahil | $0-5 |
| **Toplam** | **$10-35** | **$10-34** | **$10-15** | **$21-40** |

### Yıllık Maliyet

| Platform | Yıllık Maliyet |
|----------|-----------------|
| Vercel | $120-420 |
| Netlify | $120-408 |
| GitHub Pages | $120-180 |
| AWS S3 | $252-480 |

**Tavsiye:** Vercel veya Netlify kullanın (en uygun fiyat-performans oranı)

---

## 📋 Dağıtım Kontrol Listesi

### Dağıtım Öncesi

- [ ] Tüm testler geçti
- [ ] Build hatası yok
- [ ] Tüm sayfalar çalışıyor
- [ ] Responsive tasarım test edildi
- [ ] SEO meta etiketleri doğru
- [ ] Ortam değişkenleri ayarlandı

### Dağıtım Sırasında

- [ ] Repository GitHub'a push edildi
- [ ] Dağıtım platformu seçildi
- [ ] Build ayarları yapılandırıldı
- [ ] Dağıtım başlatıldı
- [ ] Dağıtım tamamlandı

### Dağıtım Sonrası

- [ ] Site açılıyor
- [ ] Tüm sayfalar erişilebilir
- [ ] HTTPS aktif
- [ ] Performans iyi
- [ ] Hata yok
- [ ] Monitoring ayarlandı

---

## 🔄 Sürekli Dağıtım (CI/CD)

### Otomatik Dağıtım Ayarı

Vercel ve Netlify otomatik olarak:

1. GitHub'a push yapıldığında
2. Build'i çalıştırır
3. Testleri çalıştırır
4. Başarılıysa dağıtır

### Dağıtım Durumunu İzleme

1. Vercel/Netlify Dashboard'a gidin
2. "Deployments" sekmesine tıklayın
3. Son dağıtımın durumunu kontrol edin

---

## 📞 Destek ve Kaynaklar

### Vercel Desteği
- Dokümantasyon: https://vercel.com/docs
- Topluluk: https://github.com/vercel/next.js/discussions

### Netlify Desteği
- Dokümantasyon: https://docs.netlify.com
- Topluluk: https://community.netlify.com

### Genel Kaynaklar
- Vite Dokümantasyon: https://vitejs.dev
- React Dokümantasyon: https://react.dev
- Tailwind CSS: https://tailwindcss.com

---

## ✨ Özet

**Önerilen Dağıtım Süreci:**

1. ✅ Projeyi GitHub'a push yapın
2. ✅ Vercel veya Netlify'de hesap oluşturun
3. ✅ Repository'nizi bağlayın
4. ✅ Build ayarlarını yapılandırın
5. ✅ Dağıtımı başlatın
6. ✅ Alan adınızı bağlayın
7. ✅ DNS ayarlarını yapılandırın
8. ✅ Dağıtım sonrası testleri yapın

**Tahmini Süre:** 30-60 dakika

**Maliyet:** $10-35/ay

---

**Dağıtım Rehberi Sürümü:** 1.0
**Son Güncelleme:** 15 Ocak 2025
**Durum:** ✅ Hazır
