import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, CheckCircle, Phone, Mail, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GetStartedModal = ({ open, onOpenChange }: GetStartedModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    monthlyVolume: "",
    productTypes: "",
    specialRequirements: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    // Success message
    toast({
      title: "Başvuru Gönderildi!",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    
    // Reset form
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      monthlyVolume: "",
      productTypes: "",
      specialRequirements: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Hemen Başlayın
          </DialogTitle>
          <DialogDescription>
            Paketleme hizmetimizden faydalanmak için bilgilerinizi paylaşın
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Size Özel Avantajlar</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 24 saat içinde hızlı başlangıç</li>
                <li>• Sabit fiyat garantisi</li>
                <li>• Ücretsiz ilk konsültasyon</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Şirket Adı *
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="ABC E-ticaret Ltd."
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">İletişim Kişisi *</Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Adınız Soyadınız"
                value={formData.contactName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                E-posta *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@sirket.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Telefon *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0532 123 45 67"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyVolume">Aylık Paket Hacmi</Label>
              <Input
                id="monthlyVolume"
                name="monthlyVolume"
                placeholder="Örn: 500 paket/ay"
                value={formData.monthlyVolume}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productTypes">Ürün Tipleri</Label>
              <Input
                id="productTypes"
                name="productTypes"
                placeholder="Elektronik, Tekstil, vb."
                value={formData.productTypes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Özel İhtiyaçlar</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              placeholder="Özel paketleme gereksinimleri, kargo tercihleri vb."
              value={formData.specialRequirements}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              İptal
            </Button>
            <Button type="submit" className="flex-1">
              Başvuru Gönder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GetStartedModal;