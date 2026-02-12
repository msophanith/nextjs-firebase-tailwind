"use client";

import { ShieldCheck, Wind, Home, Activity, Droplets, Zap } from "lucide-react";

interface AdvisorySectionProps {
  readonly t: any;
}

export function AdvisorySection({ t }: AdvisorySectionProps) {
  const advisories = [
    {
      icon: ShieldCheck,
      text: t.advisories.mask,
      tag: "Protection",
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Home,
      text: t.advisories.purifier,
      tag: "Indoor",
      color: "from-purple-400 to-purple-600",
      bg: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Activity,
      text: t.advisories.exercise,
      tag: "Outdoor",
      color: "from-emerald-400 to-emerald-600",
      bg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: Zap,
      text: t.advisories.windows,
      tag: "Action",
      color: "from-amber-400 to-amber-600",
      bg: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      icon: Droplets,
      text: t.advisories.plants,
      tag: "Nature",
      color: "from-teal-400 to-teal-600",
      bg: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      icon: Wind,
      text: t.advisories.monitor,
      tag: "Awareness",
      color: "from-indigo-400 to-indigo-600",
      bg: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.08)]">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[28px] shadow-2xl shadow-blue-200 ring-8 ring-blue-50">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-relaxed tracking-tight">
              {t.advisories.title}
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">
              Expert Recommendations
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {advisories.map((item, idx) => (
          <div
            key={item.text}
            className="group relative flex flex-col p-8 rounded-[40px] bg-white border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-700 overflow-hidden active:scale-95"
          >
            {/* Hover Background Accent */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}
            />

            <div className="flex items-center justify-between mb-8">
              <div
                className={`p-5 rounded-3xl ${item.bg} ${item.textColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm`}
              >
                <item.icon className="w-8 h-8" />
              </div>
              <span
                className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${item.bg} ${item.textColor} opacity-60`}
              >
                {item.tag}
              </span>
            </div>

            <div className="relative">
              <span className="absolute -left-4 -top-6 text-8xl font-black text-gray-50 -z-10 opacity-50 transition-all duration-700 group-hover:scale-125 group-hover:opacity-80">
                0{idx + 1}
              </span>
              <p className="font-extrabold text-xl text-gray-800 leading-[1.4] tracking-tight group-hover:text-blue-600 transition-colors">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
