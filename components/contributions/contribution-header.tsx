"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ContributionHeaderProps {
  totalAmount: number;
  audienceCount: number;
  maleCount: number;
  femaleCount: number;
}

export function ContributionHeader({
  totalAmount,
  audienceCount,
  maleCount,
  femaleCount,
}: ContributionHeaderProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="pl-0 text-blue-400 hover:text-blue-300 hover:bg-transparent"
              onClick={() => router.push("/")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold tracking-tight">
              Audience Contributions
            </h1>
            <p className="text-slate-400">
              Track and manage contributions from your audience.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-white/5 border border-white/10 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="pl-0 text-blue-400 hover:text-blue-300 hover:bg-transparent"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">
            Audience Contributions
          </h1>
          <p className="text-slate-400">
            Track and manage contributions from your audience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 shadow-2xl shadow-blue-500/20 flex flex-col items-start justify-center min-w-[200px]">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 blur-3xl rounded-full"></div>
          <span className="relative z-10 text-xs font-bold text-blue-100 uppercase tracking-[0.2em]">
            Total Collected
          </span>
          <span className="relative z-10 text-3xl font-black text-white mt-2 tabular-nums">
            $
            {totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-start justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Total Audiences
          </span>
          <span className="text-3xl font-black text-white mt-2 tabular-nums">
            {audienceCount.toLocaleString()}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-start justify-center">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">
            Male
          </span>
          <span className="text-3xl font-black text-white mt-2 tabular-nums">
            {maleCount.toLocaleString()}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-start justify-center">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-[0.2em]">
            Female
          </span>
          <span className="text-3xl font-black text-white mt-2 tabular-nums">
            {femaleCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
