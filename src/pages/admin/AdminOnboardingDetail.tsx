import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OnboardingSubmission } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  Package,
  Settings,
  Zap,
  Mail,
} from "lucide-react";

// Mock data - same as AdminOnboarding
const MOCK_ONBOARDING: OnboardingSubmission[] = [
  {
    id: "1",
    companyName: "TechStart Yazılım",
    contactName: "Emre Kaya",
    email: "emre@techstart.com",
    phone: "0532 111 2222",
    currentStep: 5,
    totalSteps: 5,
    status: "completed",
    completionPercentage: 100,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-15"),
    step1Data: { companyInfo: "Yazılım geliştirme şirketi", productTypes: ["Elektronik"] },
    step2Data: { selectedService: "Premium Paketleme" },
    step3Data: { platform: "Shopify", apiConnected: true },
    step4Data: { testOrdersCompleted: true },
    step5Data: { liveDate: "2025-01-15" },
  },
  {
    id: "2",
    companyName: "Fashion Hub",
    contactName: "Ayşe Demir",
    email: "ayse@fashionhub.com",
    phone: "0533 222 3333",
    currentStep: 4,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 80,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-14"),
    step1Data: { companyInfo: "Moda ve giyim e-ticaret", productTypes: ["Giyim & Aksesuar"] },
    step2Data: { selectedService: "Standart Paketleme" },
    step3Data: { platform: "WooCommerce", apiConnected: true },
    step4Data: { testOrdersCompleted: true },
  },
  {
    id: "3",
    companyName: "Elektronik Dünyası",
    contactName: "Mehmet Yıldız",
    email: "mehmet@elektronikdunyasi.com",
    phone: "0534 333 4444",
    currentStep: 3,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 60,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-13"),
    step1Data: { companyInfo: "Elektronik ürünler satışı", productTypes: ["Elektronik"] },
    step2Data: { selectedService: "Premium Paketleme" },
    step3Data: { platform: "Magento", apiConnected: false },
  },
];

const STEP_ICONS = [FileText, Package, Settings, Zap, CheckCircle];
const STEP_TITLES = [
  "Bilgi Toplama",
  "Hizmet Seçimi",
  "Sistem Entegrasyonu",
  "Test & Doğrulama",
  "Başlangıç",
];

const AdminOnboardingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Find submission
  const submission = MOCK_ONBOARDING.find((s) => s.id === id);

  const [status, setStatus] = useState(submission?.status || "in-progress");
  const [notes, setNotes] = useState("");

  if (!submission) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/onboarding")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Onboarding başvurusu bulunamadı</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    alert("Değişiklikler kaydedildi");
  };

  const handleMarkComplete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("completed");
    setIsLoading(false);
    alert("Onboarding tamamlandı olarak işaretlendi");
  };

  const handleSendReminder = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    alert("Hatırlatma e-postası gönderildi");
  };

  const handleArchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    alert("Başvuru arşivlendi");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR");
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      "in-progress": { label: "Devam Ediyor", variant: "secondary" },
      completed: { label: "Tamamlandı", variant: "default" },
      abandoned: { label: "Terk Edildi", variant: "destructive" },
    };
    const mapping = statusMap[status] || { label: status, variant: "secondary" };
    return <Badge variant={mapping.variant}>{mapping.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/admin/onboarding")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {submission.companyName}
            </h1>
            <p className="text-slate-600 mt-1">Onboarding Başvurusu Detayı</p>
          </div>
        </div>
        <div>{getStatusBadge(status)}</div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Şirket Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-600">Şirket Adı</Label>
                  <p className="text-lg font-medium mt-1">{submission.companyName}</p>
                </div>
                <div>
                  <Label className="text-slate-600">İletişim Kişisi</Label>
                  <p className="text-lg font-medium mt-1">{submission.contactName}</p>
                </div>
                <div>
                  <Label className="text-slate-600">E-posta</Label>
                  <p className="text-lg font-medium mt-1">{submission.email}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Telefon</Label>
                  <p className="text-lg font-medium mt-1">{submission.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Onboarding İlerlemesi</CardTitle>
              <CardDescription>
                Adım {submission.currentStep} / {submission.totalSteps}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Genel İlerleme</span>
                  <span className="text-sm font-medium">%{submission.completionPercentage}</span>
                </div>
                <Progress value={submission.completionPercentage} className="h-3" />
              </div>

              {/* Step-by-step progress */}
              <div className="space-y-4">
                {STEP_TITLES.map((title, index) => {
                  const stepNum = index + 1;
                  const isCompleted = stepNum < submission.currentStep;
                  const isCurrent = stepNum === submission.currentStep;
                  const isPending = stepNum > submission.currentStep;
                  const Icon = STEP_ICONS[index];

                  return (
                    <div key={stepNum} className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isCurrent
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-medium ${
                            isCompleted || isCurrent
                              ? "text-slate-900"
                              : "text-slate-500"
                          }`}
                        >
                          Adım {stepNum}: {title}
                        </p>
                        {isCurrent && (
                          <Badge className="mt-1 bg-blue-100 text-blue-700">
                            Şu anda burada
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="mt-1 bg-green-100 text-green-700">
                            Tamamlandı
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Data */}
          {submission.step1Data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Adım 1: Bilgi Toplama
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-slate-600">Şirket Bilgisi</Label>
                  <p className="text-sm mt-1">{submission.step1Data.companyInfo}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Ürün Türleri</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {submission.step1Data.productTypes?.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {submission.step2Data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Adım 2: Hizmet Seçimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-slate-600">Seçilen Hizmet</Label>
                  <p className="text-lg font-medium mt-1">
                    {submission.step2Data.selectedService}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {submission.step3Data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Adım 3: Sistem Entegrasyonu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-slate-600">Platform</Label>
                  <p className="text-lg font-medium mt-1">
                    {submission.step3Data.platform}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={submission.step3Data.apiConnected}
                    disabled
                    className="h-4 w-4"
                  />
                  <Label className="text-slate-600">API Bağlantısı Kuruldu</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {submission.step4Data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Adım 4: Test & Doğrulama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={submission.step4Data.testOrdersCompleted}
                    disabled
                    className="h-4 w-4"
                  />
                  <Label className="text-slate-600">Test Siparişleri Tamamlandı</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {submission.step5Data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Adım 5: Başlangıç
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-slate-600">Canlı Yayın Tarihi</Label>
                  <p className="text-lg font-medium mt-1">
                    {submission.step5Data.liveDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notlar ve Açıklamalar</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Onboarding hakkında notlar ekleyin..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Status Update */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Durum Güncelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="abandoned">Terk Edildi</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  "Kaydet"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={handleMarkComplete}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Tamamla
                  </>
                )}
              </Button>
              <Button
                onClick={handleSendReminder}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Hatırlatma Gönder
                  </>
                )}
              </Button>
              <Button
                onClick={handleArchive}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  "Arşivle"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-slate-600">Oluşturulma Tarihi</p>
                <p className="font-medium">{formatDate(submission.createdAt)}</p>
              </div>
              <div>
                <p className="text-slate-600">Son Güncelleme</p>
                <p className="font-medium">{formatDate(submission.updatedAt)}</p>
              </div>
              <div>
                <p className="text-slate-600">Başvuru ID</p>
                <p className="font-medium font-mono text-xs">{submission.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOnboardingDetail;

