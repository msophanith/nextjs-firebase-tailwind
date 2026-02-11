"use client";

import { Map as MapIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Language } from "../types";
import { cityCoordinates } from "../constants";

const AirQualityMap = dynamic(() => import("@/components/AirQualityMap"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-100 animate-pulse rounded-2xl" />
  ),
});

interface MapSectionProps {
  readonly city: string;
  readonly language: Language;
}

export function MapSection({ city, language }: MapSectionProps) {
  return (
    <div className="mb-12 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {language === "km"
            ? "ផែនទីគុណភាពខ្យល់តាមប្រភេទ"
            : "Pollutant Distribution Maps"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
        {["PM2.5", "PM10", "Ozone"].map((pollutant) => (
          <div
            key={pollutant}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-[450px]"
          >
            <AirQualityMap
              center={[cityCoordinates[city].lat, cityCoordinates[city].lng]}
              zoom={11}
              pollutantLabel={pollutant}
            />
          </div>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 inline-block overflow-x-auto max-w-full">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 whitespace-nowrap min-w-max">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#009966]"></div> 0-50
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#ffde33]"></div> 51-100
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#ff9933]"></div> 101-150
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#cc0033]"></div> 151-200
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#660099]"></div> 201-300
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#7e0023]"></div> 301+
          </div>
        </div>
      </div>
    </div>
  );
}
