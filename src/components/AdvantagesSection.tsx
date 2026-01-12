import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Weight, Ruler, Package2, Star, Clock, Shield } from "lucide-react";
import teamImage from "@/assets/chardak_2.jpg";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Weight,
      title: "Ölçeklenebilir Fiyatlandırma",
      description: "Sipariş hacminiz arttıkça birim fiyat düşer. Büyüyen işletmeler için ideal."
    },
    {
      icon: Ruler,
      title: "Şeffaf Maliyet Yapısı",
      description: "Tüm fiyatlar açık ve anlaşılır. Gizli maliyet yok, ne görürseniz onu ödersiniz."
    },
    {
      icon: Package2,
      title: "Çoklu Platform Desteği",
      description: "Shopify, n11, Hepsiburada, Trendyol - tüm platformlarınız entegre olur."
    },
    {
      icon: Star,
      title: "Profesyonel Paketleme",
      description: "Müşterilerinizin ürünleri premium kalite malzemelerle paketlenir."
    },
    {
      icon: Clock,
      title: "Hızlı Fulfillment",
      description: "Siparişler 24 saat içinde paketlenir ve kargoya teslim edilir."
    },
    {
      icon: Shield,
      title: "Güvenli Depolama",
      description: "Ürünleriniz profesyonel depolarda güvenli şekilde saklanır ve yönetilir."
    }
  ];

  return (
    <section id="avantajlar" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Neden Chardak'ı Seçin?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-ticaret işletmeleri için tasarlanmış, ölçeklenebilir fulfillment çözümü.
            Platform entegrasyonu, otomatik işlem ve şeffaf fiyatlandırma ile işinizi büyütün.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <advantage.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {advantage.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={teamImage}
              alt="Profesyonel paketleme ekibi"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Highlight section */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              🚀 E-Ticaret İşletmeleri İçin Tasarlandı
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg">
              Platform entegrasyonu, otomatik fulfillment ve ölçeklenebilir fiyatlandırma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">4+</div>
                <div className="text-primary-foreground/90">Platform Entegrasyonu</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24h</div>
                <div className="text-primary-foreground/90">Otomatik Fulfillment</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-primary-foreground/90">Ölçeklenebilir Çözüm</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvantagesSection;
