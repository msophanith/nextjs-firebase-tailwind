"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { CAMBODIA_BOUNDS, CAMBODIA_CENTER } from "@/lib/cambodia";
import L from "leaflet";
import { MapPin, Navigation, Loader2, Clock, ShieldAlert } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import PoliceImage from "@/public/assets/police.png";

// Custom marker icon with a premium look and pulse effect
const createCustomIcon = (color: string = "#3b82f6") =>
  L.divIcon({
    html: renderToStaticMarkup(
      <div className="relative flex items-center justify-center">
        <div className="absolute w-10 h-10 bg-blue-500/15 rounded-full animate-ping" />
        <div className="absolute w-6 h-6 bg-blue-500/20 rounded-full blur-sm" />
        <div className="relative bg-white p-1.5 rounded-full border-2 border-blue-500 shadow-xl">
          <ShieldAlert className="text-blue-600" size={16} />
        </div>
      </div>
    ),
    className: "custom-div-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

const customIcon = createCustomIcon();

export default function MapView({ posts }: any) {
  const [isLocating, setIsLocating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (!mounted) return null;

  const FindMyLocationButton = () => {
    const map = useMap();

    const handleFindMyLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }

      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.flyTo([latitude, longitude], 16, {
            duration: 2,
          });
          setIsLocating(false);
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
      <div className="absolute bottom-6 right-6 z-[1000]">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="h-12 w-12 rounded-2xl shadow-xl bg-white hover:bg-gray-50 text-blue-600 border border-blue-100 transition-all active:scale-95 flex items-center justify-center p-0"
          onClick={handleFindMyLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Navigation size={20} fill="currentColor" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="relative h-full w-full overflow-hidden rounded-[3rem] border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white">
        <MapContainer
          key="main-map-view"
          center={CAMBODIA_CENTER}
          zoom={10}
          minZoom={6}
          maxZoom={18}
          maxBounds={[
            [CAMBODIA_BOUNDS.minLat, CAMBODIA_BOUNDS.minLng],
            [CAMBODIA_BOUNDS.maxLat, CAMBODIA_BOUNDS.maxLng],
          ]}
          maxBoundsViscosity={1.0}
          style={{ height: 600, width: "100%" }}
          className="z-0"
          zoomControl={true}
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

          <FindMyLocationButton />

          {posts?.map(
            (post: any) =>
              post.location && (
                <Marker
                  key={post.id}
                  position={[post.location.lat, post.location.lng]}
                  icon={customIcon}
                >
                  <Popup className="premium-popup">
                    <div className="flex flex-col w-64 overflow-hidden bg-white border border-blue-100 rounded-3xl shadow-2xl">
                      <div className="relative aspect-video w-full overflow-hidden">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt="Alert image"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50">
                            <Image
                              src={PoliceImage}
                              alt="Police"
                              className="w-1/2 h-auto opacity-40"
                            />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                          Active Alert
                        </div>
                      </div>

                      <div className="p-5 space-y-4 bg-white">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock size={14} className="text-blue-400" />
                          <span className="text-xs font-semibold">
                            {post.createdAt
                              ? formatTimeAgo(post.createdAt)
                              : "Just now"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-2 rounded-xl">
                          <MapPin size={14} />
                          <span className="text-[10px] font-black tracking-tight truncate">
                            {post.location.lat.toFixed(4)},{" "}
                            {post.location.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>

      {/* Map Overlay Info */}
      <div className="absolute top-12 left-12 z-[1000] pointer-events-none hidden md:block">
        <div className="px-5 py-2 bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl">
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Live Intelligence Map
          </p>
        </div>
      </div>
    </div>
  );
}
