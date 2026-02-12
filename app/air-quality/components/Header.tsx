"use client";

import { MapIcon, Languages } from "lucide-react";
import { Language } from "../types";
import { CitySearch } from "./CitySearch";

interface HeaderProps {
  readonly t: any;
  readonly language: Language;
  readonly showMap: boolean;
  readonly onLanguageToggle: () => void;
  readonly onMapToggle: () => void;
  readonly mapToggleLabel: string;
  readonly onCitySelect: (city: string) => void;
  readonly currentCityId?: string;
}

export function Header({
  t,
  language,
  showMap,
  onLanguageToggle,
  onMapToggle,
  mapToggleLabel,
  onCitySelect,
  currentCityId,
}: HeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onMapToggle}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-500"
        >
          <MapIcon className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-700">{mapToggleLabel}</span>
        </button>

        <button
          onClick={onLanguageToggle}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-100 group glass-effect"
        >
          <Languages className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-700">
            {language === "km" ? "English" : "ខ្មែរ"}
          </span>
        </button>
      </div>

      <div className="text-center mb-16 animate-fade-in relative px-4">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 shadow-sm animate-bounce-subtle">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            {language === "km" ? "ទិន្ន័យផ្សាយផ្ទាល់" : "Live Updates"}
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm leading-[1.4] py-2 inline-block">
            {t.title}
          </span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 text-xl font-medium max-w-2xl leading-[1.6] py-1">
            {t.subtitle}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4 opacity-30"></div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto relative z-[9999]">
          <CitySearch
            onCitySelect={onCitySelect}
            t={t}
            currentCityId={currentCityId}
          />
        </div>
      </div>
    </>
  );
}
