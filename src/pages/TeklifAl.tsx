import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Package, Clock, Shield, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Initialize EmailJS with public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "test_public_key";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "test_service";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "test_template";

emailjs.init(EMAILJS_PUBLIC_KEY);

const quoteSchema = z.object({
  companyName: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır"),
  contactName: z.string().min(2, "İletişim kişisi adı en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  monthlyOrderCount: z.string().min(1, "Aylık sipariş sayısını seçiniz"),
  productTypes: z.array(z.string()).min(1, "En az bir ürün türü seçiniz"),
  specialRequirements: z.string().optional(),
  hasFragileItems: z.boolean(),
  needsCustomPackaging: z.boolean(),
  preferredStartDate: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const TeklifAl = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sayfa yüklendiğinde scroll pozisyonunu en üste ayarla
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productTypes: [],
      hasFragileItems: false,
      needsCustomPackaging: false,
    },
  });

  const monthlyOrderCount = watch("monthlyOrderCount");
  const productTypes = watch("productTypes");

  // Calculate price based on monthly order count
  const calculatePrice = (orderCount: string) => {
    const ranges = {
      "0-100": 30,
      "101-250": 24,
      "251-500": 22,
      "501-750": 21,
      "751-1000": 20,
      "1000+": 18,
    };
    return ranges[orderCount as keyof typeof ranges] || 0;
  };

  // Update calculated price when order count changes
  React.useEffect(() => {
    if (monthlyOrderCount) {
      setCalculatedPrice(calculatePrice(monthlyOrderCount));
    }
  }, [monthlyOrderCount]);

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);

    try {
      // Prepare email content
      const emailContent = `
Yeni Teklif Talebi

ŞIRKET BİLGİLERİ:
- Şirket Adı: ${data.companyName}
- İletişim Kişisi: ${data.contactName}
- E-posta: ${data.email}
- Telefon: ${data.phone}

SİPARİŞ BİLGİLERİ:
- Aylık Sipariş Sayısı: ${data.monthlyOrderCount}
- Ürün Türleri: ${data.productTypes.join(", ")}

EK GEREKSİNİMLER:
- Kırılabilir Ürün: ${data.hasFragileItems ? "Evet" : "Hayır"}
- Özel Paketleme: ${data.needsCustomPackaging ? "Evet" : "Hayır"}
- Tercih Edilen Başlangıç Tarihi: ${data.preferredStartDate || "Belirtilmedi"}

ÖZEL İSTEKLER:
${data.specialRequirements || "Belirtilmedi"}
      `.trim();

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: "chardakstorage@gmail.com",
          from_email: data.email,
          from_name: data.contactName,
          subject: `Yeni Teklif Talebi - ${data.companyName}`,
          message: emailContent,
          company_name: data.companyName,
          contact_name: data.contactName,
          phone: data.phone,
          monthly_orders: data.monthlyOrderCount,
          product_types: data.productTypes.join(", "),
          has_fragile_items: data.hasFragileItems ? "Evet" : "Hayır",
          needs_custom_packaging: data.needsCustomPackaging ? "Evet" : "Hayır",
          preferred_start_date: data.preferredStartDate || "Belirtilmedi",
          special_requirements: data.specialRequirements || "Belirtilmedi",
          date: new Date().toLocaleDateString("tr-TR"),
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully:", response);
        setIsSubmitted(true);
      } else {
        throw new Error("E-posta gönderilemedi");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Teklif gönderimi başarısız oldu. Lütfen daha sonra tekrar deneyiniz.";
      setSubmitError(errorMessage);
      console.error("Error sending email:", error);
    }
  };

  const productTypeOptions = [
    "Elektronik",
    "Giyim & Aksesuar",
    "Ev & Yaşam",
    "Kozmetik & Kişisel Bakım",
    "Kitap & Kırtasiye",
    "Spor & Outdoor",
    "Oyuncak & Hobi",
    "Gıda & İçecek",
    "Sağlık & Medikal",
    "Diğer",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success-green" />
                </div>
                <CardTitle className="text-2xl text-foreground">
                  Teklif Talebiniz Alındı!
                </CardTitle>
                <CardDescription className="text-lg">
                  En kısa sürede size dönüş yapacağız.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Teklif talebiniz başarıyla iletildi. Uzman ekibimiz 24 saat içinde 
                  size özel bir teklif hazırlayarak iletişim bilgilerinizden ulaşacaktır.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">Ana Sayfaya Dön</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/basla">Hemen Başla</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm sm:text-base">Ana Sayfaya Dön</span>
              </Link>
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Teklif Al
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Size özel fiyat teklifi almak için aşağıdaki formu doldurun.
              24 saat içinde detaylı teklifimizi e-posta adresinize göndereceğiz.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <span>Teklif Formu</span>
                  </CardTitle>
                  <CardDescription>
                    Tüm alanları eksiksiz doldurunuz
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Error Alert */}
                    {submitError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{submitError}</AlertDescription>
                      </Alert>
                    )}

                    {/* Company Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Şirket Bilgileri
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Şirket Adı *</Label>
                          <Input
                            id="companyName"
                            {...register("companyName")}
                            placeholder="Şirket adınızı giriniz"
                          />
                          {errors.companyName && (
                            <p className="text-sm text-destructive">
                              {errors.companyName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">İletişim Kişisi *</Label>
                          <Input
                            id="contactName"
                            {...register("contactName")}
                            placeholder="Adınız ve soyadınız"
                          />
                          {errors.contactName && (
                            <p className="text-sm text-destructive">
                              {errors.contactName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-posta Adresi *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="ornek@sirket.com"
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon Numarası *</Label>
                          <Input
                            id="phone"
                            {...register("phone")}
                            placeholder="0555 123 45 67"
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Sipariş Bilgileri
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="monthlyOrderCount">Aylık Sipariş Sayısı *</Label>
                        <Select
                          onValueChange={(value) => setValue("monthlyOrderCount", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Aylık sipariş sayınızı seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-100">0 - 100 sipariş</SelectItem>
                            <SelectItem value="101-250">101 - 250 sipariş</SelectItem>
                            <SelectItem value="251-500">251 - 500 sipariş</SelectItem>
                            <SelectItem value="501-750">501 - 750 sipariş</SelectItem>
                            <SelectItem value="751-1000">751 - 1000 sipariş</SelectItem>
                            <SelectItem value="1000+">1000+ sipariş</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.monthlyOrderCount && (
                          <p className="text-sm text-destructive">
                            {errors.monthlyOrderCount.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Ürün Türleri *</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {productTypeOptions.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                checked={productTypes?.includes(type)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setValue("productTypes", [...(productTypes || []), type]);
                                  } else {
                                    setValue("productTypes", productTypes?.filter(t => t !== type) || []);
                                  }
                                }}
                              />
                              <Label htmlFor={type} className="text-sm font-normal">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.productTypes && (
                          <p className="text-sm text-destructive">
                            {errors.productTypes.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Ek Gereksinimler
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasFragileItems"
                            {...register("hasFragileItems")}
                          />
                          <Label htmlFor="hasFragileItems">
                            Kırılabilir ürünlerim var
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="needsCustomPackaging"
                            {...register("needsCustomPackaging")}
                          />
                          <Label htmlFor="needsCustomPackaging">
                            Özel paketleme ihtiyacım var
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialRequirements">Özel İstekler</Label>
                          <Textarea
                            id="specialRequirements"
                            {...register("specialRequirements")}
                            placeholder="Özel paketleme isteklerinizi, kargo tercihleri veya diğer gereksinimlerinizi belirtiniz..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferredStartDate">Tercih Edilen Başlangıç Tarihi</Label>
                          <Input
                            id="preferredStartDate"
                            type="date"
                            {...register("preferredStartDate")}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Gönderiliyor..." : "Teklif Talep Et"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Price Calculator Sidebar */}
            <div className="space-y-6">
              {calculatedPrice && (
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Package className="h-5 w-5 text-primary" />
                      <span>Tahmini Fiyat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {calculatedPrice} TL
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Paket başına (KDV hariç)
                      </p>
                      <Badge variant="secondary" className="mb-4">
                        {monthlyOrderCount} sipariş/ay
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hizmet Avantajları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-success-green" />
                    <span className="text-sm">Sabit fiyat garantisi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-success-green" />
                    <span className="text-sm">24 saat hızlı ödeme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-success-green" />
                    <span className="text-sm">Profesyonel paketleme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success-green" />
                    <span className="text-sm">7/24 müşteri desteği</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeklifAl;
