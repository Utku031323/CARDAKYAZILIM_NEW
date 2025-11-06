import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  DollarSign,
  Settings,
  BarChart3,
  Package,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Teklif Talepleri",
      href: "/admin/quotes",
      icon: FileText,
    },
    {
      label: "Onboarding",
      href: "/admin/onboarding",
      icon: Users,
    },
    {
      label: "Fiyatlandırma",
      href: "/admin/pricing",
      icon: DollarSign,
    },
    {
      label: "Ayarlar",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      label: "Analitikler",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Package className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">Çardak</h1>
            <p className="text-xs text-slate-400">Yönetim Paneli</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Çıkış Yap</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;

