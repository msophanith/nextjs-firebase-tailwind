"use client";

import { Calendar } from "lucide-react";
import { AirQualityData, Language } from "../types";
import { getAQILevel } from "../utils";

interface ForecastSectionProps {
  readonly forecast: AirQualityData["forecast"];
  readonly t: any;
  readonly language: Language;
}

export function ForecastSection({
  forecast,
  t,
  language,
}: ForecastSectionProps) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg ring-4 ring-indigo-50">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-relaxed">
            {t.forecast.title}
          </h3>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((item, idx) => {
          const level = getAQILevel(item.avg);
          const date = new Date(item.day);
          const isTomorrow = idx === 0;

          return (
            <div
              key={item.day}
              className="bg-white/60 border border-white p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                {isTomorrow &&
                  (language === "km" ? t.forecast.tomorrow : "TOMORROW")}
                {!isTomorrow &&
                  date.toLocaleDateString(
                    language === "km" ? "km-KH" : "en-US",
                    { weekday: "short" },
                  )}
              </span>

              <div
                className={`w-14 h-14 rounded-2xl ${level.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.color} shadow-lg`}
                />
              </div>

              <span className="text-2xl font-black text-gray-800">
                {item.avg}
              </span>
              <span
                className={`text-[10px] font-bold mt-1 px-3 py-1 rounded-full ${level.color} bg-opacity-10 ${level.color.replace("from-", "text-").split(" ")[0]}`}
              >
                {t.aqiLevels[level.level as keyof typeof t.aqiLevels]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
