import { Package, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="iletisim" className="bg-packaging-brown text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8" />
              <h3 className="text-xl font-bold">Çardak Paketleme</h3>
            </div>
            <p className="text-white/80">
              E-ticaret paketleme hizmetlerinde sabit fiyat garantisi ile 
              güvenilir çözümler sunuyoruz.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Çardak Yazılım Ticaret Limited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+90 (XXX) XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@cardakpaketleme.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hizmetlerimiz</h4>
            <ul className="space-y-2 text-white/80">
              <li>E-ticaret Paketleme</li>
              <li>Kargo Hazırlık</li>
              <li>Depolama Hizmeti</li>
              <li>Özel Paketleme</li>
              <li>Kurumsal Çözümler</li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Fiyatlandırma</h4>
            <ul className="space-y-2 text-white/80">
              <li>0-100 sipariş: 30 TL</li>
              <li>101-250 sipariş: 24 TL</li>
              <li>251-500 sipariş: 22 TL</li>
              <li>751-1000 sipariş: 20 TL</li>
              <li>1000+ sipariş: 18 TL</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">İletişim</h4>
            <p className="text-white/80">
              Sorularınız için bizimle iletişime geçin. 
              24 saat içinde size dönüş yapacağız.
            </p>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">
                Teklif İste
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-packaging-brown">
                WhatsApp İletişim
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60">
              <p>© 2025 Çardak Yazılım Ticaret Limited. Tüm hakları saklıdır.</p>
            </div>
            <div className="text-white/80">
              <p>
                <strong>Mehmet Sacit Kula</strong> - Genel Müdür
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-white/60">
            <p className="text-sm">
              Yeni fiyatlandırma 16 Mayıs 2025 tarihinden itibaren geçerlidir. 
              Tüm fiyatlar KDV hariçtir.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;