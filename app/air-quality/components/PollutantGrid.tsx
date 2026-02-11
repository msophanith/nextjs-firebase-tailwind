"use client";

import { Wind, Activity, Eye, AlertTriangle } from "lucide-react";
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
    },
    {
      name: t.pollutants.pm10.name,
      key: "pm10",
      icon: Wind,
      description: t.pollutants.pm10.description,
      unit: "μg/m³",
    },
    {
      name: t.pollutants.o3.name,
      key: "o3",
      icon: Activity,
      description: t.pollutants.o3.description,
      unit: "ppb",
    },
    {
      name: t.pollutants.no2.name,
      key: "no2",
      icon: Eye,
      description: t.pollutants.no2.description,
      unit: "ppb",
    },
    {
      name: t.pollutants.so2.name,
      key: "so2",
      icon: Wind,
      description: t.pollutants.so2.description,
      unit: "ppb",
    },
    {
      name: t.pollutants.co.name,
      key: "co",
      icon: AlertTriangle,
      description: t.pollutants.co.description,
      unit: "ppm",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pollutantInfo.map((pollutant) => {
        const value =
          airData.pollutants[pollutant.key as keyof typeof airData.pollutants];
        const isDominant = airData.dominantPollutant === pollutant.key;

        return (
          <div
            key={pollutant.key}
            className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
              isDominant
                ? "border-blue-500 ring-4 ring-blue-100"
                : "border-gray-100"
            } hover:scale-105`}
          >
            {isDominant && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  {t.dominant}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${isDominant ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <pollutant.icon
                  className={`w-6 h-6 ${isDominant ? "text-blue-600" : "text-gray-600"}`}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-1 leading-relaxed">
              {pollutant.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
              {pollutant.description}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {value !== null && value !== undefined
                  ? value.toFixed(1)
                  : "N/A"}
              </span>
              {value !== null && value !== undefined && (
                <span className="text-sm text-gray-500">{pollutant.unit}</span>
              )}
            </div>

            {value !== null && value !== undefined && (
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getAQILevel(value).color} transition-all duration-500`}
                  style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
