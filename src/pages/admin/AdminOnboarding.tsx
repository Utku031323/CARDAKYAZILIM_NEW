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
import { Progress } from "@/components/ui/progress";
import { Search, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useOnboarding, useDeleteOnboarding } from "@/hooks/useOnboarding";
import { useToast } from "@/hooks/use-toast";

// Mock data (kept for reference)
const MOCK_ONBOARDING: any[] = [
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
  {
    id: "4",
    companyName: "Kitap Kütüphanesi",
    contactName: "Zeynep Acar",
    email: "zeynep@kitapkutuphane.com",
    phone: "0535 444 5555",
    currentStep: 2,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 40,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
    step1Data: { companyInfo: "Online kitap satışı", productTypes: ["Kitap & Kırtasiye"] },
    step2Data: { selectedService: "Standart Paketleme" },
  },
  {
    id: "5",
    companyName: "Gıda Pazarı",
    contactName: "Osman Şahin",
    email: "osman@gidapazari.com",
    phone: "0536 555 6666",
    currentStep: 1,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 20,
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
    step1Data: { companyInfo: "Organik gıda ürünleri", productTypes: ["Gıda & İçecek"] },
  },
  {
    id: "6",
    companyName: "Spor Ekipmanları",
    contactName: "Pınar Kara",
    email: "pinar@sporekipman.com",
    phone: "0537 666 7777",
    currentStep: 5,
    totalSteps: 5,
    status: "completed",
    completionPercentage: 100,
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2025-01-10"),
    step1Data: { companyInfo: "Spor ve outdoor ürünleri", productTypes: ["Spor & Outdoor"] },
    step2Data: { selectedService: "Premium Paketleme" },
    step3Data: { platform: "OpenCart", apiConnected: true },
    step4Data: { testOrdersCompleted: true },
    step5Data: { liveDate: "2025-01-10" },
  },
  {
    id: "7",
    companyName: "Kozmetik Güzellik",
    contactName: "Leyla Yüksek",
    email: "leyla@kozmetikguzellik.com",
    phone: "0538 777 8888",
    currentStep: 0,
    totalSteps: 5,
    status: "abandoned",
    completionPercentage: 0,
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "8",
    companyName: "Oyuncak Dünyası",
    contactName: "Selin Çetin",
    email: "selin@oyuncakdunyasi.com",
    phone: "0539 888 9999",
    currentStep: 3,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 60,
    createdAt: new Date("2025-01-09"),
    updatedAt: new Date("2025-01-13"),
    step1Data: { companyInfo: "Çocuk oyuncakları", productTypes: ["Oyuncak & Hobi"] },
    step2Data: { selectedService: "Özel Çözümler" },
    step3Data: { platform: "PrestaShop", apiConnected: true },
  },
  {
    id: "9",
    companyName: "Sağlık Ürünleri",
    contactName: "Kerem Demir",
    email: "kerem@saglikurunleri.com",
    phone: "0540 999 0000",
    currentStep: 2,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 40,
    createdAt: new Date("2025-01-11"),
    updatedAt: new Date("2025-01-11"),
    step1Data: { companyInfo: "Medikal ve sağlık ürünleri", productTypes: ["Sağlık & Medikal"] },
    step2Data: { selectedService: "Premium Paketleme" },
  },
  {
    id: "10",
    companyName: "Ev Dekorasyonu",
    contactName: "Nida Aydın",
    email: "nida@evdekorasyonu.com",
    phone: "0541 000 1111",
    currentStep: 4,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 80,
    createdAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-14"),
    step1Data: { companyInfo: "Ev dekorasyonu ve mobilya", productTypes: ["Ev & Yaşam"] },
    step2Data: { selectedService: "Standart Paketleme" },
    step3Data: { platform: "Ticimax", apiConnected: true },
    step4Data: { testOrdersCompleted: true },
  },
  {
    id: "11",
    companyName: "Tekstil Fabrikası",
    contactName: "Rıza Yılmaz",
    email: "riza@tekstilfabrika.com",
    phone: "0542 111 2222",
    currentStep: 1,
    totalSteps: 5,
    status: "in-progress",
    completionPercentage: 20,
    createdAt: new Date("2025-01-13"),
    updatedAt: new Date("2025-01-13"),
    step1Data: { companyInfo: "Tekstil ve kumaş satışı", productTypes: ["Giyim & Aksesuar", "Tekstil"] },
  },
  {
    id: "12",
    companyName: "Mücevher Sarayı",
    contactName: "Sinem Kaya",
    email: "sinem@mucevhersarayi.com",
    phone: "0543 222 3333",
    currentStep: 5,
    totalSteps: 5,
    status: "completed",
    completionPercentage: 100,
    createdAt: new Date("2024-12-25"),
    updatedAt: new Date("2025-01-12"),
    step1Data: { companyInfo: "Mücevher ve aksesuar", productTypes: ["Mücevher"] },
    step2Data: { selectedService: "Premium Paketleme" },
    step3Data: { platform: "İdeasoft", apiConnected: true },
    step4Data: { testOrdersCompleted: true },
    step5Data: { liveDate: "2025-01-12" },
  },
];

const AdminOnboarding = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch onboarding from API
  const { data: onboardingData, isLoading, error } = useOnboarding({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    status: statusFilter !== "all" ? statusFilter.toUpperCase() : undefined,
  });

  const deleteOnboardingMutation = useDeleteOnboarding();

  // Map API status to UI status
  const mapApiStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "pending",
      IN_PROGRESS: "in_progress",
      COMPLETED: "completed",
      REJECTED: "rejected",
    };
    return statusMap[status] || status.toLowerCase();
  };

  const onboarding = onboardingData?.data || [];
  const totalPages = onboardingData?.pagination?.pages || 1;

  const handleDelete = async (id: string) => {
    try {
      await deleteOnboardingMutation.mutateAsync(id);
      toast({
        title: "Başarılı",
        description: "Onboarding başarıyla silindi",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Onboarding silinirken hata oluştu",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (apiStatus: string) => {
    const uiStatus = mapApiStatus(apiStatus);
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: "Beklemede", variant: "secondary" },
      in_progress: { label: "Devam Ediyor", variant: "secondary" },
      completed: { label: "Tamamlandı", variant: "default" },
      rejected: { label: "Reddedildi", variant: "destructive" },
    };
    const mapping = statusMap[uiStatus] || { label: uiStatus, variant: "secondary" };
    return <Badge variant={mapping.variant}>{mapping.label}</Badge>;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Onboarding Başvuruları</h1>
          <p className="text-slate-600 mt-1">
            Toplam {onboardingData?.pagination?.total || 0} onboarding başvurusunu yönetin
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Başvuru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtreler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="abandoned">Terk Edildi</SelectItem>
              </SelectContent>
            </Select>

            {/* Step Filter */}
            <Select value={stepFilter} onValueChange={(value) => {
              setStepFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Adım seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="1">Adım 1 - Bilgi Toplama</SelectItem>
                <SelectItem value="2">Adım 2 - Hizmet Seçimi</SelectItem>
                <SelectItem value="3">Adım 3 - Entegrasyon</SelectItem>
                <SelectItem value="4">Adım 4 - Test</SelectItem>
                <SelectItem value="5">Adım 5 - Başlangıç</SelectItem>
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
                  <TableHead>Adım</TableHead>
                  <TableHead>İlerleme</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-red-600">
                      Veriler yüklenirken hata oluştu
                    </TableCell>
                  </TableRow>
                ) : onboarding.length > 0 ? (
                  onboarding.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {submission.companyName}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{submission.contactName}</p>
                          <p className="text-slate-500">{submission.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          Adım {submission.currentStep}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-24">
                          <Progress value={submission.completionPercentage} className="h-2" />
                          <p className="text-xs text-slate-500 mt-1">
                            %{submission.completionPercentage}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-slate-600">
                        {formatDate(submission.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/admin/onboarding/${submission.id}`}>
                          <Button variant="outline" size="sm">
                            Detay
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-slate-500">Onboarding başvurusu bulunamadı</p>
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
            Sayfa {currentPage} / {totalPages} ({onboardingData?.pagination?.total || 0} sonuç)
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

export default AdminOnboarding;

