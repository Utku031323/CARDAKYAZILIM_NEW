import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Package, 
  Truck, 
  CreditCard, 
  Users, 
  Clock,
  Shield,
  Phone,
  Mail,
  FileText,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Basla = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    {
      id: 1,
      title: "Bilgi Toplama",
      description: "İşletmeniz hakkında temel bilgileri topluyoruz",
      icon: FileText,
      completed: currentStep > 1,
    },
    {
      id: 2,
      title: "Hizmet Seçimi",
      description: "Size uygun paketleme hizmetini belirliyoruz",
      icon: Package,
      completed: currentStep > 2,
    },
    {
      id: 3,
      title: "Entegrasyon",
      description: "Sistemlerinizle entegrasyonu kuruyoruz",
      icon: Settings,
      completed: currentStep > 3,
    },
    {
      id: 4,
      title: "Başlangıç",
      description: "Hizmetiniz aktif hale geliyor",
      icon: CheckCircle,
      completed: currentStep > 4,
    },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm sm:text-base">Ana Sayfaya Dön</span>
              </Link>
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Hemen Başlayın
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Paketleme hizmetimizi kullanmaya başlamak için sadece birkaç adım kaldı.
              Size özel onboarding sürecimizle hızlıca başlayabilirsiniz.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Adım {currentStep} / {totalSteps}
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                %{Math.round(progressPercentage)} tamamlandı
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Steps Overview */}
          <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card 
                    key={step.id} 
                    className={`relative transition-all duration-300 ${
                      step.id === currentStep 
                        ? 'border-primary shadow-lg scale-105' 
                        : step.completed 
                        ? 'border-success-green bg-success-green/5' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="text-center pb-2 p-3 sm:p-6">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        step.completed
                          ? 'bg-success-green text-white'
                          : step.id === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                      </div>
                      <CardTitle className="text-xs sm:text-sm">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                      <CardDescription className="text-xs text-center hidden sm:block">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                    {step.completed && (
                      <Badge className="absolute -top-2 -right-2 bg-success-green">
                        <CheckCircle className="h-3 w-3" />
                      </Badge>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="max-w-4xl mx-auto">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Bilgi Toplama</span>
                  </CardTitle>
                  <CardDescription>
                    İşletmeniz ve ihtiyaçlarınız hakkında bilgi topluyoruz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Neler Yapacağız?</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          <span className="text-sm">Şirket bilgilerinizi alacağız</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          <span className="text-sm">Ürün türlerinizi belirleyeceğiz</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          <span className="text-sm">Sipariş hacminizi değerlendireceğiz</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success-green" />
                          <span className="text-sm">Özel gereksinimlerinizi not alacağız</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Gerekli Belgeler</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">Vergi levhası</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">İmza sirküleri</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">E-ticaret platform bilgileri</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      <strong>💡 İpucu:</strong> Tüm bilgileriniz güvenli bir şekilde saklanır ve 
                      sadece hizmet kalitesini artırmak için kullanılır.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span>Hizmet Seçimi</span>
                  </CardTitle>
                  <CardDescription>
                    Size en uygun paketleme hizmetini belirliyoruz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-primary/20">
                      <CardHeader className="text-center">
                        <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                        <CardTitle className="text-lg">Standart Paketleme</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Güvenli ambalajlama</li>
                          <li>• Hızlı işlem süresi</li>
                          <li>• Sabit fiyat garantisi</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                      <CardHeader className="text-center">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <CardTitle className="text-lg">Premium Paketleme</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Özel koruma malzemeleri</li>
                          <li>• Kırılabilir ürün desteği</li>
                          <li>• Öncelikli işlem</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                      <CardHeader className="text-center">
                        <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                        <CardTitle className="text-lg">Özel Çözümler</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Markanıza özel ambalaj</li>
                          <li>• Özel boyut ve şekiller</li>
                          <li>• Kurumsal anlaşmalar</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Sistem Entegrasyonu</span>
                  </CardTitle>
                  <CardDescription>
                    E-ticaret platformunuzla entegrasyonu kuruyoruz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Desteklenen Platformlar</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {["Shopify", "WooCommerce", "Magento", "OpenCart", "PrestaShop", "Ticimax", "İdeasoft", "Diğer"].map((platform) => (
                          <div key={platform} className="flex items-center space-x-2 p-2 border rounded">
                            <CheckCircle className="h-4 w-4 text-success-green" />
                            <span className="text-sm">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Entegrasyon Süreci</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">1</div>
                          <span className="text-sm">API bağlantısı kurulumu</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">2</div>
                          <span className="text-sm">Sipariş senkronizasyonu</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">3</div>
                          <span className="text-sm">Test siparişleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">4</div>
                          <span className="text-sm">Canlı yayına alma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success-green" />
                    <span>Hizmetiniz Hazır!</span>
                  </CardTitle>
                  <CardDescription>
                    Paketleme hizmetiniz aktif ve kullanıma hazır
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-success-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Tebrikler! Kurulum Tamamlandı
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Artık siparişlerinizi güvenle paketleyebilir ve müşterilerinize ulaştırabilirsiniz.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Phone className="h-5 w-5 text-primary" />
                          <span>Destek Ekibimiz</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          7/24 müşteri desteği için bizimle iletişime geçin:
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm">+90 (XXX) XXX XX XX</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm">destek@cardakpaketleme.com</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>Sonraki Adımlar</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success-green" />
                            <span>İlk siparişinizi gönderin</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success-green" />
                            <span>Paketleme sürecini takip edin</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success-green" />
                            <span>Aylık raporlarınızı inceleyin</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Önceki</span>
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Sonraki</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/teklif-al">Teklif Al</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/">Ana Sayfa</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Basla;
