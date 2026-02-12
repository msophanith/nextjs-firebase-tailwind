"use client";

import { useState, useEffect } from "react";
import { translations } from "./constants";
import { AirQualityData, Language } from "./types";
import { Header } from "./components/Header";
import { MapSection } from "./components/MapSection";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { MainAqiCard } from "./components/MainAqiCard";
import { PollutantGrid } from "./components/PollutantGrid";
import { ForecastSection } from "./components/ForecastSection";
import { AdvisorySection } from "./components/AdvisorySection";
import { AqiLegend } from "./components/AqiLegend";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function AirQualityPage() {
  const [airData, setAirData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("A908095");
  const [language, setLanguage] = useState<Language>("km");
  const [showMap, setShowMap] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = translations[language];

  // Load persisted state
  useEffect(() => {
    const savedCity = localStorage.getItem("aqi-city");
    const savedLang = localStorage.getItem("aqi-lang");
    if (savedCity) setCity(savedCity);
    if (savedLang) setLanguage(savedLang as Language);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem("aqi-city", city);
    localStorage.setItem("aqi-lang", language);
  }, [city, language]);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchAirQuality();
  }, [city]);

  const fetchAirQuality = async () => {
    setLoading(true);
    setError(null);
    try {
      const cityParam = /^\d+$/.test(city) ? `@${city}` : city;
      const response = await fetch(
        `https://api.waqi.info/feed/${cityParam}/?token=${process.env.NEXT_PUBLIC_AIR_QUALITY_TOKEN}`,
      );
      const data = await response.json();

      if (data.status === "ok") {
        const aqiData = data.data;
        let timestamp = aqiData.time?.iso || new Date().toISOString();
        const cityNameParts = aqiData.city.name.split(",");
        const countryName =
          cityNameParts.length > 1
            ? cityNameParts[cityNameParts.length - 1].trim()
            : "Unknown";

        const weather = aqiData.iaqi
          ? {
              t: aqiData.iaqi.t?.v,
              h: aqiData.iaqi.h?.v,
              w: aqiData.iaqi.w?.v,
            }
          : undefined;

        const forecast = aqiData.forecast?.daily?.pm25?.map((f: any) => ({
          day: f.day,
          avg: f.avg,
        }));

        setAirData({
          aqi: aqiData.aqi,
          city: aqiData.city.name,
          country: countryName,
          pollutants: {
            pm25: aqiData.iaqi?.pm25?.v || null,
            pm10: aqiData.iaqi?.pm10?.v || null,
            o3: aqiData.iaqi?.o3?.v || null,
            no2: aqiData.iaqi?.no2?.v || null,
            so2: aqiData.iaqi?.so2?.v || null,
            co: aqiData.iaqi?.co?.v || null,
          },
          dominantPollutant: aqiData.dominentpol,
          timestamp: timestamp,
          weather,
          forecast,
          geo: aqiData.city.geo,
          stationUrl: aqiData.city.url?.startsWith("http")
            ? aqiData.city.url
            : `https://aqicn.org/city/${aqiData.city.url}/`,
        });
      } else {
        setError(t.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const mapLabelKm = showMap ? "បិទផែនទី" : "បង្ហាញផែនទី";
  const mapLabelEn = showMap ? "Hide Map" : "Show Map";
  const mapToggleLabel = language === "km" ? mapLabelKm : mapLabelEn;

  const renderContent = () => {
    if (loading) return <LoadingState message={t.loading} />;

    if (error) {
      return (
        <ErrorState
          message={error}
          tryAgainText={t.tryAgain}
          onRetry={fetchAirQuality}
        />
      );
    }

    if (airData) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12 pb-12"
        >
          <MainAqiCard
            airData={airData}
            t={t}
            onRefresh={fetchAirQuality}
            language={language}
          />
          <PollutantGrid airData={airData} t={t} />
          <ForecastSection
            forecast={airData.forecast}
            t={t}
            language={language}
            stationUrl={airData.stationUrl}
          />
          <AdvisorySection t={t} />
          <AqiLegend t={t} />
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto">
        <Header
          t={t}
          language={language}
          showMap={showMap}
          onLanguageToggle={() => setLanguage(language === "km" ? "en" : "km")}
          onMapToggle={() => setShowMap(!showMap)}
          mapToggleLabel={mapToggleLabel}
          onCitySelect={setCity}
          currentCityId={city}
        />

        <AnimatePresence mode="wait">
          {showMap && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <MapSection city={city} language={language} geo={airData?.geo} />
            </motion.div>
          )}
        </AnimatePresence>

        {renderContent()}

        <Footer t={t} language={language} />
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-4 bg-white shadow-2xl rounded-2xl border border-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 z-[9999]"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&family=Outfit:wght@100..900&display=swap");

        :global(body) {
          font-family: "Kantumruy Pro", "Outfit", sans-serif;
          line-height: 1.6;
          scroll-behavior: smooth;
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
}
