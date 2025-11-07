import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="iletisim" className="bg-packaging-brown text-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/chardak-logo.svg" alt="Chardak Logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold">Chardak</h3>
            </div>
            <p className="text-white/80">
              Adet başı şeffaf fiyatlandırma ile e-ticaret paketleme ve depolama
              hizmetleri sunuyoruz.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Ahi Evran Mahallesi 225. Cd. Sehaş Arena C Blok No:74 Sincan/Ankara</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+90 554 021 44 56</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">chardakstorage@gmail.com</span>
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

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">İletişim</h4>
            <p className="text-white/80">
              Sorularınız için bizimle iletişime geçin. 
              24 saat içinde size dönüş yapacağız.
            </p>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full text-sm sm:text-base">
                Teklif İste
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-center md:text-left">
              <p className="text-sm">© 2025 Chardak Storage & Fulfilment Solutions. Tüm hakları saklıdır.</p>
            </div>
            <div className="text-white/80 text-center md:text-right">
              <p className="text-sm">
                <strong>Batuhan Çelik</strong> - Genel Müdür
              </p>
            </div>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;