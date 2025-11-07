import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Star, Clock, Shield, Zap, Truck, Award } from "lucide-react";

const ServicesGallery = () => {
  const services = [
    {
      icon: Package,
      title: "Profesyonel E-ticaret Paketleme",
      description: "Her türlü ürün için güvenli ve estetik paketleme çözümleri"
    },
    {
      icon: Truck,
      title: "Kargo Hazır Paketleme",
      description: "Kargo sürecinde maksimum koruma sağlayan özel paketleme"
    },
    {
      icon: Zap,
      title: "Adet Bazlı Fiyatlandırma",
      description: "Boyut, ağırlık ve içerik fark etmeksizin sadece adet sayısına göre fiyatlandırma"
    },
    {
      icon: Award,
      title: "Kaliteli Malzeme Kullanımı",
      description: "Dayanıklı ve çevre dostu paketleme malzemeleri"
    },
    {
      icon: Clock,
      title: "Hızlı ve Güvenilir Hizmet",
      description: "24 saat içinde paketleme ve kargo hazırlık süreci"
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
            Profesyonel Paketleme Hizmetleri
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Her türlü e-ticaret ürününüz için <strong>boyut, ağırlık ve içerik fark etmeksizin</strong>
            adet bazlı şeffaf fiyatlandırma ile profesyonel paketleme hizmeti sunuyoruz.
            <strong>Daha fazla paket = daha düşük birim fiyat</strong>
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Adet Bazlı Fiyatlandırma</h3>
            <p className="text-muted-foreground text-sm">
              Boyut ve ağırlık fark etmeksizin, sadece adet sayısına göre fiyatlandırma.
              Sipariş hacmi arttıkça birim fiyat düşer.
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Hızlı Teslimat</h3>
            <p className="text-muted-foreground">
              24 saat içinde paketleme ve kargo hazırlık işlemleri
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Güvenli Koruma</h3>
            <p className="text-muted-foreground">
              Kaliteli malzemelerle maksimum güvenlik garantisi
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
              Şeffaf Fiyatlandırma ile Paketleme Hizmeti
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              İster 1 paket, ister 10.000 paket - her biri için aynı kalitede hizmet.
              Adet bazlı fiyatlandırma sayesinde sipariş hacminiz arttıkça birim fiyat düşer.
              Boyut, ağırlık ve içerik hiçbir zaman fiyatı etkilemez.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-base py-2 px-4">
                <Package className="h-4 w-4 mr-2" />
                Adet Bazlı Fiyat
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Clock className="h-4 w-4 mr-2" />
                24 Saat İşlem
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Shield className="h-4 w-4 mr-2" />
                Garantili Kalite
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;