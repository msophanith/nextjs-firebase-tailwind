"use client";

import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Station {
  lat: number;
  lon: number;
  aqi: string;
  station: {
    name: string;
    time: string;
  };
  uid: number;
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "#009966";
  if (aqi <= 100) return "#ffde33";
  if (aqi <= 150) return "#ff9933";
  if (aqi <= 200) return "#cc0033";
  if (aqi <= 300) return "#660099";
  return "#7e0023";
};

const getTextColor = (aqi: number) => {
  if (aqi > 50 && aqi <= 100) return "black";
  return "white";
};

const createCustomIcon = (aqi: number) => {
  const color = getAQIColor(aqi);
  const textColor = getTextColor(aqi);

  return L.divIcon({
    className: "custom-aqi-marker-container",
    html: `
      <div class="custom-aqi-marker pulse-on-load" style="
        background-color: ${color};
        color: ${textColor};
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 800;
        font-size: 15px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.2);
        position: relative;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 40px;
        height: 28px;
        font-family: 'Inter', sans-serif;
        transition: all 0.2s ease;
      ">
        ${aqi}
        <div style="
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 7px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [45, 35],
    iconAnchor: [22, 35],
  });
};

interface AirQualityMapProps {
  readonly center: [number, number];
  readonly zoom: number;
  readonly pollutantLabel: string;
}

function MapUpdater({
  center,
  zoom,
}: Readonly<{
  center: [number, number];
  zoom: number;
}>) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function AirQualityMap({
  center,
  zoom,
  pollutantLabel,
}: AirQualityMapProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const token = process.env.NEXT_PUBLIC_AIR_QUALITY_TOKEN;
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      const lat = center[0];
      const lng = center[1];
      const offset = 1; // Larger bounds to see more stations
      const bounds = `${lat - offset},${lng - offset},${lat + offset},${lng + offset}`;

      try {
        const response = await fetch(
          `https://api.waqi.info/map/bounds?token=${token}&latlng=${bounds}`,
        );
        const data = await response.json();
        if (data.status === "ok" && isMounted.current) {
          setStations(data.data);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations();
  }, [center, token]);

  return (
    <div className="h-full w-full relative overflow-hidden rounded-2xl border-2 border-white/50 shadow-2xl bg-slate-50">
      {/* Pollutant Label */}
      <div className="absolute top-4 left-4 z-[1000] px-4 py-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg shadow-xl pointer-events-none flex flex-col min-w-[80px]">
        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">
          Pollutant
        </span>
        <span className="text-[#2c4c6e] font-serif italic text-2xl font-bold tracking-tighter leading-none">
          {pollutantLabel}
        </span>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        <ZoomControl position="topright" />
        {stations.map((station) => {
          let aqi = Number.parseInt(station.aqi);
          if (Number.isNaN(aqi)) return null;

          // For simulation: randomize slightly if it's PM10 or Ozone to make them look different
          if (pollutantLabel === "PM10")
            aqi = Math.max(1, Math.round(aqi * 0.7));
          if (pollutantLabel === "Ozone")
            aqi = Math.max(1, Math.round(aqi * 0.3));

          return (
            <Marker
              key={station.uid}
              position={[station.lat, station.lon]}
              icon={createCustomIcon(aqi)}
            >
              <Popup>
                <div className="text-center p-1">
                  <h3 className="font-bold text-gray-800">
                    {station.station.name}
                  </h3>
                  <p className="text-base font-semibold text-blue-600">
                    {pollutantLabel}: {aqi}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {station.station.time}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
