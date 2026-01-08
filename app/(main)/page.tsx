"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Map,
  ScanLine,
  Plus,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Show loading skeleton instead of blank screen
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-white/10 rounded-lg mx-auto"></div>
          <div className="h-6 w-64 bg-white/5 rounded-lg mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Version Badge */}
      <div className="fixed top-6 right-6 z-50 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em]">
          v1.0.0
        </span>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center gap-16">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center gap-6 animate-in fade-in slide-in-from-top-8 duration-1000">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-2xl backdrop-blur-xl cursor-help group transition-all hover:scale-110">
                  <ShieldCheck
                    size={40}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 border-white/10 text-white">
                <p>Privacy: We do not collect or store personal user data.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                Vibe Coding!
              </span>
            </h1>
            <p className="text-blue-200/50 text-lg md:text-xl max-w-md mx-auto font-medium">
              The ultimate utility for local alerts and product intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Quick Actions Ready
            </span>
          </div>
        </header>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          {/* Scanner Action */}
          <div
            onClick={() => router.push("/scanner")}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-blue-500/50 hover:-translate-y-2 group-active:scale-[0.98] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ScanLine size={120} />
              </div>

              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <ScanLine size={28} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Product Scanner
                  </h2>
                  <p className="text-blue-100/40 leading-relaxed">
                    Instantly identify products and manage prices using QR or
                    Barcode technology.
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
                  Launch Scanner{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Action */}
          <div
            onClick={() => router.push("/map")}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-purple-500/50 hover:-translate-y-2 group-active:scale-[0.98] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Map size={120} />
              </div>

              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
                  <Map size={28} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Alert Map
                  </h2>
                  <p className="text-purple-100/40 leading-relaxed">
                    Explore real-time community alerts and pinned locations
                    across Cambodia.
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest">
                  View Map{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Action */}
        <div className="animate-in fade-in duration-1000 delay-500">
          <Button
            onClick={() => router.push("/upload")}
            variant="ghost"
            className="group gap-3 px-8 py-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
            <span className="font-medium">Pin New Alert Image</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
