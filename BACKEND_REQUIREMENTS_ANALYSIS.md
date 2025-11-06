# Çardak Paketleme - Backend Gereksinimler Analizi

## 📋 Yönetici Özeti

**Sonuç:** ✅ **BACKEND UYGULAMASI ZORUNLUDUR**

Çardak Paketleme projesi, müşteri tarafı ve yönetici paneli ile birlikte tam işlevsel bir e-ticaret paketleme hizmet platformu olarak tasarlanmıştır. Mevcut frontend uygulaması tamamen mock veriler üzerinde çalışmakta olup, gerçek veri kalıcılığı, kullanıcı yönetimi ve iş mantığı için backend altyapısı gereklidir.

---

## 1. MEVCUT DURUM DEĞERLENDİRMESİ

### 1.1 Frontend Uygulaması Özeti

**Proje Yapısı:**
- React 18 + TypeScript + Vite
- Responsive tasarım (mobil, tablet, masaüstü)
- shadcn/ui bileşenleri
- Tailwind CSS styling
- React Router DOM routing

**Müşteri Tarafı Sayfaları:**
1. **Ana Sayfa (Index.tsx)** - Hizmet tanıtımı
2. **Teklif Al (TeklifAl.tsx)** - Teklif talep formu
3. **Başla (Basla.tsx)** - 4 adımlı onboarding süreci

**Yönetici Paneli (9 sayfa):**
1. AdminLogin - Giriş sayfası
2. AdminDashboard - Özet istatistikler
3. AdminQuotes - Teklif talepleri listesi
4. AdminQuoteDetail - Teklif detayları
5. AdminOnboarding - Onboarding başvuruları
6. AdminOnboardingDetail - Onboarding detayları
7. AdminPricing - Fiyatlandırma yönetimi
8. AdminSettings - Sistem ayarları
9. AdminAnalytics - Analitik dashboard

### 1.2 Mock Veri Kullanımı

**Mevcut Mock Veriler:**
- 11 teklif talebinin örnek verisi
- 12 onboarding başvurusunun örnek verisi
- 4 fiyatlandırma katmanının örnek verisi
- 30 günlük analitik verisi
- 2 mock yönetici kullanıcısı (localStorage'da)

**Veri Kalıcılığı:**
- localStorage: Sadece yönetici oturumu
- Hiçbir veri sunucu tarafında depolanmıyor
- Sayfa yenilenmesi sonrası tüm veriler kaybolur

### 1.3 Sunucu Tarafı İşleme Gerektiren Özellikler

| Özellik | Durum | Gerekçe |
|---------|-------|---------|
| Teklif Talep Formu | ❌ Mock | Veritabanına kaydedilmiyor |
| Onboarding Başvurusu | ❌ Mock | Veritabanına kaydedilmiyor |
| Yönetici Girişi | ❌ Mock | Gerçek kimlik doğrulama yok |
| Fiyatlandırma Yönetimi | ❌ Mock | Değişiklikler kaydedilmiyor |
| Ayarlar Yönetimi | ❌ Mock | Değişiklikler kaydedilmiyor |
| Analitikler | ❌ Mock | Gerçek veriler yok |
| E-posta Bildirimleri | ❌ Yok | Hiç uygulanmadı |
| Dosya Yükleme | ❌ Yok | Hiç uygulanmadı |
| Ödeme İşlemleri | ❌ Yok | Hiç uygulanmadı |

---

## 2. BACKEND GEREKSİNİMLERİ ANALİZİ

### 2.1 Kimlik Doğrulama ve Yetkilendirme

**Gereksinimler:**
- ✅ Yönetici kullanıcı yönetimi
- ✅ JWT token tabanlı kimlik doğrulama
- ✅ Rol tabanlı erişim kontrolü (Admin, Manager, Viewer)
- ✅ Şifre hashleme ve güvenlik
- ✅ Oturum yönetimi
- ✅ Şifre sıfırlama işlevi

**Kullanıcı Rolleri:**
- **Admin:** Tüm işlemlere erişim
- **Manager:** Teklif ve onboarding yönetimi
- **Viewer:** Sadece görüntüleme erişimi

### 2.2 Veritabanı İşlemleri (CRUD)

**Teklif Talepleri (QuoteRequest):**
- ✅ Yeni teklif talebini kaydet
- ✅ Teklif taleplerini listele
- ✅ Teklif detaylarını görüntüle
- ✅ Teklif durumunu güncelle
- ✅ Teklif notlarını ekle/güncelle
- ✅ Teklif talebini sil

**Onboarding Başvuruları (OnboardingSubmission):**
- ✅ Yeni onboarding başvurusunu kaydet
- ✅ Onboarding başvurularını listele
- ✅ Onboarding detaylarını görüntüle
- ✅ Adım verilerini güncelle
- ✅ Onboarding durumunu güncelle
- ✅ Belgeleri yükle ve sakla

**Fiyatlandırma Katmanları (PricingTier):**
- ✅ Fiyatlandırma katmanlarını listele
- ✅ Yeni katman ekle
- ✅ Katmanı güncelle
- ✅ Katmanı sil
- ✅ Katman durumunu değiştir

**Sistem Ayarları (AdminSettings):**
- ✅ Şirket bilgilerini kaydet
- ✅ İletişim bilgilerini güncelle
- ✅ Web sitesi içeriğini yönet
- ✅ Bildirim tercihlerini kaydet

### 2.3 API Uç Noktaları

**Kimlik Doğrulama:**
```
POST   /api/auth/login              - Yönetici girişi
POST   /api/auth/logout             - Yönetici çıkışı
POST   /api/auth/refresh            - Token yenileme
POST   /api/auth/forgot-password    - Şifre sıfırlama
POST   /api/auth/reset-password     - Şifre değiştirme
```

**Teklif Talepleri:**
```
GET    /api/quotes                  - Teklif listesi
GET    /api/quotes/:id              - Teklif detayı
POST   /api/quotes                  - Yeni teklif oluştur
PUT    /api/quotes/:id              - Teklifi güncelle
DELETE /api/quotes/:id              - Teklifi sil
PUT    /api/quotes/:id/status       - Durumu güncelle
POST   /api/quotes/:id/notes        - Not ekle
```

**Onboarding:**
```
GET    /api/onboarding              - Onboarding listesi
GET    /api/onboarding/:id          - Onboarding detayı
POST   /api/onboarding              - Yeni onboarding oluştur
PUT    /api/onboarding/:id          - Onboarding güncelle
DELETE /api/onboarding/:id          - Onboarding sil
PUT    /api/onboarding/:id/step     - Adım güncelle
POST   /api/onboarding/:id/documents - Belge yükle
```

**Fiyatlandırma:**
```
GET    /api/pricing                 - Fiyatlandırma listesi
GET    /api/pricing/:id             - Fiyatlandırma detayı
POST   /api/pricing                 - Yeni fiyatlandırma oluştur
PUT    /api/pricing/:id             - Fiyatlandırmayı güncelle
DELETE /api/pricing/:id             - Fiyatlandırmayı sil
PUT    /api/pricing/:id/status      - Durumu değiştir
```

**Ayarlar:**
```
GET    /api/settings                - Ayarları getir
PUT    /api/settings                - Ayarları güncelle
```

**Analitikler:**
```
GET    /api/analytics/stats         - İstatistikler
GET    /api/analytics/quotes        - Teklif analitikleri
GET    /api/analytics/onboarding    - Onboarding analitikleri
GET    /api/analytics/revenue       - Gelir analitikleri
```

### 2.4 Veri Modelleri ve Şemalar

**QuoteRequest:**
```typescript
{
  id: UUID
  companyName: string
  contactName: string
  email: string
  phone: string
  monthlyOrderCount: number
  productTypes: string[]
  specialRequirements?: string
  hasFragileItems: boolean
  needsCustomPackaging: boolean
  preferredStartDate?: date
  calculatedPrice?: number
  status: "pending" | "reviewed" | "quoted" | "accepted" | "rejected"
  notes?: string
  createdAt: timestamp
  updatedAt: timestamp
  createdBy: UUID (admin user)
}
```

**OnboardingSubmission:**
```typescript
{
  id: UUID
  companyName: string
  contactName: string
  email: string
  phone: string
  currentStep: 1 | 2 | 3 | 4
  stepData: {
    step1?: { companyInfo, taxId, address }
    step2?: { selectedServices, requirements }
    step3?: { integrationPlatform, integrationDetails }
    step4?: { startDate, notes }
  }
  documents: {
    taxCertificate?: string (file path)
    signatureCircular?: string (file path)
    ecommercePlatformInfo?: string (file path)
  }
  status: "pending" | "in_progress" | "completed" | "rejected"
  createdAt: timestamp
  updatedAt: timestamp
  createdBy: UUID (customer)
}
```

**PricingTier:**
```typescript
{
  id: UUID
  name: string
  monthlyPrice: number
  pricePerOrder: number
  description: string
  features: string[]
  orderVolumeMin: number
  orderVolumeMax?: number
  status: "active" | "inactive"
  createdAt: timestamp
  updatedAt: timestamp
}
```

**AdminUser:**
```typescript
{
  id: UUID
  email: string
  passwordHash: string
  name: string
  role: "admin" | "manager" | "viewer"
  isActive: boolean
  lastLogin?: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 2.5 Dosya Depolama Gereksinimleri

**Gerekli Dosya Türleri:**
- Vergi sertifikası (PDF)
- İmza sirküleri (PDF)
- E-ticaret platform bilgileri (PDF/Resim)
- Şirket logosu (PNG/JPG)
- Ürün resimleri (PNG/JPG)

**Depolama Çözümleri:**
- AWS S3 veya benzer bulut depolama
- Yerel dosya sistemi (geliştirme için)
- CDN entegrasyonu (performans için)

### 2.6 E-posta ve Bildirim Hizmetleri

**Gerekli E-posta Şablonları:**
- Teklif talebinin alındığı bildirimi
- Teklif hazırlandığı bildirimi
- Onboarding başladığı bildirimi
- Onboarding tamamlandığı bildirimi
- Yönetici bildirimleri
- Şifre sıfırlama e-postası

**E-posta Sağlayıcısı:**
- SendGrid, Mailgun, AWS SES veya benzer

### 2.7 Güvenlik Gereksinimleri

- ✅ HTTPS/TLS şifreleme
- ✅ CORS yapılandırması
- ✅ Rate limiting
- ✅ SQL injection koruması
- ✅ XSS koruması
- ✅ CSRF token doğrulaması
- ✅ Şifre hashleme (bcrypt)
- ✅ JWT token imzalama
- ✅ Giriş denemesi sınırlaması
- ✅ Veri şifreleme (hassas bilgiler)

---

## 3. ADIM ADIM UYGULAMA PLANI

### 3.1 Teknoloji Yığını Önerisi

**Backend Framework:**
- **Node.js + Express.js** (Önerilen)
  - JavaScript/TypeScript ile tutarlılık
  - Hızlı geliştirme
  - Geniş ekosistem
  - Alternatif: Python/Django, Go/Gin

**Veritabanı:**
- **PostgreSQL** (Önerilen)
  - İlişkisel veri yapısı
  - ACID uyumluluğu
  - Güçlü sorgu yetenekleri
  - Alternatif: MySQL, MongoDB

**ORM/Query Builder:**
- **Prisma** veya **TypeORM**
  - Type-safe veritabanı işlemleri
  - Otomatik migration
  - Güçlü query builder

**Kimlik Doğrulama:**
- **JWT (JSON Web Tokens)**
- **bcrypt** (Şifre hashleme)
- **Passport.js** (Opsiyonel)

**Dosya Depolama:**
- **AWS S3** veya **MinIO** (Yerel)
- **Multer** (Dosya yükleme middleware)

**E-posta:**
- **SendGrid** veya **Mailgun**
- **Nodemailer** (Yerel SMTP)

**Diğer Araçlar:**
- **dotenv** (Ortam değişkenleri)
- **joi** veya **zod** (Veri doğrulama)
- **winston** (Logging)
- **jest** (Testing)

### 3.2 Proje Yapısı

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── cors.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── quoteController.ts
│   │   ├── onboardingController.ts
│   │   ├── pricingController.ts
│   │   ├── settingsController.ts
│   │   └── analyticsController.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── quotes.ts
│   │   ├── onboarding.ts
│   │   ├── pricing.ts
│   │   ├── settings.ts
│   │   └── analytics.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   └── logging.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── quoteService.ts
│   │   ├── onboardingService.ts
│   │   ├── pricingService.ts
│   │   ├── emailService.ts
│   │   └── fileService.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Quote.ts
│   │   ├── Onboarding.ts
│   │   ├── Pricing.ts
│   │   └── Settings.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── migrations/
│   │   └── [migration files]
│   └── app.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

### 3.3 Veritabanı Şeması

**Tablolar:**
1. `users` - Yönetici kullanıcıları
2. `quotes` - Teklif talepleri
3. `onboarding` - Onboarding başvuruları
4. `onboarding_steps` - Onboarding adım verileri
5. `pricing_tiers` - Fiyatlandırma katmanları
6. `settings` - Sistem ayarları
7. `audit_logs` - Denetim günlükleri
8. `files` - Yüklenen dosyalar

---

## 4. ÖNCELIK VE AŞAMALAR

### 4.1 Önem Seviyeleri

**Kritik (MVP):**
- ✅ Yönetici kimlik doğrulaması
- ✅ Teklif talepleri CRUD
- ✅ Onboarding başvuruları CRUD
- ✅ Fiyatlandırma yönetimi
- ✅ Temel analitikler

**Önemli (Phase 2):**
- ✅ E-posta bildirimleri
- ✅ Dosya yükleme
- ✅ Gelişmiş analitikler
- ✅ Raporlama

**İsteğe Bağlı (Phase 3):**
- ✅ Ödeme entegrasyonu
- ✅ SMS bildirimleri
- ✅ API rate limiting
- ✅ Gelişmiş güvenlik

### 4.2 Uygulama Aşamaları

**MVP (4-6 hafta):**
1. Backend altyapısı kurulumu
2. Veritabanı tasarımı ve migration
3. Kimlik doğrulama sistemi
4. Teklif talepleri API
5. Onboarding API
6. Fiyatlandırma API
7. Frontend entegrasyonu

**Phase 2 (3-4 hafta):**
1. E-posta hizmetleri
2. Dosya yükleme sistemi
3. Gelişmiş analitikler
4. Raporlama özellikleri
5. Denetim günlükleri

**Phase 3 (2-3 hafta):**
1. Ödeme entegrasyonu
2. SMS bildirimleri
3. API optimizasyonu
4. Performans iyileştirmeleri

---

## 5. FRONTEND ENTEGRASYON NOKTALARI

### 5.1 Gerekli Değişiklikler

**API İstemcisi Kurulumu:**
```typescript
// src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

**useAuth Hook Güncelleme:**
- Mock verilerden gerçek API çağrılarına geçiş
- JWT token yönetimi
- Otomatik token yenileme

**React Query Entegrasyonu:**
- API çağrılarını React Query ile yönet
- Caching ve senkronizasyon
- Hata yönetimi

### 5.2 Ortam Değişkenleri

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_API_TIMEOUT=30000
```

---

## 6. DAĞITIM HUSUSLARI

### 6.1 Geliştirme Ortamı

```bash
# Backend başlatma
npm install
npm run dev

# Veritabanı migration
npm run migrate

# Seed verisi
npm run seed
```

### 6.2 Üretim Ortamı

**Sunucu Seçenekleri:**
- AWS EC2 + RDS
- Heroku
- DigitalOcean
- Render
- Railway

**CI/CD Pipeline:**
- GitHub Actions
- GitLab CI
- Jenkins

**Monitoring:**
- Sentry (Hata izleme)
- DataDog (Performans)
- LogRocket (Kullanıcı oturumları)

---

## 7. ZAMAN VE KAYNAK TAHMİNİ

| Görev | Saat | Kişi |
|-------|------|------|
| Backend Kurulumu | 16 | 1 |
| Veritabanı Tasarımı | 24 | 1 |
| Kimlik Doğrulama | 32 | 1 |
| Teklif API | 40 | 1 |
| Onboarding API | 40 | 1 |
| Fiyatlandırma API | 24 | 1 |
| Frontend Entegrasyonu | 48 | 2 |
| Testing | 40 | 1 |
| Dağıtım | 16 | 1 |
| **TOPLAM MVP** | **280 saat** | **~7 hafta** |

---

## 8. ÖNERİLER VE SONUÇ

### 8.1 Önerilen Yaklaşım

1. **MVP ile başla:** Kritik özelliklerle başla
2. **Iteratif geliştirme:** Düzenli olarak yayınla
3. **Test odaklı:** Unit ve integration testleri yaz
4. **Güvenlik önceliği:** Güvenlik en başından düşün
5. **Monitoring:** Üretimde izleme kur

### 8.2 Başlangıç Adımları

1. Backend repository oluştur
2. Node.js + Express.js kurulumu
3. PostgreSQL veritabanı kurulumu
4. Prisma ORM kurulumu
5. Temel proje yapısını oluştur
6. Kimlik doğrulama sistemi geliştir
7. İlk API uç noktalarını geliştir
8. Frontend entegrasyonunu başla

### 8.3 Sonuç

Çardak Paketleme projesi, tam işlevsel bir platform olması için **kesinlikle backend uygulamasına ihtiyaç duyuyor**. Mevcut frontend uygulaması, mock veriler üzerinde çalışan bir prototip niteliğindedir. Backend olmadan:

- ❌ Müşteri teklif talepleri kaydedilemiyor
- ❌ Onboarding başvuruları saklanmıyor
- ❌ Yönetici ayarları kalıcı değil
- ❌ Analitikler gerçek veriye dayanmıyor
- ❌ E-posta bildirimleri gönderilemiyor
- ❌ Dosyalar yüklenemiyor

**Tavsiye:** MVP backend uygulamasına başlamak için 4-6 haftalık bir zaman dilimi planlayın.

---

**Rapor Tarihi:** 2025-01-15
**Durum:** ✅ BACKEND UYGULAMASI ZORUNLU
**Sonraki Adım:** Backend teknoloji yığını seçimi ve proje kurulumu
