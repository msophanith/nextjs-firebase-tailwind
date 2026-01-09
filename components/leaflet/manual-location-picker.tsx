"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  CAMBODIA_BOUNDS,
  CAMBODIA_CENTER,
  isInsideCambodia,
} from "@/lib/cambodia";
import L from "leaflet";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/button";

// Custom marker icon
const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <MapPin className="text-primary fill-primary/20" size={32} />
    </div>
  ),
  className: "custom-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

type Props = {
  onSelect: (lat: number, lng: number) => void;
};

function LocationMarker({
  position,
  setPosition,
  onSelect,
  isLocating,
  setIsLocating,
}: {
  position: { lat: number; lng: number } | null;
  setPosition: (pos: { lat: number; lng: number }) => void;
  onSelect: (lat: number, lng: number) => void;
  isLocating: boolean;
  setIsLocating: (val: boolean) => void;
}) {
  const map = useMap();

  useMapEvents({
    click(e) {
      if (!isInsideCambodia(e.latlng.lat, e.latlng.lng)) {
        alert("Please select a location within Cambodia.");
        return;
      }
      setPosition(e.latlng);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  // Effect to pan map when position is set via geolocation
  useEffect(() => {
    if (position && isLocating) {
      map.flyTo(position, 16);
      setIsLocating(false);
    }
  }, [position, map, isLocating, setIsLocating]);

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

export default function ManualLocationPicker({ onSelect }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLocating, setIsLocating] = useState(false);
  const [instanceId] = useState(
    () => `map-${Math.random().toString(36).substr(2, 9)}`
  );
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
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

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!isInsideCambodia(latitude, longitude)) {
          setIsLocating(false);
          alert(
            "Your current location is outside of Cambodia. Please pin a location manually."
          );
          return;
        }
        const newPos = { lat: latitude, lng: longitude };
        setPosition(newPos);
        onSelect(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="h-[300px] w-full relative group">
      <MapContainer
        key={instanceId}
        center={CAMBODIA_CENTER}
        zoom={7}
        minZoom={6}
        maxZoom={18}
        maxBounds={[
          [CAMBODIA_BOUNDS.minLat, CAMBODIA_BOUNDS.minLng],
          [CAMBODIA_BOUNDS.maxLat, CAMBODIA_BOUNDS.maxLng],
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onSelect={onSelect}
          isLocating={isLocating}
          setIsLocating={setIsLocating}
        />
      </MapContainer>

      {/* Geolocation Button Overlay */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shadow-md gap-2 bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Navigation size={16} />
          )}
          {isLocating ? "Locating..." : "Use Current Location"}
        </Button>
      </div>

      <div className="absolute bottom-2 right-2 z-[1000] bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] border border-border pointer-events-none">
        Click on map or use button to set location
      </div>
    </div>
  );
}
