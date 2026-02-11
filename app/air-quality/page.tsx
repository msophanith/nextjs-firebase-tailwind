"use client";

import { useState, useEffect } from "react";
import { translations } from "./constants";
import { AirQualityData, Language } from "./types";
import { Header } from "./components/Header";
import { CitySelector } from "./components/CitySelector";
import { MapSection } from "./components/MapSection";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { MainAqiCard } from "./components/MainAqiCard";
import { PollutantGrid } from "./components/PollutantGrid";
import { ForecastSection } from "./components/ForecastSection";
import { AdvisorySection } from "./components/AdvisorySection";
import { AqiLegend } from "./components/AqiLegend";
import { Footer } from "./components/Footer";

export default function AirQualityPage() {
  const [airData, setAirData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("A908095");
  const [language, setLanguage] = useState<Language>("km");
  const [showMap, setShowMap] = useState(false);

  const t = translations[language];

  useEffect(() => {
    fetchAirQuality();
  }, [city]);

  const fetchAirQuality = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.waqi.info/feed/${city}/?token=${process.env.NEXT_PUBLIC_AIR_QUALITY_TOKEN}`,
      );
      const data = await response.json();

      if (data.status === "ok") {
        const aqiData = data.data;

        let timestamp = new Date().toISOString();
        if (aqiData.time?.iso) {
          timestamp = aqiData.time.iso;
        }

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

  let mapToggleLabel = "";
  if (showMap) {
    mapToggleLabel = language === "km" ? "បិទផែនទី" : "Hide Map";
  } else {
    mapToggleLabel = language === "km" ? "បង្ហាញផែនទី" : "Show Map";
  }

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
        <div className="space-y-8 animate-slide-up">
          <MainAqiCard airData={airData} t={t} onRefresh={fetchAirQuality} />
          <PollutantGrid airData={airData} t={t} />
          <ForecastSection
            forecast={airData.forecast}
            t={t}
            language={language}
          />
          <AdvisorySection t={t} />
          <AqiLegend t={t} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header
          t={t}
          language={language}
          showMap={showMap}
          onLanguageToggle={() => setLanguage(language === "km" ? "en" : "km")}
          onMapToggle={() => setShowMap(!showMap)}
          mapToggleLabel={mapToggleLabel}
        />

        <CitySelector city={city} onCityChange={setCity} t={t} />

        {showMap && <MapSection city={city} language={language} />}

        {renderContent()}

        <Footer t={t} language={language} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        @import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&family=Freehand&display=swap");
        :global(body) {
          font-family: "Kantumruy Pro", sans-serif;
          line-height: 1.6;
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.2, 0, 0.2, 1);
        }
        .animate-slide-up {
          animation: slide-up 1.2s cubic-bezier(0.2, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
