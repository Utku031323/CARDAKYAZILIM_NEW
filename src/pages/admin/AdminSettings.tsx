import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Bell,
  Settings as SettingsIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";

// Mock data (kept for reference)
const MOCK_SETTINGS: any = {
  id: "1",
  companyPhone: "+90 (212) 555 1234",
  companyEmail: "info@cardakpaketleme.com",
  supportEmail: "destek@cardakpaketleme.com",
  address: "İstanbul, Türkiye",
  socialMedia: {
    facebook: "https://facebook.com/cardakpaketleme",
    twitter: "https://twitter.com/cardakpaketleme",
    instagram: "https://instagram.com/cardakpaketleme",
    linkedin: "https://linkedin.com/company/cardakpaketleme",
  },
  heroTitle: "Paketleme Hizmetlerinde Yeni Standart",
  heroSubtitle: "Güvenli, hızlı ve uygun fiyatlı paketleme çözümleri",
  aboutText: "Çardak Paketleme, 2020 yılından beri e-ticaret işletmelerine profesyonel paketleme hizmetleri sunmaktadır.",
  serviceDescription: "Standart paketlemeden özel çözümlere kadar geniş hizmet yelpazesi",
  footerText: "© 2025 Çardak Paketleme. Tüm hakları saklıdır.",
  businessHoursStart: "09:00",
  businessHoursEnd: "18:00",
  businessDays: "Pazartesi - Cuma",
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  weeklyReports: true,
  maintenanceMode: false,
  createdAt: new Date("2024-12-01"),
  updatedAt: new Date("2025-01-15"),
};

const AdminSettings = () => {
  const { toast } = useToast();
  const { data: settingsData, isLoading, error } = useSettings();
  const updateSettingMutation = useUpdateSetting();

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (key: string, value: any) => {
    setIsSaving(true);
    try {
      await updateSettingMutation.mutateAsync({ key, value });
      toast({
        title: "Başarılı",
        description: "Ayar kaydedildi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Ayar kaydedilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
        <p className="text-slate-600 mt-1">
          Şirket bilgileri, web sitesi içeriği ve sistem ayarlarını yönetin
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Ayarlar yüklenirken hata oluştu</AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Ayarlar kaydedilirken bir hata oluştu
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">İletişim</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">İçerik</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Genel</span>
          </TabsTrigger>
        </TabsList>

        {/* Contact Information Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                İletişim Bilgileri
              </CardTitle>
              <CardDescription>
                Şirket iletişim bilgilerini güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone */}
              <div>
                <Label htmlFor="phone">Şirket Telefonu</Label>
                <Input
                  id="phone"
                  value={settings.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                  placeholder="+90 (212) 555 1234"
                  className="mt-2"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Şirket E-postası</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                  placeholder="info@cardakpaketleme.com"
                  className="mt-2"
                />
              </div>

              {/* Support Email */}
              <div>
                <Label htmlFor="support-email">Destek E-postası</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                  placeholder="destek@cardakpaketleme.com"
                  className="mt-2"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Şirket adresi"
                  className="mt-2"
                />
              </div>

              <Separator />

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Sosyal Medya Bağlantıları</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                      placeholder="https://twitter.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/company/..."
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Web Sitesi İçeriği
              </CardTitle>
              <CardDescription>
                Ana sayfa ve web sitesi içeriğini yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Ana Sayfa Başlığı</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Başlık</Label>
                    <Input
                      id="hero-title"
                      value={settings.heroTitle}
                      onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                      placeholder="Paketleme Hizmetlerinde Yeni Standart"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                    <Input
                      id="hero-subtitle"
                      value={settings.heroSubtitle}
                      onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                      placeholder="Güvenli, hızlı ve uygun fiyatlı paketleme çözümleri"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* About Section */}
              <div>
                <Label htmlFor="about">Hakkımızda Metni</Label>
                <Textarea
                  id="about"
                  value={settings.aboutText}
                  onChange={(e) => handleInputChange("aboutText", e.target.value)}
                  placeholder="Şirket hakkında bilgi"
                  className="mt-2 min-h-24"
                />
              </div>

              {/* Service Description */}
              <div>
                <Label htmlFor="service">Hizmet Açıklaması</Label>
                <Textarea
                  id="service"
                  value={settings.serviceDescription}
                  onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                  placeholder="Hizmetlerimiz hakkında açıklama"
                  className="mt-2 min-h-24"
                />
              </div>

              {/* Footer */}
              <div>
                <Label htmlFor="footer">Footer Metni</Label>
                <Input
                  id="footer"
                  value={settings.footerText}
                  onChange={(e) => handleInputChange("footerText", e.target.value)}
                  placeholder="© 2025 Çardak Paketleme. Tüm hakları saklıdır."
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Genel Ayarlar
              </CardTitle>
              <CardDescription>
                İş saatleri, bildirimler ve sistem ayarlarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Hours */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">İş Saatleri</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-days">İş Günleri</Label>
                    <Input
                      id="business-days"
                      value={settings.businessDays}
                      onChange={(e) => handleInputChange("businessDays", e.target.value)}
                      placeholder="Pazartesi - Cuma"
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Başlangıç Saati</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={settings.businessHoursStart}
                        onChange={(e) => handleInputChange("businessHoursStart", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">Bitiş Saati</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={settings.businessHoursEnd}
                        onChange={(e) => handleInputChange("businessHoursEnd", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notifications */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Bildirim Tercihleri</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">E-posta Bildirimleri</Label>
                      <p className="text-sm text-slate-500">Önemli olaylar için e-posta alın</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">SMS Bildirimleri</Label>
                      <p className="text-sm text-slate-500">Acil durumlar için SMS alın</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("smsNotifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Push Bildirimleri</Label>
                      <p className="text-sm text-slate-500">Tarayıcı push bildirimleri alın</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("pushNotifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Haftalık Raporlar</Label>
                      <p className="text-sm text-slate-500">Haftalık özet raporları alın</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) =>
                        handleInputChange("weeklyReports", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* System Settings */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Sistem Ayarları</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Bakım Modu</Label>
                    <p className="text-sm text-slate-500">Sistem bakımı sırasında etkinleştirin</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleInputChange("maintenanceMode", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            "Tüm Ayarları Kaydet"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;

