"use client";

import {
  ShieldCheck,
  Waves,
  Home,
  Activity,
  Eye,
  Droplets,
  Wind,
} from "lucide-react";

interface AdvisorySectionProps {
  readonly t: any;
}

export function AdvisorySection({ t }: AdvisorySectionProps) {
  const advisories = [
    {
      icon: Waves,
      text: t.advisories.mask,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Home,
      text: t.advisories.purifier,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: Activity,
      text: t.advisories.exercise,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Eye,
      text: t.advisories.windows,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Droplets,
      text: t.advisories.plants,
      color: "text-teal-500",
      bg: "bg-teal-50",
    },
    {
      icon: Wind,
      text: t.advisories.monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-500" />

      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg ring-4 ring-blue-50">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-relaxed">
            {t.advisories.title}
          </h3>
          <div className="h-1 w-20 bg-blue-500 rounded-full mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {advisories.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-5 p-5 rounded-[28px] bg-white/50 border border-white hover:bg-white hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-500 group/item backdrop-blur-sm"
          >
            <div
              className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover/item:scale-110 transition-transform duration-300`}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-gray-700 leading-tight">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
