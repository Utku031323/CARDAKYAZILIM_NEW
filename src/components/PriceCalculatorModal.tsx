import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Package } from "lucide-react";

interface PriceCalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PriceCalculatorModal = ({ open, onOpenChange }: PriceCalculatorModalProps) => {
  const [formData, setFormData] = useState({
    packageCount: "",
    productType: "",
    averageWeight: "",
    averageSize: ""
  });
  
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const basePrice = 15; // Sabit fiyat
    const count = parseInt(formData.packageCount) || 0;
    const total = basePrice * count;
    setCalculatedPrice(total);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Fiyat Hesaplama
          </DialogTitle>
          <DialogDescription>
            Paketleme hizmetiniz için anında fiyat teklifi alın
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="packageCount">Paket Sayısı</Label>
              <Input
                id="packageCount"
                name="packageCount"
                type="number"
                placeholder="Örn: 100"
                value={formData.packageCount}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productType">Ürün Tipi</Label>
              <Input
                id="productType"
                name="productType"
                placeholder="Örn: Elektronik"
                value={formData.productType}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="averageWeight">Ortalama Ağırlık (kg)</Label>
              <Input
                id="averageWeight"
                name="averageWeight"
                type="number"
                placeholder="Örn: 0.5"
                value={formData.averageWeight}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="averageSize">Ortalama Boyut (cm)</Label>
              <Input
                id="averageSize"
                name="averageSize"
                placeholder="Örn: 20x15x10"
                value={formData.averageSize}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button onClick={calculatePrice} className="w-full" size="lg">
            Fiyat Hesapla
          </Button>

          {calculatedPrice !== null && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium">Toplam Maliyet</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ₺{calculatedPrice.toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Paket başına ₺15 sabit fiyat - {formData.packageCount} paket
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Kapat
            </Button>
            <Button className="flex-1">
              Teklif Al
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculatorModal;