import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.jpg";
import GetStartedModal from "./GetStartedModal";
import PriceCalculatorModal from "./PriceCalculatorModal";
import { useState } from "react";

const Hero = () => {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [priceCalculatorOpen, setPriceCalculatorOpen] = useState(false);

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                E-Ticaret
                <span className="text-primary block">Paketleme Hizmeti</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Boyut, ağırlık ve içerik fark etmeksizin sabit fiyat garantisiyle 
                profesyonel paketleme hizmeti. Siparişlerinizi güvenle teslim edelim.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-foreground">Sabit Fiyat Garantisi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-foreground">24 Saat Hızlı Ödeme</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-foreground">Profesyonel Paketleme</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" onClick={() => setGetStartedOpen(true)}>
                Hemen Başla
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => setPriceCalculatorOpen(true)}>
                Fiyat Hesapla
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Aylık Paket</div>
              </Card>
              <Card className="p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">Saat İçinde</div>
              </Card>
              <Card className="p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">%99.9</div>
                <div className="text-sm text-muted-foreground">Güvenilirlik</div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="Profesyonel paketleme tesisi"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 p-6 bg-card shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Bu Ay</div>
                  <div className="text-lg font-bold text-foreground">2,847 Paket</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <GetStartedModal open={getStartedOpen} onOpenChange={setGetStartedOpen} />
      <PriceCalculatorModal open={priceCalculatorOpen} onOpenChange={setPriceCalculatorOpen} />
    </section>
  );
};

export default Hero;