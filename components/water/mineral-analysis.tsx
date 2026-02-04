"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Activity, Droplet, Info } from "lucide-react";

const MINERAL_DATA = [
  { name: "Calcium", value: 45, unit: "mg/L", color: "bg-blue-400" },
  { name: "Magnesium", value: 12, unit: "mg/L", color: "bg-cyan-400" },
  { name: "Potassium", value: 3, unit: "mg/L", color: "bg-teal-400" },
  { name: "Silica", value: 32, unit: "mg/L", color: "bg-indigo-400" },
  { name: "Bicarbonates", value: 150, unit: "mg/L", color: "bg-sky-400" },
];

export function MineralAnalysis() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border-slate-200"
        >
          <Activity className="w-4 h-4" />
          View Source Analysis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Droplet className="w-5 h-5 text-blue-500" />
            Mineral Composition
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* pH Indicator */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-500">pH Level</p>
              <h4 className="text-3xl font-bold text-slate-900">7.4</h4>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-1">
                PERFECTLY BALANCED
              </span>
              <p className="text-xs text-slate-500">Natural Alkaline</p>
            </div>
          </div>

          {/* Mineral Bars */}
          <div className="space-y-4">
            {MINERAL_DATA.map((mineral, index) => (
              <div key={mineral.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {mineral.name}
                  </span>
                  <span className="text-slate-500">
                    {mineral.value} {mineral.unit}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(mineral.value / 160) * 100}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`h-full rounded-full ${mineral.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Source Info */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <p>
              Sourced from the protected Alpine aquifer at 1,200m elevation.
              Naturally filtered through glacial rocks for 15 years before
              bottling.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
