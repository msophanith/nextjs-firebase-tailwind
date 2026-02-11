"use client";

import {
  MapPin,
  RefreshCw,
  Thermometer,
  CloudRain,
  Navigation,
  Wind,
} from "lucide-react";
import { AirQualityData } from "../types";
import { getAQILevel, getHealthRecommendation } from "../utils";

interface MainAqiCardProps {
  readonly airData: AirQualityData;
  readonly t: any;
  readonly onRefresh: () => void;
}

export function MainAqiCard({ airData, t, onRefresh }: MainAqiCardProps) {
  const level = getAQILevel(airData.aqi);

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-10`}
      ></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <MapPin className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                {airData.city}
              </h2>
              {/* <p className="text-gray-500 font-medium">{airData.country}</p> */}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {airData.weather && (
              <div className="flex items-center gap-6 px-6 py-3 bg-gray-50/80 rounded-[24px] border border-gray-100 backdrop-blur-sm">
                {airData.weather.t !== undefined && (
                  <div className="flex items-center gap-2 pt-1 border-r border-gray-200 pr-4 last:border-0 last:pr-0">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span className="text-base font-bold text-gray-700">
                      {airData.weather.t}°C
                    </span>
                  </div>
                )}
                {airData.weather.h !== undefined && (
                  <div className="flex items-center gap-2 pt-1 border-r border-gray-200 pr-4 last:border-0 last:pr-0">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span className="text-base font-bold text-gray-700">
                      {airData.weather.h}%
                    </span>
                  </div>
                )}
                {airData.weather.w !== undefined && (
                  <div className="flex items-center gap-2 pt-1 border-r border-gray-200 pr-4 last:border-0 last:pr-0">
                    <Navigation className="w-5 h-5 text-indigo-500 rotate-180" />
                    <span className="text-base font-bold text-gray-700">
                      {airData.weather.w}m/s
                    </span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onRefresh}
              className="p-4 rounded-[24px] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 hover:rotate-180 group"
            >
              <RefreshCw className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {airData.aqi}
              </span>
              <span className="text-2xl text-gray-500">AQI</span>
            </div>
            <div
              className={`inline-block px-6 py-2 rounded-full ${level.bgColor} mb-4`}
            >
              <span className={`font-semibold ${level.textColor}`}>
                {t.aqiLevels[level.level as keyof typeof t.aqiLevels]}
              </span>
            </div>
            <p className="text-gray-600 max-w-2xl leading-relaxed">
              {getHealthRecommendation(airData.aqi, t)}
            </p>
          </div>

          <div className="hidden md:block">
            <div
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shadow-2xl`}
            >
              <Wind className="w-24 h-24 text-white opacity-80" />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {t.lastUpdated}: {new Date(airData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
