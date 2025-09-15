import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

const PricingSection = () => {
  const pricingTiers = [
    {
      range: "0 - 100",
      price: "30",
      popular: false,
      description: "Başlangıç paketleri için",
      features: ["Sabit fiyat", "Güvenli paketleme", "7/24 destek"],
      storageWarning: true
    },
    {
      range: "101 - 250",
      price: "24",
      popular: false,
      description: "Küçük işletmeler için",
      features: ["Sabit fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem"],
      storageWarning: false
    },
    {
      range: "251 - 500",
      price: "22",
      popular: true,
      description: "Orta ölçekli işletmeler",
      features: ["Sabit fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem", "Özel müşteri temsilcisi"],
      storageWarning: false
    },
    {
      range: "751 - 1000",
      price: "20",
      popular: false,
      description: "Büyük hacimler için",
      features: ["Sabit fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem", "Özel müşteri temsilcisi", "İndirimli kargo"],
      storageWarning: false
    },
    {
      range: "1000+",
      price: "18",
      popular: false,
      description: "Kurumsal çözümler",
      features: ["En uygun fiyat", "Güvenli paketleme", "7/24 destek", "Öncelikli işlem", "Özel müşteri temsilcisi", "İndirimli kargo", "Özel anlaşma"],
      storageWarning: false
    }
  ];

  return (
    <section id="fiyatlar" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Şeffaf Fiyatlandırma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aylık sipariş miktarınıza göre sabit birim fiyatlar. 
            Paketinizin boyutu, ağırlığı veya içeriği fiyatı etkilemez.
          </p>
        </div>

        {/* Pricing announcement card */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">📣 DUYURU - Yeni Fiyatlandırma</CardTitle>
            </div>
            <CardDescription>
              <strong>Geçerlilik Tarihi: 16 Mayıs 2025</strong> (KDV Hariç)
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : ''} transition-all duration-300 hover:shadow-lg`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  En Popüler
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  {tier.range} <span className="text-sm font-normal">sipariş</span>
                </CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {tier.price} <span className="text-base text-muted-foreground">TL</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success-green" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {tier.storageWarning && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        <strong>Ek ücret:</strong> Sabit 1.000 TL + KDV depolama ücreti
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment terms */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💳</span>
              <span>Ödeme Planı</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Faturalama Dönemi</h4>
                <p className="text-muted-foreground">
                  Her ayın 15'inden bir sonraki ayın 15'ine kadar olan siparişler bir arada faturalanır.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Ödeme Süreci</h4>
                <p className="text-muted-foreground">
                  Fatura her ayın 16'sında ödeme linki ile birlikte gönderilir. 
                  Ödeme süresi 24 saattir.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>⚠ Önemli:</strong> Belirtilen süre içinde ödeme yapılmadığı takdirde, 
                paketleme hizmeti geçici olarak durdurulacaktır.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;