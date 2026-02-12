"use client";

import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CitySelectorProps {
  readonly city: string;
  readonly cityName?: string;
  readonly onCityChange: (city: string) => void;
  readonly t: any;
}

export function CitySelector({
  city,
  cityName,
  onCityChange,
  t,
}: CitySelectorProps) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <Select value={city} onValueChange={onCityChange}>
        <SelectTrigger className="w-full h-16 pl-12 pr-6 rounded-full border-2 border-blue-100 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-500 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <MapPin className="text-blue-500 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <SelectValue placeholder="Select a city">
            <span className="text-lg font-medium text-gray-700">
              {t.cities[city as keyof typeof t.cities] || cityName || city}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-[28px] border border-blue-100 bg-white/95 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.15)] p-2 min-w-[260px] max-h-[400px] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
          {Object.entries(t.cities).map(([key, label]) => (
            <SelectItem
              key={key}
              value={key}
              className="rounded-[20px] py-4 pl-12 pr-6 focus:bg-blue-50 focus:text-blue-700 font-semibold transition-all duration-300 cursor-pointer mb-1 last:mb-0 group"
            >
              <span className="text-base tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {label as string}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
