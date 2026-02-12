"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, X, Loader2, Navigation, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchResult {
  uid: number;
  aqi: string;
  station: {
    name: string;
    geo: [number, number];
    url: string;
    country: string;
  };
}

interface CitySearchProps {
  readonly onCitySelect: (city: string) => void;
  readonly t: any;
  readonly isOverlay?: boolean;
  readonly currentCityId?: string;
}

export function CitySearch({
  onCitySelect,
  t,
  isOverlay = false,
  currentCityId,
}: CitySearchProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Popular cities from constants to show as "Quick Access"
  const popularCities = Object.entries(t.cities).map(([id, name]) => ({
    id,
    name: name as string,
  }));

  const currentCityName = currentCityId ? t.cities[currentCityId] || "" : "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_AIR_QUALITY_TOKEN;
        const response = await fetch(
          `https://api.waqi.info/search/?keyword=${encodeURIComponent(keyword)}&token=${token}`,
        );
        const data = await response.json();
        if (data.status === "ok") {
          setResults(data.data);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSelect = (uid: string) => {
    onCitySelect(uid);
    setKeyword("");
    setResults([]);
    setShowResults(false);
    setIsFocused(false);
  };

  const getAqiColor = (aqi: string) => {
    const val = Number.parseInt(aqi);
    if (Number.isNaN(val)) return "bg-gray-100 text-gray-500 border-gray-200";
    if (val <= 50) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (val <= 100) return "bg-amber-100 text-amber-700 border-amber-200";
    if (val <= 150) return "bg-orange-100 text-orange-700 border-orange-200";
    if (val <= 200) return "bg-rose-100 text-rose-700 border-rose-200";
    if (val <= 300) return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-red-100 text-red-900 border-red-200";
  };

  const showActiveBadge = !keyword && currentCityName && !isFocused;
  let inputPaddingLeft = "";
  if (isOverlay) {
    inputPaddingLeft = showActiveBadge ? "pl-36" : "pl-12";
  } else {
    inputPaddingLeft = showActiveBadge ? "pl-44" : "pl-16";
  }
  const inputHeight = isOverlay ? "h-14" : "h-20";
  const inputRounded = isOverlay ? "rounded-2xl" : "rounded-[2rem]";
  const inputTextSize = isOverlay ? "text-base" : "text-xl";

  const inputBorderBg = isOverlay
    ? "border-white/40 bg-white/60"
    : "border-white/50 bg-white/70";

  const focusedStyles = isFocused
    ? "border-blue-400 shadow-[0_20px_80px_rgba(59,130,246,0.25)] bg-white/95 placeholder:text-gray-400"
    : "border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.05)]";

  return (
    <div
      className={`mx-auto transition-all duration-500 relative z-50 ${
        isOverlay ? "max-w-xl mb-0" : "max-w-3xl mb-12"
      }`}
      ref={searchRef}
    >
      {/* Search Input Container */}
      <div
        className={`relative group transition-all duration-500 ${isFocused ? "scale-[1.02]" : "scale-100"}`}
      >
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 transition-opacity duration-300 ${isOverlay && !isFocused ? "opacity-70" : "opacity-100"}`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
          ) : (
            <div
              className={`transition-all duration-500 ${isFocused ? "rotate-90 text-blue-600" : "text-gray-400"}`}
            >
              <Search className="w-5 h-5" />
            </div>
          )}

          {/* Active City Badge */}
          {showActiveBadge && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100/50 border border-blue-200 rounded-full animate-in fade-in slide-in-from-left-2 duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-blue-700 text-[10px] font-black uppercase tracking-wider">
                Active
              </span>
            </div>
          )}
        </div>

        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowResults(true);
          }}
          placeholder={currentCityName || t.search.placeholder}
          className={`w-full transition-all duration-500 font-bold placeholder:text-gray-900/80 backdrop-blur-2xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${inputHeight} ${inputPaddingLeft} pr-16 ${inputRounded} ${inputTextSize} ${inputBorderBg} ${focusedStyles}`}
        />

        {keyword && (
          <button
            onClick={() => {
              setKeyword("");
              setResults([]);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-rose-50 text-gray-300 hover:text-rose-500 transition-all duration-300 active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && isFocused && (
        <div
          className={`absolute left-0 right-0 bg-white/90 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-500 ${
            isOverlay
              ? "top-[calc(100%+8px)] rounded-3xl"
              : "top-[calc(100%+12px)] rounded-[2.5rem]"
          }`}
        >
          <div
            className={`overflow-y-auto custom-scrollbar ${isOverlay ? "max-h-[40vh] p-4" : "max-h-[60vh] p-6"}`}
          >
            {/* Quick Access / Recent Section (When input is empty) */}
            {!keyword.trim() && popularCities.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2 text-blue-600 font-bold tracking-tight">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">
                    {t.search.popularCities || "Popular Cities"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularCities.map((city) => {
                    const isSelected = city.id === currentCityId;
                    return (
                      <button
                        key={city.id}
                        onClick={() => handleSelect(city.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group text-left border ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600"
                            : "hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 border-blue-50/30"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-blue-100 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm truncate">
                          {city.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* API Search Results */}
            {keyword.trim() && (
              <>
                {results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2 px-2 pb-1 text-gray-400 font-bold text-xs tracking-widest uppercase">
                      <Search className="w-3.5 h-3.5" />
                      <span>{results.length} Locations Found</span>
                    </div>
                    {results.map((result) => (
                      <button
                        key={result.uid}
                        onClick={() => handleSelect(result.uid.toString())}
                        className="flex items-center justify-between p-4 bg-white/50 border border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 text-left group overflow-hidden active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            <Navigation className="w-5 h-5 group-hover:rotate-12" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 text-sm truncate group-hover:text-blue-700">
                              {result.station.name.split(",")[0]}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium truncate uppercase tracking-tighter">
                              {result.station.name
                                .split(",")
                                .slice(1)
                                .join(",")
                                .trim() || result.station.country}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`ml-3 px-4 py-1.5 rounded-xl text-xs font-black border shadow-sm transition-all duration-500 group-hover:scale-110 ${getAqiColor(result.aqi)}`}
                        >
                          {result.aqi === "-" ? "N/A" : result.aqi}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  !loading && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="bg-gray-50 p-6 rounded-full">
                        <Search className="w-10 h-10 text-gray-200" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-700">
                          {t.search.noResults}
                        </p>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto">
                          We couldn't find any station matching "{keyword}"
                        </p>
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}
