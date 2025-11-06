# Çardak Paketleme - E-Ticaret Paketleme Hizmeti

Modern React/TypeScript tabanlı e-ticaret paketleme hizmeti web uygulaması.

## Özellikler

- ⚡ **Modern Teknolojiler**: React 18, TypeScript, Vite
- 🎨 **Modern UI**: shadcn/ui bileşenleri ve Tailwind CSS
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 🚀 **Hızlı Geliştirme**: Hot reload ve instant preview
- 🔧 **Tip Güvenliği**: Full TypeScript desteği

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# 1. Projeyi klonlayın
git clone <repository-url>
cd paketle-cozum

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcınızda http://localhost:8080 adresini açın
```

## Geliştirme

### Mevcut Komutlar

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Development build oluştur
npm run build:dev

# Kodu kontrol et (linting)
npm run lint

# Build'i önizle
npm run preview
```

## Teknolojiler

Bu proje aşağıdaki teknolojiler kullanılarak geliştirilmiştir:

- **Vite** - Hızlı build tool ve dev server
- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **shadcn/ui** - Modern UI bileşenleri
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validation
- **Lucide React** - Modern ikonlar

## Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ui/             # shadcn/ui bileşenleri
│   ├── Header.tsx      # Site başlığı
│   ├── Hero.tsx        # Ana hero bölümü
│   ├── Footer.tsx      # Site alt bilgisi
│   └── ...
├── pages/              # Sayfa bileşenleri
│   ├── Index.tsx       # Ana sayfa
│   └── NotFound.tsx    # 404 sayfası
├── hooks/              # Custom React hooks
├── lib/                # Utility fonksiyonları
└── assets/             # Statik dosyalar
```

## Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# dist/ klasörünü Netlify'a yükleyin
```

### Diğer Platformlar

Herhangi bir statik hosting servisi kullanabilirsiniz:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
