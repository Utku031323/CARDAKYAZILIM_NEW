import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Weight, Ruler, Package2, Star, Clock, Shield } from "lucide-react";
import teamImage from "@/assets/team-service.jpg";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Weight,
      title: "Adet Başı Fiyatlandırma",
      description: "Paket sayısına göre dinamik fiyatlandırma. Daha fazla paket = daha düşük birim fiyat."
    },
    {
      icon: Ruler,
      title: "Şeffaf Hesaplama",
      description: "Tüm fiyatlar açık ve anlaşılır. Gizli maliyet yok, ne görürseniz onu ödersiniz."
    },
    {
      icon: Package2,
      title: "Esnek Paket Türleri",
      description: "Balonlu Poşet, 1-3 Desi Kutu - ihtiyacınıza uygun paket seçenekleri."
    },
    {
      icon: Star,
      title: "Kaliteli Malzeme",
      description: "Tüm paketlemelerimizde premium kalite malzemeler kullanıyoruz."
    },
    {
      icon: Clock,
      title: "Hızlı İşlem",
      description: "Siparişleriniz aynı gün içinde paketlenir ve kargoya teslim edilir."
    },
    {
      icon: Shield,
      title: "Güvenli Paketleme",
      description: "Ürünleriniz hasarsız ulaşsın diye özel paketleme teknikleri kullanıyoruz."
    }
  ];

  return (
    <section id="avantajlar" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Bizim Farkımız
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Adet başı şeffaf fiyatlandırma ile işletmenizin bütçesini kontrol edin.
            Dinamik fiyat hesaplama ve profesyonel paketleme hizmeti.
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
              🎯 Neden Chardak?
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg">
              Şeffaf fiyatlandırma ve dinamik hesaplama ile işinizi kolaylaştırıyoruz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-primary-foreground/90">Şeffaf Fiyatlandırma</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-primary-foreground/90">Gizli Maliyet</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-primary-foreground/90">Müşteri Desteği</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvantagesSection;