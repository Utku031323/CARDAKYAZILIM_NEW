# Çardak Paketleme - Admin Panel Uygulama Planı

## 🎯 Proje Hedefi

Çardak Paketleme uygulamasına, yöneticilerin teklif talepleri, onboarding başvuruları, fiyatlandırma ve site içeriğini yönetebileceği kapsamlı bir admin panel eklemek.

---

## 📊 Mevcut Durum

### ✅ Tamamlanan
- React 18 + TypeScript frontend
- Müşteri sayfaları (teklif, onboarding)
- Form validasyonu (React Hook Form + Zod)
- Responsive tasarım
- SEO optimizasyonu
- shadcn/ui bileşenleri

### ❌ Eksik
- Admin panel
- Kimlik doğrulama sistemi
- Backend API
- Veritabanı
- Veri yönetimi

---

## 🏗️ Admin Panel Mimarisi

### Sayfa Yapısı

```
/admin
├── /admin/login                    # Giriş sayfası
├── /admin/dashboard                # Ana dashboard
├── /admin/quotes                   # Teklif talepleri listesi
│   ├── /admin/quotes/:id           # Teklif detayı
│   └── /admin/quotes/:id/edit      # Teklif düzenleme
├── /admin/onboarding               # Onboarding başvuruları
│   └── /admin/onboarding/:id       # Başvuru detayı
├── /admin/pricing                  # Fiyatlandırma yönetimi
├── /admin/settings                 # Ayarlar
│   ├── /admin/settings/contact     # İletişim bilgileri
│   ├── /admin/settings/content     # İçerik yönetimi
│   └── /admin/settings/users       # Kullanıcı yönetimi
└── /admin/analytics                # Analitikler
```

### Bileşen Yapısı

```
src/
├── pages/admin/
│   ├── AdminLogin.tsx              # Giriş sayfası
│   ├── AdminDashboard.tsx          # Ana dashboard
│   ├── AdminQuotes.tsx             # Teklif listesi
│   ├── AdminQuoteDetail.tsx        # Teklif detayı
│   ├── AdminOnboarding.tsx         # Onboarding listesi
│   ├── AdminPricing.tsx            # Fiyatlandırma
│   ├── AdminSettings.tsx           # Ayarlar
│   └── AdminAnalytics.tsx          # Analitikler
├── components/admin/
│   ├── AdminLayout.tsx             # Admin layout
│   ├── AdminSidebar.tsx            # Sidebar navigasyon
│   ├── AdminHeader.tsx             # Üst bar
│   ├── QuoteTable.tsx              # Teklif tablosu
│   ├── OnboardingTable.tsx         # Onboarding tablosu
│   ├── PricingForm.tsx             # Fiyatlandırma formu
│   ├── SettingsForm.tsx            # Ayarlar formu
│   └── AnalyticsCharts.tsx         # Analitik grafikler
├── context/
│   ├── AuthContext.tsx             # Kimlik doğrulama context
│   └── AdminContext.tsx            # Admin context
├── hooks/
│   ├── useAuth.ts                  # Kimlik doğrulama hook
│   ├── useAdmin.ts                 # Admin hook
│   └── useAdminData.ts             # Veri yönetimi hook
└── types/
    ├── admin.ts                    # Admin tipleri
    ├── auth.ts                     # Kimlik doğrulama tipleri
    └── api.ts                      # API tipleri
```

---

## 🔐 Kimlik Doğrulama Sistemi

### Giriş Akışı

1. Yönetici `/admin/login` sayfasına gider
2. E-posta ve şifre girer
3. Backend'e POST isteği gönderilir
4. Backend JWT token döndürür
5. Token localStorage'da saklanır
6. Yönetici `/admin/dashboard`'a yönlendirilir

### Protected Routes

```typescript
// ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};
```

### Token Yönetimi

- **Access Token:** 1 saat geçerli
- **Refresh Token:** 7 gün geçerli
- **Storage:** localStorage
- **Header:** `Authorization: Bearer <token>`

---

## 📋 Admin Panel Özellikleri

### 1. Dashboard

**Gösterilen Veriler:**
- Toplam teklif talepleri
- Toplam onboarding başvuruları
- Beklemede olan talepleri
- Son 7 günün istatistikleri
- Hızlı erişim bağlantıları

**Bileşenler:**
- Stat cards (istatistik kartları)
- Charts (grafikler)
- Recent activity (son aktiviteler)
- Quick actions (hızlı işlemler)

### 2. Teklif Talepleri Yönetimi

**Özellikler:**
- Teklif listesi tablosu
- Filtreleme (durum, tarih, şirket)
- Arama (şirket adı, e-posta)
- Sıralama (tarih, durum)
- Sayfalama
- Detay görüntüleme
- Durum güncelleme
- Teklif gönderme
- Silme

**Durumlar:**
- Beklemede (Pending)
- İncelendi (Reviewed)
- Teklif Verildi (Quoted)
- Kabul Edildi (Accepted)
- Reddedildi (Rejected)

### 3. Onboarding Başvuruları Yönetimi

**Özellikler:**
- Başvuru listesi
- Filtreleme (durum, adım)
- Arama (şirket adı)
- Detay görüntüleme
- Adım ilerleme takibi
- Belge yönetimi
- Durum güncelleme
- Notlar ekleme

### 4. Fiyatlandırma Yönetimi

**Özellikler:**
- Fiyat seviyeleri düzenleme
- Depolama ücretleri
- Özellikler yönetimi
- Yürürlük tarihleri
- Geçmiş versiyonlar
- Değişiklik günlüğü

### 5. Ayarlar

**İletişim Bilgileri:**
- Şirket adı
- Telefon numarası
- E-posta adresi
- Adres
- Genel müdür adı

**İçerik Yönetimi:**
- Hizmet açıklamaları
- Avantajlar
- Fotoğraflar
- Metinler

**Kullanıcı Yönetimi:**
- Yönetici listesi
- Yönetici ekleme/silme
- Rol yönetimi
- İzin yönetimi

### 6. Analitikler

**Gösterilen Veriler:**
- Aylık teklif talepleri
- Aylık onboarding başvuruları
- Dönüşüm oranları
- Ürün türü dağılımı
- Coğrafi dağılım
- Zaman serisi grafikler

---

## 🔄 Veri Akışı

### Teklif Talep Akışı

```
1. Müşteri /teklif-al sayfasında form doldurur
2. Form gönderilir → Backend API
3. Backend veritabanına kaydeder
4. Admin /admin/quotes sayfasında görür
5. Admin detayları görüntüler
6. Admin durumu günceller
7. Admin teklif gönderir
8. Müşteri e-posta alır
```

### Onboarding Akışı

```
1. Müşteri /basla sayfasında başvuru yapar
2. Başvuru gönderilir → Backend API
3. Backend veritabanına kaydeder
4. Admin /admin/onboarding sayfasında görür
5. Admin adımları takip eder
6. Admin belgeleri kontrol eder
7. Admin durumu günceller
8. Müşteri bilgilendirilir
```

---

## 🛠️ Teknoloji Stack

### Frontend (Admin Panel)
- React 18 + TypeScript
- React Router DOM (routing)
- React Hook Form + Zod (form)
- TanStack React Query (veri)
- Zustand (state management)
- Tailwind CSS + shadcn/ui (UI)
- Recharts (grafikler)
- Axios (HTTP client)

### Backend (Gerekli)
- Node.js 20 + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (kimlik doğrulama)
- bcryptjs (şifre)

### Bağımlılıklar (Eklenecek)
```json
{
  "zustand": "^4.4.0",
  "axios": "^1.6.0",
  "date-fns": "^2.30.0",
  "react-table": "^8.10.0"
}
```

---

## 📅 Uygulama Yol Haritası

### Faz 1: Temel Altyapı (1-2 hafta)
- [ ] Backend API kurulumu
- [ ] Veritabanı şeması
- [ ] Kimlik doğrulama sistemi
- [ ] API endpoints (temel)

### Faz 2: Admin Layout (1 hafta)
- [ ] Admin layout bileşeni
- [ ] Sidebar navigasyon
- [ ] Üst bar
- [ ] Protected routes

### Faz 3: Teklif Yönetimi (1-2 hafta)
- [ ] Teklif listesi sayfası
- [ ] Teklif detayı sayfası
- [ ] Teklif düzenleme
- [ ] Durum güncelleme

### Faz 4: Onboarding Yönetimi (1-2 hafta)
- [ ] Onboarding listesi
- [ ] Başvuru detayı
- [ ] Adım takibi
- [ ] Belge yönetimi

### Faz 5: Fiyatlandırma ve Ayarlar (1 hafta)
- [ ] Fiyatlandırma yönetimi
- [ ] İletişim bilgileri
- [ ] İçerik yönetimi
- [ ] Kullanıcı yönetimi

### Faz 6: Analitikler (1 hafta)
- [ ] Dashboard grafikler
- [ ] Analitik sayfası
- [ ] Raporlar
- [ ] Dışa aktarma

### Faz 7: Test ve Dağıtım (1 hafta)
- [ ] Unit testler
- [ ] Integration testler
- [ ] E2E testler
- [ ] Dağıtım

**Toplam Süre:** 7-10 hafta

---

## 💰 Maliyet Tahmini

### Geliştirme Maliyeti
- Backend API: 2-3 hafta × $50-100/saat = $4,000-12,000
- Admin Panel: 4-5 hafta × $50-100/saat = $10,000-20,000
- Test ve Dağıtım: 1-2 hafta × $50-100/saat = $2,000-4,000
- **Toplam:** $16,000-36,000

### Altyapı Maliyeti
- Backend Hosting: $50-100/ay
- Database: $30-50/ay
- CDN: $0-20/ay
- **Toplam:** $80-170/ay

---

## ✅ Başarı Kriterleri

- [ ] Admin giriş sayfası çalışıyor
- [ ] Teklif talepleri görüntülenebiliyor
- [ ] Onboarding başvuruları görüntülenebiliyor
- [ ] Fiyatlandırma düzenlenebiliyor
- [ ] Ayarlar güncellenebiliyor
- [ ] Analitikler gösteriliyor
- [ ] Tüm testler geçiyor
- [ ] Performans hedefleri karşılanıyor

---

## 📞 Sonraki Adımlar

1. Backend API geliştirmesini başlat
2. Veritabanı şemasını finalize et
3. Kimlik doğrulama sistemini kur
4. Admin panel tasarımını yap
5. Bileşenleri geliştir
6. Testleri yaz
7. Dağıt

---

**Plan Tarihi:** 15 Ocak 2025
**Durum:** ✅ Hazır
**Sonraki Adım:** Backend Geliştirmesi
