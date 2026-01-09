"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

// Fix for default marker icon in Next.js/Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function WeddingMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [instanceId] = useState(
    () => `map-${Math.random().toString(36).substr(2, 9)}`
  );
  const mapRef = useRef<L.Map | null>(null);
  const position: [number, number] = [11.5868, 104.8885];

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.error("Error removing map:", e);
        }
        mapRef.current = null;
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="h-full w-full relative z-0 isolate">
      <MapContainer
        key={instanceId}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-[#8B0000]">
                The Premier Center Sen Sok
              </h3>
              <p className="text-sm">Wedding Venue</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
