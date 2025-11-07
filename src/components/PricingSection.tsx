import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Package, Zap, Truck, Gift } from "lucide-react";
import { useState } from "react";

const PricingSection = () => {
  // Fiyat Hesaplama State
  const [selectedPackage, setSelectedPackage] = useState("");
  const [packageCount, setPackageCount] = useState("");
  const [paletCount, setPaletCount] = useState("");
  // Ürün kategorileri
  const productCategories = [
    {
      id: 1,
      name: "Balonlu Poşet",
      price: "",
      description: "Hafif ürünler için ideal",
      features: ["Hava yastıklı koruma", "Sabit fiyat", "Hızlı işlem", "7/24 destek"],
      icon: Package,
      quantityPricing: [
        { range: "0-300", price: "48" },
        { range: "301-500", price: "40" },
        { range: "501-1000", price: "38" },
        { range: "1001-1500", price: "36" },
        { range: "1501-2000", price: "34" },
        { range: "2001-2500", price: "32" },
        { range: "2501-3000", price: "30" },
        { range: "3000+", price: "28" }
      ],
      storagePricing: [
        { range: "1-5 palet", price: "1500" },
        { range: "6-10 palet", price: "1500" },
        { range: "11-20 palet", price: "1500" },
        { range: "21+ palet", price: "1500" }
      ]
    },
    {
      id: 2,
      name: "1 Desi Kutu",
      price: "",
      description: "Küçük ürünler için",
      features: ["Standart koruma", "Sabit fiyat", "Hızlı işlem", "7/24 destek"],
      icon: Package,
      quantityPricing: [
        { range: "0-300", price: "50" },
        { range: "301-500", price: "46" },
        { range: "501-1000", price: "44" },
        { range: "1001-1500", price: "42" },
        { range: "1501-2000", price: "40" },
        { range: "2001-2500", price: "38" },
        { range: "2501-3000", price: "36" },
        { range: "3000+", price: "34" }
      ],
      storagePricing: [
        { range: "1-5 palet", price: "1500" },
        { range: "6-10 palet", price: "9000" },
        { range: "11-20 palet", price: "16500" },
        { range: "21+ palet", price: "31500" }
      ]
    },
    {
      id: 3,
      name: "2 Desi Kutu",
      price: "",
      description: "Orta boy ürünler için",
      features: ["Güçlü koruma", "Sabit fiyat", "Hızlı işlem", "7/24 destek"],
      icon: Package,
      popular: true,
      quantityPricing: [
        { range: "0-300", price: "54" },
        { range: "301-500", price: "50" },
        { range: "501-1000", price: "48" },
        { range: "1001-1500", price: "46" },
        { range: "1501-2000", price: "44" },
        { range: "2001-2500", price: "42" },
        { range: "2501-3000", price: "40" },
        { range: "3000+", price: "38" }
      ],
      storagePricing: [
        { range: "1-5 palet", price: "1500" },
        { range: "6-10 palet", price: "9000" },
        { range: "11-20 palet", price: "16500" },
        { range: "21+ palet", price: "31500" }
      ]
    },
    {
      id: 4,
      name: "3 Desi Kutu",
      price: "",
      description: "Büyük ürünler için",
      features: ["Maksimum koruma", "Sabit fiyat", "Hızlı işlem", "7/24 destek"],
      icon: Package,
      quantityPricing: [
        { range: "0-300", price: "60" },
        { range: "301-500", price: "54" },
        { range: "501-1000", price: "52" },
        { range: "1001-1500", price: "50" },
        { range: "1501-2000", price: "48" },
        { range: "2001-2500", price: "46" },
        { range: "2501-3000", price: "44" },
        { range: "3000+", price: "42" }
      ]
    }
  ];

  // Ekstra hizmetler
  const extraServices = [
    {
      id: 1,
      name: "Ürün Kalite Kontrolü",
      price: "1",
      description: "Her ürünün kalitesini kontrol ederek, hasarlı veya uygunsuz ürünleri ayıklama ve sevkiyata hazır hale getirme hizmeti.",
      icon: CheckCircle
    },
    {
      id: 2,
      name: "Tester Ürün / Teşekkür Kartı",
      price: "1.5",
      description: "Paketlere tester ürün veya teşekkür kartı gibi ek materyallerin eklenmesi ve profesyonel sunumunun sağlanması hizmeti.",
      icon: Gift
    },
    {
      id: 3,
      name: "Etiketleme",
      price: "10",
      description: "Ürünlere barkod, fiyat etiketi veya özel tasarım etiketlerin hassas bir şekilde uygulanması ve kontrol edilmesi hizmeti.",
      icon: Zap
    },
    {
      id: 4,
      name: "Yeniden Paketleme",
      price: "5",
      description: "Hasarlı veya uygunsuz ambalajlı ürünlerin, uygun malzeme ve standartlara göre yeniden paketlenmesi ve sevkiyata hazırlanması hizmeti.",
      icon: Package
    },
    {
      id: 5,
      name: "Streçleme, Shrink Paketleme ve Ambalajlama",
      price: "4",
      description: "Ürünlerin streçleme, shrink paketleme ve ambalajlama işlemleri ile ekstra koruma sağlanması ve profesyonel görünüm kazandırılması hizmeti.",
      icon: Truck
    }
  ];

  // Fiyat Hesaplama Fonksiyonları
  const calculatePrice = () => {
    if (!selectedPackage || !packageCount || packageCount < 1) {
      return null;
    }

    const selected = productCategories.find(p => p.name === selectedPackage);
    if (!selected || !selected.quantityPricing) {
      return null;
    }

    const count = parseInt(packageCount);
    const palets = parseInt(paletCount) || 0;

    // Doğru fiyat tier'ını bul
    let unitPrice = 0;
    for (const tier of selected.quantityPricing) {
      const range = tier.range;
      if (range === "3000+") {
        if (count >= 3000) {
          unitPrice = parseInt(tier.price);
          break;
        }
      } else {
        const [min, max] = range.split("-").map(Number);
        if (count >= min && count <= max) {
          unitPrice = parseInt(tier.price);
          break;
        }
      }
    }

    if (unitPrice === 0) {
      return null;
    }

    const packageCost = count * unitPrice;
    const storageCost = palets * 1500;
    const subtotal = packageCost + storageCost;
    const kdv = subtotal * 0.2;
    const total = subtotal + kdv;

    return {
      packageCost,
      storageCost,
      subtotal,
      kdv,
      total,
      unitPrice
    };
  };

  const result = calculatePrice();

  return (
    <section id="fiyatlar" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Şeffaf Fiyatlandırma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ürün türlerine göre sabit birim fiyatlar.
            Her paket için aynı kalitede hizmet ve güvenli koruma garantisi.
          </p>
        </div>

        {/* Palet Nedir? Bilgilendirme Kartı */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2 text-blue-900">
              <span>📦</span>
              <span>Palet Nedir?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base text-blue-800 leading-relaxed">
              Palet, dış ambalajın en önemli parçası olup, paketlenmiş ürünlerin forklift ya da transpalet aracılığı ile kolaylıkla taşınabilmesi için ahşap, plastik, metal veya bunların bileşiminden hazırlanmış malzemelerdir.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-4">Standart Palet Boyutları</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                    <span className="text-sm text-blue-800">En:</span>
                    <span className="font-semibold text-blue-900">80 cm</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                    <span className="text-sm text-blue-800">Boy:</span>
                    <span className="font-semibold text-blue-900">120 cm</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                    <span className="text-sm text-blue-800">Yükseklik:</span>
                    <span className="font-semibold text-blue-900">180 cm</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 bg-blue-50 px-2 py-2 rounded">
                    <span className="text-sm font-semibold text-blue-900">Hacim (Desi):</span>
                    <span className="font-bold text-lg text-blue-900">576</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100 flex items-center justify-center">
                <img
                  src="/palet-nedir.jpg"
                  alt="Palet Nedir - Standart Palet Görseli"
                  className="w-full h-auto rounded-lg object-cover max-h-64"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="text-center hidden">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-sm text-blue-800">
                    Paletler, ürünlerinizin güvenli ve verimli bir şekilde taşınmasını sağlar.
                  </p>
                </div>
              </div>
            </div>

            {/* Depolama Ücreti Uyarısı */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900 mb-3">⚠️ Depolama Ücreti Hesaplama</h4>
                  <div className="text-sm text-amber-800 space-y-3">
                    <p>
                      Aynı takvim ayı içerisinde depoya giren ürünlerin toplam palet miktarı üzerinden, ay sonu itibarıyla çıkışı yapılan siparişlere ait palet sayısı düşülerek kalan palet miktarı tespit edilir.
                    </p>
                    <p>
                      Ay sonunda depoda kalan net palet adedi üzerinden aylık depolama ücreti hesaplanır.
                    </p>
                    <p>
                      Aynı takvim ayı içerisinde depoya giren tüm ürünlerin satışı gerçekleşmiş ve ay sonunda stokta ürün kalmamış ise, ilgili ay için depolama ücreti alınmaz.
                    </p>
                    <div className="bg-white rounded p-3 mt-3 border border-amber-100">
                      <p className="font-semibold text-amber-900 mb-2">Örnek:</p>
                      <p>
                        Ayın 1'inde 10 palet ürün depoya alınmış, ay içinde 5 palet sevk edilmişse, ay sonu itibarıyla 5 palet üzerinden depolama ücreti tahakkuk ettirilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ürün Kategorileri */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Ürün Kategorileri</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`relative transition-all duration-300 hover:shadow-lg ${
                    category.popular ? 'border-primary shadow-lg md:scale-105' : ''
                  }`}
                >
                  {category.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      En Popüler
                    </Badge>
                  )}

                  <CardHeader className="text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mt-2">
                      {category.price} <span className="text-base text-muted-foreground">TL</span>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success-green flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Fiyatlandırma Detayları */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="font-semibold text-foreground mb-3 text-sm">Fiyatlandırma Detayları</h5>

                      {/* Tablo 1: Çıkış Ürün Adeti Baremi */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Çıkış Ürün Adeti Baremi</p>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-2 py-2 text-left font-semibold text-gray-700">Ürün Adeti</th>
                                <th className="px-2 py-2 text-right font-semibold text-gray-700">Birim Fiyat</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.quantityPricing ? (
                                category.quantityPricing.map((item, idx) => (
                                  <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">{item.range}</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">{item.price} TL</td>
                                  </tr>
                                ))
                              ) : (
                                <>
                                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">0-100 adet</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">XX TL</td>
                                  </tr>
                                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">101-250 adet</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">XX TL</td>
                                  </tr>
                                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">251-500 adet</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">XX TL</td>
                                  </tr>
                                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">501-1000 adet</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">XX TL</td>
                                  </tr>
                                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-2 py-2 text-gray-700">1000+ adet</td>
                                    <td className="px-2 py-2 text-right font-semibold text-gray-900">XX TL</td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Paket Depolama Ücreti - Sabit Metin */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Paket Depolama Ücreti</p>
                        <p className="text-sm text-blue-800 font-medium">
                          💰 Palet ücreti sabit <span className="font-bold text-blue-900">1500 TL</span>'dir
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Fiyat Hesaplama Bölümü */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <CardTitle className="text-2xl text-center">💰 Fiyat Hesaplama</CardTitle>
                <CardDescription className="text-center mt-2">
                  Paket türü, sayısı ve palet adedine göre toplam maliyeti hesaplayın
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Paket Çeşidi Seçimi */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      📦 Paket Çeşidi
                    </label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                      <option value="">Paket türünü seçin</option>
                      {productCategories.map((pkg) => (
                        <option key={pkg.id} value={pkg.name}>
                          {pkg.name} - {pkg.price} TL
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Paket Sayısı */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      📊 Paket Sayısı (Adet)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={packageCount}
                      onChange={(e) => setPackageCount(e.target.value)}
                      placeholder="Paket sayısını girin"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Palet Sayısı */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      🏢 Tahmini Palet Sayısı
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={paletCount}
                      onChange={(e) => setPaletCount(e.target.value)}
                      placeholder="Palet sayısını girin"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Hesaplama Sonuçları */}
                  {result ? (
                    <div className="mt-8 pt-6 border-t-2 border-gray-200">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">📦 Paket Ücreti:</span>
                          <span className="text-lg font-bold text-gray-900">
                            {result.packageCost.toLocaleString("tr-TR")} TL
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">🏢 Depolama Ücreti:</span>
                          <span className="text-lg font-bold text-gray-900">
                            {result.storageCost.toLocaleString("tr-TR")} TL
                          </span>
                        </div>

                        <div className="border-t border-green-300 pt-3 flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">➖ Ara Toplam:</span>
                          <span className="text-lg font-bold text-gray-900">
                            {result.subtotal.toLocaleString("tr-TR")} TL
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">📊 KDV (%20):</span>
                          <span className="text-lg font-bold text-gray-900">
                            {result.kdv.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL
                          </span>
                        </div>

                        <div className="bg-green-100 border-t-2 border-green-400 pt-3 mt-3 flex justify-between items-center rounded p-3">
                          <span className="text-base font-bold text-green-900">✅ Genel Toplam:</span>
                          <span className="text-2xl font-bold text-green-900">
                            {result.total.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 pt-6 border-t-2 border-gray-200">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-gray-600 font-medium">
                          Hesaplama yapmak için lütfen paket türü ve sayısını seçin
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ekstra Hizmetler */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Ekstra Hizmetler</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">
                      {service.price} <span className="text-base text-muted-foreground">TL / adet</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment terms */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💳</span>
              <span>Ödeme Planı</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Faturalama Dönemi</h4>
                <p className="text-muted-foreground">
                  Her ayın 15'inden bir sonraki ayın 15'ine kadar olan siparişler bir arada faturalanır.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Ödeme Süreci</h4>
                <p className="text-muted-foreground">
                  Fatura her ayın 16'sında ödeme linki ile birlikte gönderilir. 
                  Ödeme süresi 24 saattir.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>⚠ Önemli:</strong> Belirtilen süre içinde ödeme yapılmadığı takdirde, 
                paketleme hizmeti geçici olarak durdurulacaktır.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
