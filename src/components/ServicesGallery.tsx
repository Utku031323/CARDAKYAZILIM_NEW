import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Star, Clock, Shield, Zap, Truck, Award } from "lucide-react";

const ServicesGallery = () => {
  const services = [
    {
      icon: Package,
      title: "Otomatik Sipariş Fulfillment",
      description: "Shopify, n11, Hepsiburada ve Trendyol'dan siparişleri otomatik olarak alın ve işleyin"
    },
    {
      icon: Truck,
      title: "Profesyonel Paketleme & Kargo",
      description: "Müşterilerinizin ürünlerini güvenli şekilde paketleyin ve kargo ile gönderin"
    },
    {
      icon: Zap,
      title: "Ölçeklenebilir Fiyatlandırma",
      description: "Sipariş hacminiz arttıkça birim fiyat düşer. Küçük işletmeden büyük mağazaya uyum sağlar"
    },
    {
      icon: Award,
      title: "Entegre Depolama Hizmeti",
      description: "Ürünlerinizi güvenli depolarda saklayın ve ihtiyaç duyduğunuzda paketleyin"
    },
    {
      icon: Clock,
      title: "Hızlı Fulfillment Süreci",
      description: "Siparişler 24 saat içinde paketlenir ve kargoya teslim edilir"
    }
  ];

  return (
    <section id="hizmetler" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Package className="h-4 w-4 mr-2" />
            Hizmetlerimiz
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            E-Ticaret İşletmeleri İçin Tam Fulfillment Çözümü
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Online mağazanızın siparişlerini tamamen yönetin. <strong>Platform entegrasyonu, otomatik fulfillment ve ölçeklenebilir fiyatlandırma</strong>
            ile işinizi büyütün. <strong>Daha fazla sipariş = daha düşük birim maliyet</strong>
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Platform Entegrasyonu</h3>
            <p className="text-muted-foreground text-sm">
              Shopify, n11, Hepsiburada ve Trendyol ile doğrudan bağlantı.
              Siparişler otomatik olarak sisteme aktarılır.
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Hızlı Fulfillment</h3>
            <p className="text-muted-foreground">
              Siparişler 24 saat içinde paketlenir ve kargoya teslim edilir
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Güvenli Depolama</h3>
            <p className="text-muted-foreground">
              Ürünleriniz profesyonel depolarda güvenli şekilde saklanır
            </p>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group hover:border-primary/50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              E-Ticaret İşletmenizi Ölçeklendirebilir Fulfillment ile Büyütün
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Küçük başlayın, büyüyün. İster 100 sipariş, ister 100.000 sipariş -
              aynı profesyonel hizmet ve ölçeklenebilir fiyatlandırma.
              Siparişleriniz otomatik olarak işlenir, paketlenir ve gönderilir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-base py-2 px-4">
                <Package className="h-4 w-4 mr-2" />
                Otomatik Fulfillment
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Clock className="h-4 w-4 mr-2" />
                24 Saat Işlem
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Shield className="h-4 w-4 mr-2" />
                Ölçeklenebilir Fiyat
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;