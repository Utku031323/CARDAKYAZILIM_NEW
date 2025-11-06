import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useQuote, useUpdateQuoteStatus } from "@/hooks/useQuotes";
import { useToast } from "@/hooks/use-toast";

// Mock data - same as AdminQuotes
const MOCK_QUOTES: any[] = [
  {
    id: "1",
    companyName: "ABC Teknoloji",
    contactName: "Ahmet Yılmaz",
    email: "ahmet@abc.com",
    phone: "0532 123 4567",
    monthlyOrderCount: 150,
    productTypes: ["Elektronik", "Bilgisayar"],
    specialRequirements: "Hızlı kargo gerekli",
    hasFragileItems: true,
    needsCustomPackaging: true,
    preferredStartDate: "2025-02-01",
    calculatedPrice: 3600,
    status: "pending",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    notes: "Müşteri acele ediyor",
  },
  {
    id: "2",
    companyName: "XYZ Giyim",
    contactName: "Fatma Demir",
    email: "fatma@xyz.com",
    phone: "0533 234 5678",
    monthlyOrderCount: 300,
    productTypes: ["Giyim & Aksesuar"],
    specialRequirements: "",
    hasFragileItems: false,
    needsCustomPackaging: false,
    preferredStartDate: "2025-02-15",
    calculatedPrice: 7200,
    status: "reviewed",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
  {
    id: "3",
    companyName: "DEF Elektronik",
    contactName: "Mehmet Kaya",
    email: "mehmet@def.com",
    phone: "0534 345 6789",
    monthlyOrderCount: 500,
    productTypes: ["Elektronik"],
    specialRequirements: "Özel ambalaj gerekli",
    hasFragileItems: true,
    needsCustomPackaging: true,
    preferredStartDate: "2025-03-01",
    calculatedPrice: 11000,
    status: "quoted",
    createdAt: new Date("2025-01-13"),
    updatedAt: new Date("2025-01-13"),
  },
];

const AdminQuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch quote from API
  const { data: quote, isLoading: isLoadingQuote, error } = useQuote(id || "");
  const updateStatusMutation = useUpdateQuoteStatus();

  const [status, setStatus] = useState(quote?.status || "PENDING");
  const [notes, setNotes] = useState(quote?.notes || "");

  // Map API status to UI status
  const mapApiStatus = (apiStatus: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "pending",
      REVIEWED: "reviewed",
      QUOTED: "quoted",
      ACCEPTED: "accepted",
      REJECTED: "rejected",
    };
    return statusMap[apiStatus] || apiStatus.toLowerCase();
  };

  if (isLoadingQuote) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/quotes")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Teklif talebı bulunamadı</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, you would update the quote here
      toast({
        title: "Başarılı",
        description: "Değişiklikler kaydedildi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Değişiklikler kaydedilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await updateStatusMutation.mutateAsync({
        id: quote.id,
        status: "ACCEPTED",
      });
      setStatus("ACCEPTED");
      toast({
        title: "Başarılı",
        description: "Teklif kabul edildi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Teklif kabul edilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await updateStatusMutation.mutateAsync({
        id: quote.id,
        status: "REJECTED",
      });
      setStatus("REJECTED");
      toast({
        title: "Başarılı",
        description: "Teklif reddedildi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Teklif reddedilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendQuote = async () => {
    setIsLoading(true);
    try {
      await updateStatusMutation.mutateAsync({
        id: quote.id,
        status: "QUOTED",
      });
      setStatus("QUOTED");
      toast({
        title: "Başarılı",
        description: "Teklif gönderildi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Teklif gönderilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR");
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("tr-TR")} TL`;
  };

  const getStatusBadge = (apiStatus: string) => {
    const uiStatus = mapApiStatus(apiStatus);
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: "Beklemede", variant: "secondary" },
      reviewed: { label: "İncelendi", variant: "outline" },
      quoted: { label: "Teklif Verildi", variant: "default" },
      accepted: { label: "Kabul Edildi", variant: "default" },
      rejected: { label: "Reddedildi", variant: "destructive" },
    };
    const mapping = statusMap[uiStatus] || { label: uiStatus, variant: "secondary" };
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
            onClick={() => navigate("/admin/quotes")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {quote.companyName}
            </h1>
            <p className="text-slate-600 mt-1">Teklif Talebı Detayı</p>
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
                  <p className="text-lg font-medium mt-1">{quote.companyName}</p>
                </div>
                <div>
                  <Label className="text-slate-600">İletişim Kişisi</Label>
                  <p className="text-lg font-medium mt-1">{quote.contactName}</p>
                </div>
                <div>
                  <Label className="text-slate-600">E-posta</Label>
                  <p className="text-lg font-medium mt-1">{quote.email}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Telefon</Label>
                  <p className="text-lg font-medium mt-1">{quote.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-600">Aylık Sipariş Sayısı</Label>
                  <p className="text-lg font-medium mt-1">
                    {quote.monthlyOrderCount} adet
                  </p>
                </div>
                <div>
                  <Label className="text-slate-600">Tercih Edilen Başlangıç</Label>
                  <p className="text-lg font-medium mt-1">
                    {quote.preferredStartDate || "Belirtilmemiş"}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-slate-600">Ürün Türleri</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quote.productTypes.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={quote.hasFragileItems}
                    disabled
                    className="h-4 w-4"
                  />
                  <Label className="text-slate-600">Kırılgan Ürünler</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={quote.needsCustomPackaging}
                    disabled
                    className="h-4 w-4"
                  />
                  <Label className="text-slate-600">Özel Ambalaj Gerekli</Label>
                </div>
              </div>

              {quote.specialRequirements && (
                <div>
                  <Label className="text-slate-600">Özel Gereksinimler</Label>
                  <p className="text-sm mt-1 p-3 bg-slate-50 rounded">
                    {quote.specialRequirements}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-600">Hesaplanan Fiyat</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {formatPrice(quote.calculatedPrice || 0)}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Aylık {quote.monthlyOrderCount} adet sipariş için
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notlar ve Açıklamalar</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Teklif hakkında notlar ekleyin..."
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
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="reviewed">İncelendi</SelectItem>
                  <SelectItem value="quoted">Teklif Verildi</SelectItem>
                  <SelectItem value="accepted">Kabul Edildi</SelectItem>
                  <SelectItem value="rejected">Reddedildi</SelectItem>
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
                onClick={handleSendQuote}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Teklif Gönder
                  </>
                )}
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Onayla
                  </>
                )}
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reddet
                  </>
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
                <p className="font-medium">{formatDate(quote.createdAt)}</p>
              </div>
              <div>
                <p className="text-slate-600">Son Güncelleme</p>
                <p className="font-medium">{formatDate(quote.updatedAt)}</p>
              </div>
              <div>
                <p className="text-slate-600">Teklif ID</p>
                <p className="font-medium font-mono text-xs">{quote.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminQuoteDetail;

