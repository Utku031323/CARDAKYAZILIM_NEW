import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Star, Clock, Shield } from "lucide-react";
import paketleme1 from "@/assets/paketleme.jpg";
import paketleme2 from "@/assets/paketleme2.jpg";
import paketleme3 from "@/assets/paketleme3.jpg";
import paketleme4 from "@/assets/paketleme4.jpg";
import paketleme5 from "@/assets/paketleme5.jpg";

const ServicesGallery = () => {
  const images = [
    {
      src: paketleme1,
      title: "Profesyonel E-ticaret Paketleme",
      description: "Her türlü ürün için güvenli ve estetik paketleme çözümleri"
    },
    {
      src: paketleme2,
      title: "Kargo Hazır Paketleme",
      description: "Kargo sürecinde maksimum koruma sağlayan özel paketleme"
    },
    {
      src: paketleme3,
      title: "Çeşitli Ürün Kategorileri",
      description: "Boyut ve ağırlık fark etmeksizin sabit fiyat garantisi"
    },
    {
      src: paketleme4,
      title: "Kaliteli Malzeme Kullanımı",
      description: "Dayanıklı ve çevre dostu paketleme malzemeleri"
    },
    {
      src: paketleme5,
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
            sabit fiyat garantisi ile profesyonel paketleme hizmeti sunuyoruz.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Sabit Fiyat</h3>
            <p className="text-muted-foreground">
              Boyut, ağırlık, içerik fark etmez - her paket için aynı fiyat
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

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-white/90">{image.description}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{image.title}</h3>
                <p className="text-muted-foreground">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Paketleme Hizmetimizden Faydalanın
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              İster 1 paket, ister 1000 paket - her biri için aynı kalitede hizmet, 
              boyut ve içerik fark etmeksizin sabit fiyat garantisi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-base py-2 px-4">
                <Package className="h-4 w-4 mr-2" />
                Sabit Fiyat Garantisi
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Clock className="h-4 w-4 mr-2" />
                24 Saat Hızlı İşlem
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Shield className="h-4 w-4 mr-2" />
                %100 Güvenli Paketleme
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;