import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Package,
  Loader2,
} from "lucide-react";
import { usePricing, useDeletePricing } from "@/hooks/usePricing";
import { useToast } from "@/hooks/use-toast";

// Mock data (kept for reference)
const MOCK_PRICING_TIERS: any[] = [
  {
    id: "1",
    name: "Standart Paketleme",
    monthlyPrice: 2500,
    pricePerOrder: 15,
    description: "Küçük ve orta ölçekli işletmeler için ideal",
    features: [
      "Güvenli ambalajlama",
      "Hızlı işlem süresi",
      "Sabit fiyat garantisi",
      "Temel raporlama",
      "E-posta desteği",
    ],
    orderVolumeMin: 50,
    orderVolumeMax: 500,
    status: "active",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Premium Paketleme",
    monthlyPrice: 5500,
    pricePerOrder: 12,
    description: "Büyük ölçekli işletmeler için kapsamlı çözüm",
    features: [
      "Özel koruma malzemeleri",
      "Kırılabilir ürün desteği",
      "Öncelikli işlem",
      "Gelişmiş raporlama",
      "Telefon + E-posta desteği",
      "Aylık danışmanlık",
      "API entegrasyonu",
    ],
    orderVolumeMin: 500,
    orderVolumeMax: 2000,
    status: "active",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "3",
    name: "Özel Çözümler",
    monthlyPrice: 10000,
    pricePerOrder: 10,
    description: "Kurumsal müşteriler için özelleştirilmiş hizmet",
    features: [
      "Markanıza özel ambalaj",
      "Özel boyut ve şekiller",
      "Kurumsal anlaşmalar",
      "Özel raporlama",
      "7/24 Telefon desteği",
      "Dedike hesap yöneticisi",
      "Özel entegrasyon",
      "Aylık stratejik toplantılar",
    ],
    orderVolumeMin: 2000,
    orderVolumeMax: null,
    status: "active",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "4",
    name: "Başlangıç Paketi",
    monthlyPrice: 1000,
    pricePerOrder: 20,
    description: "Yeni işletmeler için uygun fiyatlı başlangıç paketi",
    features: [
      "Temel ambalajlama",
      "Standart işlem süresi",
      "Sınırlı raporlama",
      "E-posta desteği",
      "3 ay ücretsiz deneme",
    ],
    orderVolumeMin: 10,
    orderVolumeMax: 100,
    status: "inactive",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-10"),
  },
];

interface EditingTier {
  id?: string;
  name: string;
  monthlyPrice: number;
  pricePerOrder: number;
  description: string;
  features: string[];
  orderVolumeMin: number;
  orderVolumeMax?: number | null;
  status?: string;
}

const AdminPricing = () => {
  const { toast } = useToast();
  const { data: pricingData, isLoading, error } = usePricing();
  const deletePricingMutation = useDeletePricing();

  const [editingTier, setEditingTier] = useState<EditingTier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const pricingTiers = pricingData?.data || [];

  const handleEdit = (tier: PricingTier) => {
    setEditingTier(tier);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingTier({
      name: "",
      monthlyPrice: 0,
      pricePerOrder: 0,
      description: "",
      features: [],
      orderVolumeMin: 0,
      orderVolumeMax: null,
      status: "active",
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, you would call the API here
      toast({
        title: "Başarılı",
        description: "Fiyatlandırma katmanı kaydedildi",
      });
      setIsDialogOpen(false);
      setEditingTier(null);
    } catch (err) {
      toast({
        title: "Hata",
        description: "Fiyatlandırma katmanı kaydedilirken hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePricingMutation.mutateAsync(deleteId);
      toast({
        title: "Başarılı",
        description: "Fiyatlandırma katmanı silindi",
      });
      setDeleteId(null);
    } catch (err) {
      toast({
        title: "Hata",
        description: "Fiyatlandırma katmanı silinirken hata oluştu",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = (id: string) => {
    // In a real app, you would call the API here
    toast({
      title: "Başarılı",
      description: "Durum güncellendi",
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("tr-TR")} TL`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fiyatlandırma Yönetimi</h1>
          <p className="text-slate-600 mt-1">
            {pricingTiers.length} fiyatlandırma katmanını yönetin
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAddNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Katman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTier?.id ? "Katmanı Düzenle" : "Yeni Katman Ekle"}
              </DialogTitle>
              <DialogDescription>
                Fiyatlandırma katmanı bilgilerini girin
              </DialogDescription>
            </DialogHeader>

            {editingTier && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Katman Adı</Label>
                    <Input
                      value={editingTier.name || ""}
                      onChange={(e) =>
                        setEditingTier({ ...editingTier, name: e.target.value })
                      }
                      placeholder="Örn: Premium Paketleme"
                    />
                  </div>
                  <div>
                    <Label>Aylık Fiyat (TL)</Label>
                    <Input
                      type="number"
                      value={editingTier.monthlyPrice || 0}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          monthlyPrice: parseInt(e.target.value),
                        })
                      }
                      placeholder="5500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sipariş Başına Fiyat (TL)</Label>
                    <Input
                      type="number"
                      value={editingTier.pricePerOrder || 0}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          pricePerOrder: parseInt(e.target.value),
                        })
                      }
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label>Durum</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Switch
                        checked={editingTier.status === "active"}
                        onCheckedChange={(checked) =>
                          setEditingTier({
                            ...editingTier,
                            status: checked ? "active" : "inactive",
                          })
                        }
                      />
                      <span className="text-sm">
                        {editingTier.status === "active" ? "Aktif" : "İnaktif"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Açıklama</Label>
                  <Textarea
                    value={editingTier.description || ""}
                    onChange={(e) =>
                      setEditingTier({
                        ...editingTier,
                        description: e.target.value,
                      })
                    }
                    placeholder="Katman açıklaması"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min. Sipariş Hacmi</Label>
                    <Input
                      type="number"
                      value={editingTier.orderVolumeMin || 0}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          orderVolumeMin: parseInt(e.target.value),
                        })
                      }
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label>Max. Sipariş Hacmi</Label>
                    <Input
                      type="number"
                      value={editingTier.orderVolumeMax || ""}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          orderVolumeMax: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                      placeholder="500 (boş bırakın: sınırsız)"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    İptal
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Fiyatlandırma katmanlarını yönetin, düzenleyin veya yeni katmanlar ekleyin.
          Değişiklikler hemen uygulanır.
        </AlertDescription>
      </Alert>

      {/* Pricing Tiers Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Fiyatlandırma katmanları yüklenirken hata oluştu</AlertDescription>
        </Alert>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative transition-all ${
              tier.status === "inactive" ? "opacity-60" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {tier.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={tier.status === "active" ? "default" : "secondary"}
                >
                  {tier.status === "active" ? "Aktif" : "İnaktif"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(tier.monthlyPrice)}
                  </span>
                  <span className="text-slate-600">/ay</span>
                </div>
                <p className="text-sm text-slate-600">
                  {formatPrice(tier.pricePerOrder)} / sipariş
                </p>
              </div>

              {/* Order Volume */}
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  {tier.orderVolumeMin} - {tier.orderVolumeMax || "∞"} sipariş/ay
                </span>
              </div>

              {/* Features */}
              <div>
                <p className="font-medium text-sm mb-2">Özellikler:</p>
                <ul className="space-y-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(tier)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
                <AlertDialog>
                  <AlertDialog.Trigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => setDeleteId(tier.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sil
                    </Button>
                  </AlertDialog.Trigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Katmanı Sil</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{tier.name}" katmanını silmek istediğinizden emin misiniz?
                        Bu işlem geri alınamaz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-2">
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Sil
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between pt-2 border-t">
                <Label className="text-sm">Durumu Değiştir</Label>
                <Switch
                  checked={tier.status === "active"}
                  onCheckedChange={() => handleToggleStatus(tier.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

      {/* Empty State */}
      {pricingTiers.length === 0 && !isLoading && (
        <Card>
          <CardContent className="py-12 text-center">
            <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Henüz fiyatlandırma katmanı yok</p>
            <Button
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              İlk Katmanı Ekle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPricing;

