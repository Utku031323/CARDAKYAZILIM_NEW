import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/new_hero.jpg";

const Hero = () => {

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                E-Ticaret İşletmeleri İçin
                <span className="text-primary block">Fulfillment Çözümü</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Online mağazanızın siparişlerini paketleyin, depolayın ve gönderin.
                Shopify, n11, Hepsiburada ve Trendyol entegrasyonu ile tam otomasyonlu fulfillment hizmeti.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-green flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">Platform Entegrasyonu</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-green flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">24 Saat Fulfillment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-green flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">Ölçeklenebilir Çözüm</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto" asChild>
                <Link to="/basla">İşletmenizi Bağlayın</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto" asChild>
                <Link to="/teklif-al">Fiyat Teklifi Al</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <Card className="p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-foreground">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">İşletme Müşterisi</div>
              </Card>
              <Card className="p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-foreground">24</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Saat Fulfillment</div>
              </Card>
              <Card className="p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-foreground">4</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Platform Entegrasyonu</div>
              </Card>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="Chardak depolama ve paketleme tesisi - modern depo, paletler ve paketleme ekipmanları"
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating card */}
            <Card className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 p-3 sm:p-6 bg-card shadow-xl">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Bu Ay İşlenen</div>
                  <div className="text-sm sm:text-lg font-bold text-foreground">15,000+ Paket</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
