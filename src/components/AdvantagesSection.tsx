import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Weight, Ruler, Package2, Star, Clock, Shield } from "lucide-react";
import teamImage from "@/assets/team-service.jpg";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Weight,
      title: "Ağırlık Sınırı Yok",
      description: "Paketinizin ağırlığı fiyatı etkilemez. İster 100g ister 10kg olsun, aynı fiyat."
    },
    {
      icon: Ruler,
      title: "Boyut Farketmez",
      description: "Küçük kutu veya büyük paket fark etmez. Sabit fiyat garantisi ile hizmet veriyoruz."
    },
    {
      icon: Package2,
      title: "İçerik Bağımsız",
      description: "Ne paketlediğiniz önemli değil. Elektronik, giyim, kitap - hepsi aynı fiyat."
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
            Sektördeki tek sabit fiyat garantili paketleme hizmeti. 
            Boyut, ağırlık ve içerik hiçbir şekilde fiyatınızı etkilemez.
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
              🎯 Neden Çardak Paketleme?
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg">
              Sektörde tek olan sabit fiyat modelimiz ile işinizi kolaylaştırıyoruz
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