import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuotes, useDeleteQuote } from "@/hooks/useQuotes";
import { useToast } from "@/hooks/use-toast";

// Mock data (kept for reference, will be replaced by API)
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
  {
    id: "4",
    companyName: "GHI Kozmetik",
    contactName: "Ayşe Şahin",
    email: "ayse@ghi.com",
    phone: "0535 456 7890",
    monthlyOrderCount: 200,
    productTypes: ["Kozmetik & Kişisel Bakım"],
    specialRequirements: "",
    hasFragileItems: false,
    needsCustomPackaging: false,
    preferredStartDate: "2025-02-01",
    calculatedPrice: 4800,
    status: "accepted",
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
  },
  {
    id: "5",
    companyName: "JKL Kitap",
    contactName: "Zeynep Aydın",
    email: "zeynep@jkl.com",
    phone: "0536 567 8901",
    monthlyOrderCount: 100,
    productTypes: ["Kitap & Kırtasiye"],
    specialRequirements: "Kütüphane ambalajı",
    hasFragileItems: false,
    needsCustomPackaging: true,
    preferredStartDate: "2025-02-10",
    calculatedPrice: 3000,
    status: "pending",
    createdAt: new Date("2025-01-11"),
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: "6",
    companyName: "MNO Spor",
    contactName: "Emre Çetin",
    email: "emre@mno.com",
    phone: "0537 678 9012",
    monthlyOrderCount: 250,
    productTypes: ["Spor & Outdoor"],
    specialRequirements: "",
    hasFragileItems: false,
    needsCustomPackaging: false,
    preferredStartDate: "2025-02-20",
    calculatedPrice: 5500,
    status: "rejected",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
    notes: "Bütçe uyuşmazlığı",
  },
  {
    id: "7",
    companyName: "PQR Oyuncak",
    contactName: "Selin Kara",
    email: "selin@pqr.com",
    phone: "0538 789 0123",
    monthlyOrderCount: 180,
    productTypes: ["Oyuncak & Hobi"],
    specialRequirements: "Çocuk güvenliği sertifikası gerekli",
    hasFragileItems: true,
    needsCustomPackaging: true,
    preferredStartDate: "2025-03-01",
    calculatedPrice: 4320,
    status: "pending",
    createdAt: new Date("2025-01-09"),
    updatedAt: new Date("2025-01-09"),
  },
  {
    id: "8",
    companyName: "STU Gıda",
    contactName: "Kerem Yıldız",
    email: "kerem@stu.com",
    phone: "0539 890 1234",
    monthlyOrderCount: 400,
    productTypes: ["Gıda & İçecek"],
    specialRequirements: "Soğuk zincir gerekli",
    hasFragileItems: false,
    needsCustomPackaging: true,
    preferredStartDate: "2025-02-05",
    calculatedPrice: 8800,
    status: "quoted",
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-08"),
  },
  {
    id: "9",
    companyName: "VWX Sağlık",
    contactName: "Leyla Güzel",
    email: "leyla@vwx.com",
    phone: "0540 901 2345",
    monthlyOrderCount: 120,
    productTypes: ["Sağlık & Medikal"],
    specialRequirements: "Steril ambalaj",
    hasFragileItems: true,
    needsCustomPackaging: true,
    preferredStartDate: "2025-02-15",
    calculatedPrice: 3600,
    status: "reviewed",
    createdAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-07"),
  },
  {
    id: "10",
    companyName: "YZA Ev & Yaşam",
    contactName: "Osman Demir",
    email: "osman@yza.com",
    phone: "0541 012 3456",
    monthlyOrderCount: 350,
    productTypes: ["Ev & Yaşam"],
    specialRequirements: "",
    hasFragileItems: true,
    needsCustomPackaging: false,
    preferredStartDate: "2025-02-25",
    calculatedPrice: 7700,
    status: "accepted",
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "11",
    companyName: "BCD Tekstil",
    contactName: "Pınar Acar",
    email: "pinar@bcd.com",
    phone: "0542 123 4567",
    monthlyOrderCount: 600,
    productTypes: ["Giyim & Aksesuar", "Tekstil"],
    specialRequirements: "Toplu sipariş indirimi",
    hasFragileItems: false,
    needsCustomPackaging: false,
    preferredStartDate: "2025-03-10",
    calculatedPrice: 10800,
    status: "pending",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
  },
];

const AdminQuotes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch quotes from API
  const { data: quotesData, isLoading, error } = useQuotes({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    status: statusFilter !== "all" ? statusFilter.toUpperCase() : undefined,
  });

  const deleteQuoteMutation = useDeleteQuote();

  // Map API status to UI status
  const mapApiStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "pending",
      REVIEWED: "reviewed",
      QUOTED: "quoted",
      ACCEPTED: "accepted",
      REJECTED: "rejected",
    };
    return statusMap[status] || status.toLowerCase();
  };

  const quotes = quotesData?.data || [];
  const totalPages = quotesData?.pagination?.pages || 1;

  const handleDelete = async (id: string) => {
    try {
      await deleteQuoteMutation.mutateAsync(id);
      toast({
        title: "Başarılı",
        description: "Teklif başarıyla silindi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Teklif silinirken hata oluştu",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const uiStatus = mapApiStatus(status);
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR");
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("tr-TR")} TL`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teklif Talepleri</h1>
          <p className="text-slate-600 mt-1">
            Toplam {filteredQuotes.length} teklif talebini yönetin
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Teklif
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtreler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Şirket adı veya e-posta ile ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="reviewed">İncelendi</SelectItem>
                <SelectItem value="quoted">Teklif Verildi</SelectItem>
                <SelectItem value="accepted">Kabul Edildi</SelectItem>
                <SelectItem value="rejected">Reddedildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Şirket Adı</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-red-600">
                      Veriler yüklenirken hata oluştu
                    </TableCell>
                  </TableRow>
                ) : quotes.length > 0 ? (
                  quotes.map((quote) => (
                    <TableRow key={quote.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {quote.companyName}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">-</p>
                          <p className="text-slate-500">-</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell className="font-medium">
                        -
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {formatDate(quote.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/admin/quotes/${quote.id}`}>
                          <Button variant="outline" size="sm">
                            Detay
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-slate-500">Teklif talebı bulunamadı</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Sayfa {currentPage} / {totalPages} ({quotesData?.pagination?.total || 0} sonuç)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;

