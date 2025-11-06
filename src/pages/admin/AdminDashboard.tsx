import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data
  const stats = {
    totalQuotes: 24,
    pendingQuotes: 5,
    totalOnboarding: 12,
    inProgressOnboarding: 3,
    conversionRate: 45.8,
    monthlyQuotes: 18,
  };

  const recentQuotes = [
    {
      id: "1",
      company: "ABC Teknoloji",
      status: "pending",
      date: "2025-01-15",
    },
    {
      id: "2",
      company: "XYZ Giyim",
      status: "reviewed",
      date: "2025-01-14",
    },
    {
      id: "3",
      company: "DEF Elektronik",
      status: "quoted",
      date: "2025-01-13",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: "Beklemede", variant: "secondary" },
      reviewed: { label: "İncelendi", variant: "outline" },
      quoted: { label: "Teklif Verildi", variant: "default" },
      accepted: { label: "Kabul Edildi", variant: "default" },
      rejected: { label: "Reddedildi", variant: "destructive" },
    };
    const mapping = statusMap[status] || { label: status, variant: "secondary" };
    return <Badge variant={mapping.variant}>{mapping.label}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Hoş geldiniz, {user?.name}!
        </h1>
        <p className="text-slate-600 mt-2">
          Çardak Paketleme yönetim paneline hoş geldiniz. İşte güncel istatistikleriniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Quotes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Toplam Teklif Talepleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {stats.totalQuotes}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Bu ay: {stats.monthlyQuotes}
            </p>
          </CardContent>
        </Card>

        {/* Pending Quotes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Beklemede Olan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {stats.pendingQuotes}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              İşlem gerekli
            </p>
          </CardContent>
        </Card>

        {/* Total Onboarding */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Toplam Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {stats.totalOnboarding}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Devam eden: {stats.inProgressOnboarding}
            </p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Dönüşüm Oranı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.conversionRate}%
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Artış trendi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Son Teklif Talepleri
            </CardTitle>
            <CardDescription>
              En son gönderilen 3 teklif talebini görüntüleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {quote.company}
                    </p>
                    <p className="text-xs text-slate-500">{quote.date}</p>
                  </div>
                  {getStatusBadge(quote.status)}
                </div>
              ))}
            </div>
            <Link to="/admin/quotes">
              <Button variant="outline" className="w-full mt-4">
                Tümünü Görüntüle
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Hızlı İşlemler
            </CardTitle>
            <CardDescription>
              Sık kullanılan işlemlere hızlı erişim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/quotes">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Teklif Talepleri Yönet
              </Button>
            </Link>
            <Link to="/admin/onboarding">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Onboarding Başvuruları
              </Button>
            </Link>
            <Link to="/admin/pricing">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Fiyatlandırma Yönet
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

