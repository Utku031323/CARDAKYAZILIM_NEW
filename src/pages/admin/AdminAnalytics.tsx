import React, { useState, useMemo } from "react";
import { AnalyticsData } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Download,
  RefreshCw,
  FileText,
  Users,
  DollarSign,
  CheckCircle,
} from "lucide-react";

// Generate mock data for last 30 days
const generateMockAnalytics = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const monthNames = [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ];
    
    data.push({
      date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      quotes: Math.floor(Math.random() * 15) + 5,
      onboarding: Math.floor(Math.random() * 8) + 2,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      completionRate: Math.floor(Math.random() * 30) + 60,
    });
  }
  
  return data;
};

const MOCK_ANALYTICS_DATA = generateMockAnalytics();

const QUOTE_STATUS_DATA = [
  { name: "Beklemede", value: 12, color: "#f59e0b" },
  { name: "İncelendi", value: 8, color: "#3b82f6" },
  { name: "Teklif Verildi", value: 15, color: "#8b5cf6" },
  { name: "Kabul Edildi", value: 18, color: "#10b981" },
  { name: "Reddedildi", value: 3, color: "#ef4444" },
];

const ONBOARDING_STEPS_DATA = [
  { name: "Adım 1", completion: 95 },
  { name: "Adım 2", completion: 88 },
  { name: "Adım 3", completion: 75 },
  { name: "Adım 4", completion: 68 },
  { name: "Adım 5", completion: 52 },
];

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState("30days");
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    let filtered = MOCK_ANALYTICS_DATA;
    
    if (dateRange === "7days") {
      filtered = MOCK_ANALYTICS_DATA.slice(-7);
    } else if (dateRange === "90days") {
      filtered = MOCK_ANALYTICS_DATA;
    }
    
    return filtered;
  }, [dateRange]);

  const stats = useMemo(() => {
    const totalQuotes = filteredData.reduce((sum, d) => sum + d.quotes, 0);
    const totalOnboarding = filteredData.reduce((sum, d) => sum + d.onboarding, 0);
    const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
    const avgCompletion = Math.round(
      filteredData.reduce((sum, d) => sum + d.completionRate, 0) / filteredData.length
    );

    return {
      totalQuotes,
      totalOnboarding,
      totalRevenue,
      avgCompletion,
      activeTiers: 3,
    };
  }, [filteredData]);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    alert("Veriler CSV formatında indirildi");
  };

  const formatCurrency = (value: number) => {
    return `${(value / 1000).toFixed(0)}K TL`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analitikler</h1>
          <p className="text-slate-600 mt-1">
            Sistem performansı ve iş metriklerini izleyin
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            İndir
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-2">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tarih aralığı seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Son 7 Gün</SelectItem>
            <SelectItem value="30days">Son 30 Gün</SelectItem>
            <SelectItem value="90days">Son 3 Ay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Quotes */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Teklif</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stats.totalQuotes}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Total Onboarding */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Onboarding</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stats.totalOnboarding}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Active Tiers */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Aktif Katmanlar</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stats.activeTiers}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Completion */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Ort. Tamamlanma</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stats.avgCompletion}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Quotes Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Teklif Talepleri Trendi</CardTitle>
            <CardDescription>Son {dateRange === "7days" ? "7" : dateRange === "30days" ? "30" : "90"} günde alınan teklif talepleri</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="quotes"
                  stroke="#3b82f6"
                  name="Teklif Talepleri"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Quote Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Teklif Durumu Dağılımı</CardTitle>
            <CardDescription>Teklif taleplerinin durum bazında dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={QUOTE_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {QUOTE_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Onboarding Completion by Step */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Adımları Tamamlanma Oranı</CardTitle>
            <CardDescription>Her adımda tamamlanma yüzdeleri</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ONBOARDING_STEPS_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="completion"
                  fill="#10b981"
                  name="Tamamlanma %"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Chart - Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Gelir Trendi</CardTitle>
            <CardDescription>Günlük gelir değişimleri</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Gelir (TL)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Özet İstatistikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Ortalama Günlük Teklif</p>
              <p className="text-2xl font-bold text-slate-900">
                {Math.round(stats.totalQuotes / filteredData.length)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Ortalama Günlük Gelir</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(stats.totalRevenue / filteredData.length)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Toplam Onboarding Başlangıçları</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.totalOnboarding}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;

