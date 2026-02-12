"use client";

import { Map as MapIcon, Layers, Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Language } from "../types";
import { cityCoordinates } from "../constants";

const AirQualityMap = dynamic(() => import("@/components/AirQualityMap"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-100 animate-pulse rounded-3xl" />
  ),
});

interface MapSectionProps {
  readonly city: string;
  readonly language: Language;
  readonly geo?: [number, number];
}

export function MapSection({ city, language, geo }: MapSectionProps) {
  const getMapCenter = (): [number, number] => {
    if (geo) return geo;
    if (cityCoordinates[city]) {
      return [cityCoordinates[city].lat, cityCoordinates[city].lng];
    }
    // Fallback to Phnom Penh if city not found
    return [11.5732374, 104.9174903];
  };

  const center = getMapCenter();

  const legendItems = [
    { range: "0-50", color: "#009966", label: "Good" },
    { range: "51-100", color: "#ffde33", label: "Moderate" },
    { range: "101-150", color: "#ff9933", label: "Sensitive" },
    { range: "151-200", color: "#cc0033", label: "Unhealthy" },
    { range: "201-300", color: "#660099", label: "Very Unhealthy" },
    { range: "301+", color: "#7e0023", label: "Hazardous" },
  ];

  return (
    <div className="mb-20 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl shadow-indigo-100 ring-8 ring-indigo-50">
            <MapIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-relaxed tracking-tight">
              {language === "km" ? "ផែនទីគុណភាពខ្យល់" : "Air Quality Map"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="w-4 h-4 text-blue-500" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                Multi-Layer Analysis
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white flex gap-1">
          {legendItems.map((item) => (
            <div
              key={item.range}
              className="w-10 h-6 first:rounded-l-lg last:rounded-r-lg group relative cursor-help"
              style={{ backgroundColor: item.color }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.range}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {["PM2.5", "PM10", "Ozone"].map((pollutant) => (
          <div
            key={pollutant}
            className="group relative bg-white rounded-[3rem] p-4 shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col h-[560px] transition-all duration-700 hover:shadow-[0_60px_100px_rgba(0,0,0,0.12)] hover:-translate-y-2"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="font-black text-gray-800 tracking-tight">
                  {pollutant}
                </span>
              </div>
              <Maximize2 className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>

            <div className="flex-1 rounded-[2.5rem] overflow-hidden border border-gray-100 relative shadow-inner">
              <AirQualityMap
                center={center}
                zoom={11}
                pollutantLabel={pollutant}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
