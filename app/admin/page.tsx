import React from "react";
import {
  Activity,
  Globe,
  Shield,
  Zap,
  ArrowUpRight,
  BarChart3,
  Rocket,
  Clock,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Active Environments",
    value: "3",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Total Deployments",
    value: "128",
    icon: Zap,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    label: "System Health",
    value: "99.9%",
    icon: Activity,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Security Alerts",
    value: "0",
    icon: Shield,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            System Overview
          </div>
          <h2 className="text-5xl font-black tracking-tight text-slate-900">
            Dashboard
          </h2>
          <p className="text-slate-500 font-medium max-w-md">
            Monitor your application performance, deployments, and
            infrastructure health in real-time.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-200 hover:bg-slate-50 rounded-2xl h-12 px-6 font-bold text-sm text-slate-700"
          >
            Download Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-bold text-sm shadow-xl shadow-primary/10 gap-2">
            <Plus className="w-4 h-4" /> Create New
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-white border-slate-200 rounded-[2rem] p-2 overflow-hidden group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm",
                    stat.bg
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold bg-green-50 px-2 py-1 rounded-lg border border-green-100 uppercase tracking-wider">
                  <ArrowUpRight className="w-3 h-3" /> 12%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-8 bg-white border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Recent Activity
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              {[
                {
                  title: "Production environment updated",
                  user: "Alex Rivera",
                  time: "2 hours ago",
                  type: "deploy",
                },
                {
                  title: "New environment variable added",
                  user: "Sarah Chen",
                  time: "4 hours ago",
                  type: "config",
                },
                {
                  title: "Staging deployment failed",
                  user: "System",
                  time: "6 hours ago",
                  type: "error",
                },
                {
                  title: "Security audit completed",
                  user: "Security Bot",
                  time: "12 hours ago",
                  type: "security",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-all group shadow-sm hover:shadow-md"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                      item.type === "deploy"
                        ? "bg-green-50 text-green-600"
                        : item.type === "config"
                        ? "bg-blue-50 text-blue-600"
                        : item.type === "error"
                        ? "bg-red-50 text-red-600"
                        : "bg-purple-50 text-purple-600"
                    )}
                  >
                    {item.type === "deploy" ? (
                      <Rocket className="w-5 h-5" />
                    ) : item.type === "config" ? (
                      <Zap className="w-5 h-5" />
                    ) : item.type === "error" ? (
                      <Activity className="w-5 h-5" />
                    ) : (
                      <Shield className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                      by {item.user} • {item.time}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-slate-300 group-hover:text-slate-900"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-primary to-purple-600 border-none rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl shadow-primary/20">
            <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-700 text-white">
              <Rocket className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2">
                Ready to ship?
              </h3>
              <p className="text-white/80 text-sm font-medium mb-6">
                Deploy your latest changes to production with one click.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-slate-50 rounded-2xl h-12 font-bold shadow-lg">
                Quick Deploy
              </Button>
            </div>
          </Card>

          <Card className="bg-white border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/environments" className="block group">
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group-hover:shadow-md">
                  <Globe className="w-6 h-6 text-slate-400 group-hover:text-primary mx-auto mb-2 transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
                    Environments
                  </span>
                </div>
              </Link>
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-center cursor-pointer group group-hover:shadow-md">
                <BarChart3 className="w-6 h-6 text-slate-400 group-hover:text-purple-600 mx-auto mb-2 transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
                  Analytics
                </span>
              </div>
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-center cursor-pointer group group-hover:shadow-md">
                <Shield className="w-6 h-6 text-slate-400 group-hover:text-orange-600 mx-auto mb-2 transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
                  Security
                </span>
              </div>
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-center cursor-pointer group group-hover:shadow-md">
                <Zap className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
                  Logs
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
