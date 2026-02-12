"use client";

import {
  MapPin,
  RefreshCw,
  Thermometer,
  CloudRain,
  Wind,
  ShieldCheck,
  TrendingUp,
  Share2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirQualityData } from "../types";
import { getAQILevel, getHealthRecommendation, getTimeAgo } from "../utils";
import { useEffect, useState } from "react";

interface MainAqiCardProps {
  readonly airData: AirQualityData;
  readonly t: any;
  readonly onRefresh: () => void;
  readonly language: "km" | "en";
}

export function MainAqiCard({
  airData,
  t,
  onRefresh,
  language,
}: MainAqiCardProps) {
  const level = getAQILevel(airData.aqi);
  const [timeAgo, setTimeAgo] = useState(
    getTimeAgo(airData.timestamp, language),
  );
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;

    const shareText = `Air Quality in ${airData.city}: ${airData.aqi} AQI. Check it out!`;
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: "Air Quality Update",
          text: shareText,
          url: globalThis.location.href,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Sharing failed:", err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      navigator.clipboard.writeText(globalThis.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(getTimeAgo(airData.timestamp, language));
    }, 60000);
    return () => clearInterval(timer);
  }, [airData.timestamp, language]);

  // Calculate rotation for the gauge (0 to 180 degrees)
  const rotation = Math.min((airData.aqi / 300) * 180 - 90, 90);

  return (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-3xl rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-10 border border-white/50 group transition-all duration-700 hover:shadow-[0_60px_120px_rgba(0,0,0,0.15)]">
      {/* Dynamic Background Glow */}
      <div
        className={`absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br ${level.color} opacity-20 blur-[100px] transition-all duration-1000 group-hover:opacity-30 group-hover:scale-110`}
      ></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {airData.city.split(",")[0]}
                </h2>
                <div className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-md text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                  Live
                </div>
              </div>
              <p className="text-gray-500 font-bold flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {timeAgo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {airData.weather && (
              <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-[28px] border border-white shadow-inner">
                {airData.weather.t !== undefined && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-[24px] shadow-sm">
                    <div className="p-1.5 bg-orange-50 rounded-lg">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-lg font-black text-gray-800">
                      {airData.weather.t}°
                    </span>
                  </div>
                )}
                {airData.weather.h !== undefined && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-[24px] shadow-sm">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <CloudRain className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-lg font-black text-gray-800">
                      {airData.weather.h}%
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                disabled={isSharing}
                className={`p-5 rounded-[28px] bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-500 active:scale-90 group relative ${isSharing ? "opacity-50 cursor-not-allowed" : ""}`}
                title="Share"
              >
                <AnimatePresence>
                  {copied ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-emerald-500 rounded-[28px]"
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <Share2 className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={onRefresh}
                className="p-5 rounded-[28px] bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-500 hover:rotate-180 active:scale-90 group"
                title={t.refresh}
              >
                <RefreshCw className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="relative inline-block">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-9xl font-black bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tighter">
                  {airData.aqi}
                </span>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-gray-300 tracking-widest leading-none mb-2">
                    AQI
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-time</span>
                  </div>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full ${level.bgColor} shadow-lg shadow-gray-100/50 border border-white animate-in zoom-in-95 duration-500`}
              >
                <ShieldCheck className={`w-5 h-5 ${level.textColor}`} />
                <span
                  className={`text-xl font-black ${level.textColor} tracking-tight`}
                >
                  {t.aqiLevels[level.level as keyof typeof t.aqiLevels]}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-xl">
              {getHealthRecommendation(airData.aqi, t)}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 group/gauge">
              {/* Gauge Background */}
              <svg className="w-full h-full -rotate-180" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                  strokeDasharray="141 282"
                  strokeLinecap="round"
                />
                <circle
                  className={`transition-all duration-1000 ease-out`}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={`url(#gaugeGradient)`}
                  strokeWidth="8"
                  strokeDasharray={`${Math.min((airData.aqi / 300) * 141, 141)} 282`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gaugeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Gauge Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className={`w-40 h-40 rounded-full bg-gradient-to-br ${level.color} shadow-2xl flex items-center justify-center group-hover/gauge:scale-105 transition-transform duration-700`}
                >
                  <Wind className="w-20 h-20 text-white animate-pulse" />
                </div>
              </div>

              {/* Needle Simulation Hook */}
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -ml-1 w-2 h-6 bg-gray-800 rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
