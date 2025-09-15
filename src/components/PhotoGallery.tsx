import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Eye, Download } from "lucide-react";
import { useState } from "react";
import paketleme1 from "@/assets/paketleme.jpg";
import paketleme2 from "@/assets/paketleme2.jpg";
import paketleme3 from "@/assets/paketleme3.jpg";
import paketleme4 from "@/assets/paketleme4.jpg";
import paketleme5 from "@/assets/paketleme5.jpg";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    {
      src: paketleme1,
      title: "E-ticaret Paketleme Örnekleri",
      category: "Genel Paketleme"
    },
    {
      src: paketleme2,
      title: "Kargo Hazır Paketler",
      category: "Kargo Paketleme"
    },
    {
      src: paketleme3,
      title: "Çeşitli Ürün Kategorileri",
      category: "Ürün Çeşitliliği"
    },
    {
      src: paketleme4,
      title: "Kaliteli Malzeme Kullanımı",
      category: "Malzeme Kalitesi"
    },
    {
      src: paketleme5,
      title: "Profesyonel Paketleme",
      category: "Profesyonel Hizmet"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Camera className="h-4 w-4 mr-2" />
            Fotoğraf Galerisi
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            İşlerimizden Örnekler
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Paketleme hizmetlerimizden örnekleri inceleyerek kalitemizi görebilirsiniz. 
            Her türlü ürün için profesyonel paketleme çözümlerimizi keşfedin.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {photos.map((photo, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => setSelectedImage(photo.src)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => setSelectedImage(photo.src)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Büyült
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                  {photo.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Profesyonel paketleme hizmetimizin kalitesini gösteren örnek çalışma
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-primary/5 border-primary/20 inline-block">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Daha Fazla Örnek İçin
            </h3>
            <p className="text-muted-foreground mb-4">
              Paketleme çalışmalarımızın daha fazla örneğini görmek ister misiniz?
            </p>
            <Button className="mr-4">
              İletişime Geç
            </Button>
            <Button variant="outline">
              Teklif İste
            </Button>
          </Card>
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Büyütülmüş görsel"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;