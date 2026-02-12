"use client";

import {
  Wind,
  Activity,
  Eye,
  AlertTriangle,
  Droplets,
  Zap,
} from "lucide-react";
import { AirQualityData } from "../types";
import { getAQILevel } from "../utils";

interface PollutantGridProps {
  readonly airData: AirQualityData;
  readonly t: any;
}

export function PollutantGrid({ airData, t }: PollutantGridProps) {
  const pollutantInfo = [
    {
      name: t.pollutants.pm25.name,
      key: "pm25",
      icon: Wind,
      description: t.pollutants.pm25.description,
      unit: "μg/m³",
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: t.pollutants.pm10.name,
      key: "pm10",
      icon: Droplets,
      description: t.pollutants.pm10.description,
      unit: "μg/m³",
      color: "from-emerald-400 to-teal-500",
    },
    {
      name: t.pollutants.o3.name,
      key: "o3",
      icon: Zap,
      description: t.pollutants.o3.description,
      unit: "ppb",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: t.pollutants.no2.name,
      key: "no2",
      icon: Activity,
      description: t.pollutants.no2.description,
      unit: "ppb",
      color: "from-purple-400 to-pink-500",
    },
    {
      name: t.pollutants.so2.name,
      key: "so2",
      icon: Eye,
      description: t.pollutants.so2.description,
      unit: "ppb",
      color: "from-sky-400 to-blue-500",
    },
    {
      name: t.pollutants.co.name,
      key: "co",
      icon: AlertTriangle,
      description: t.pollutants.co.description,
      unit: "ppm",
      color: "from-rose-400 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pollutantInfo.map((pollutant) => {
        const value =
          airData.pollutants[pollutant.key as keyof typeof airData.pollutants];
        const isDominant = airData.dominantPollutant === pollutant.key;
        const level =
          value !== null && value !== undefined ? getAQILevel(value) : null;

        return (
          <div
            key={pollutant.key}
            className={`group relative overflow-hidden bg-white/70 backdrop-blur-2xl rounded-[32px] p-8 transition-all duration-500 border-2 ${
              isDominant
                ? "border-blue-500 shadow-[0_30px_60px_rgba(59,130,246,0.15)] ring-8 ring-blue-50/50"
                : "border-white/50 shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)]"
            } active:scale-95`}
          >
            {/* Background Gradient Spot */}
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${pollutant.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
            />

            <div className="flex items-start justify-between mb-6">
              <div
                className={`p-4 rounded-2xl transition-all duration-500 group-hover:rotate-12 ${
                  isDominant
                    ? "bg-blue-600 shadow-lg shadow-blue-200"
                    : "bg-gray-100 group-hover:bg-white group-hover:shadow-lg"
                }`}
              >
                <pollutant.icon
                  className={`w-6 h-6 ${isDominant ? "text-white" : "text-gray-600"}`}
                />
              </div>

              {isDominant && (
                <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest leading-none">
                    {t.dominant}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-2">
                {pollutant.name}
              </h3>
              <p className="text-sm text-gray-500 font-bold leading-relaxed line-clamp-2 min-h-[2.5rem]">
                {pollutant.description}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {value !== null && value !== undefined
                      ? value.toFixed(1)
                      : "—"}
                  </span>
                  <span className="text-xs font-bold text-gray-400 mb-1 tracking-tight">
                    {pollutant.unit}
                  </span>
                </div>
                {level && (
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest mt-1 ${level.textColor}`}
                  >
                    {t.aqiLevels[level.level as keyof typeof t.aqiLevels]}
                  </span>
                )}
              </div>

              {/* Progress Pillar */}
              {value !== null && value !== undefined && (
                <div className="w-4 h-16 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
                  <div
                    className={`w-full bg-gradient-to-t ${level?.color || pollutant.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      height: `${Math.max(Math.min((value / 100) * 100, 100), 10)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
