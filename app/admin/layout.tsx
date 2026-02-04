"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Globe,
  Shield,
  Activity,
  LogOut,
  Menu,
  ChevronRight,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  {
    icon: Globe,
    label: "Environments",
    href: "/admin/environments",
  },
  { icon: Shield, label: "Security", href: "/admin/security" },
  { icon: Activity, label: "Logs", href: "/admin/logs" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans selection:bg-primary/10">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col hidden md:flex z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
              <Globe className="w-5 h-5 text-primary" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Venefish
          </span>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-1.5 py-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">
              Main Menu
            </p>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-300 group",
                      isActive
                        ? "bg-primary/5 text-primary shadow-[0_2px_10px_rgba(59,130,246,0.05)]"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-4.5 h-4.5 transition-colors",
                        isActive ? "text-primary" : "group-hover:text-primary"
                      )}
                    />
                    <span className="text-sm font-semibold">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-8 mt-auto">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
            <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
              Usage Plan
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-900">Pro Plan</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                Active
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-gradient-to-r from-primary to-purple-500" />
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors h-12"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-semibold">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden z-10">
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-8 flex-1">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative max-w-md w-full hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search environments..."
                className="pl-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/50 focus:ring-primary/10 transition-all rounded-xl h-11 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
              <span className="text-[10px] font-bold text-green-600 tracking-wide uppercase">
                System Online
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-400 hover:text-slate-900 rounded-xl bg-slate-50 hover:bg-slate-100 h-10 w-10"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
              </Button>
              <Separator orientation="vertical" className="h-6 bg-slate-200" />
              <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-900 leading-none">
                    Alex Rivera
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Administrator
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 p-[1px] shadow-md">
                  <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center overflow-hidden border border-white/10">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-10 max-w-[1600px] mx-auto">{children}</div>
        </ScrollArea>
      </main>
    </div>
  );
}
