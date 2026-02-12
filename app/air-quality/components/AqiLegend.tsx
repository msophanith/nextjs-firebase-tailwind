"use client";

import { Info } from "lucide-react";

interface AqiLegendProps {
  readonly t: any;
}

export function AqiLegend({ t }: AqiLegendProps) {
  const legendItems = [
    { range: "0-50", color: "bg-emerald-500", shadow: "shadow-emerald-200" },
    { range: "51-100", color: "bg-amber-400", shadow: "shadow-amber-200" },
    { range: "101-150", color: "bg-orange-500", shadow: "shadow-orange-200" },
    { range: "151-200", color: "bg-rose-500", shadow: "shadow-rose-200" },
    { range: "201-300", color: "bg-purple-600", shadow: "shadow-purple-200" },
    { range: "301+", color: "bg-red-900", shadow: "shadow-red-200" },
  ];

  return (
    <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[40px] p-10 shadow-2xl">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-100 border border-white">
            <Info className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-relaxed">
              {t.understandingAQI}
            </h3>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-2" />
          </div>
        </div>

        {/* Global Spectrum Bar */}
        <div className="hidden lg:flex w-full h-8 rounded-full overflow-hidden mb-12 shadow-inner bg-gray-100 p-1">
          {legendItems.map((item) => (
            <div
              key={item.range}
              className={`h-full ${item.color} first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:scale-[1.02] cursor-help`}
              style={{ width: "16.666%" }}
              title={`${item.range}: ${t.aqiRanges[item.range]}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {legendItems.map((item) => (
            <div
              key={item.range}
              className="group relative flex flex-col items-center"
            >
              <div
                className={`w-full ${item.color} rounded-[2rem] p-4 mb-4 shadow-xl ${item.shadow} transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 active:scale-95`}
              >
                <p className="font-black text-white text-center text-lg">
                  {item.range}
                </p>
              </div>
              <p className="text-sm font-black text-gray-700 text-center leading-tight group-hover:text-blue-600 transition-colors">
                {t.aqiRanges[item.range as keyof typeof t.aqiRanges]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
