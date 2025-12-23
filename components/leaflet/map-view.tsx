"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { CAMBODIA_BOUNDS, CAMBODIA_CENTER } from "@/lib/cambodia";
import L from "leaflet";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import PoliceImage from "@/public/assets/police.png";

// Custom marker icon using Lucide MapPin
const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div className="absolute w-8 h-8 bg-primary/20 rounded-full animate-ping" />
      <MapPin className="text-primary fill-primary/20" size={32} />
    </div>
  ),
  className: "custom-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapView({ posts }: any) {
  const [isLocating, setIsLocating] = useState(false);

  function LocationController() {
    const map = useMap();
    return null;
  }

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
          map.flyTo([latitude, longitude], 16);
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
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shadow-md gap-2 bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleFindMyLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Navigation size={16} />
          )}
          {isLocating ? "Locating..." : "Find My Location"}
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl bg-card">
        <MapContainer
          center={CAMBODIA_CENTER}
          zoom={10}
          minZoom={6}
          maxZoom={18}
          maxBounds={[
            [CAMBODIA_BOUNDS.minLat, CAMBODIA_BOUNDS.minLng],
            [CAMBODIA_BOUNDS.maxLat, CAMBODIA_BOUNDS.maxLng],
          ]}
          maxBoundsViscosity={1.0}
          style={{ height: 500, width: "100%" }}
          className="z-0"
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
                  <Popup className="custom-popup">
                    <div className="flex flex-col gap-2 p-1">
                      <div className="overflow-hidden rounded-lg border border-border">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt="Post image"
                            className="w-full h-auto object-cover aspect-square min-w-50"
                          />
                        ) : (
                          <div className="w-full min-w-50 aspect-square flex items-center justify-center bg-muted">
                            {/* <Image className='w-12 h-12 text-muted-foreground' /> */}
                            <Image
                              src={PoliceImage}
                              alt="Police"
                              className="w-full h-auto object-cover aspect-square min-w-50"
                            />
                          </div>
                        )}
                      </div>
                      {post.createdAt && (
                        <p className="text-xs text-muted-foreground text-center">
                          {formatTimeAgo(post.createdAt)}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
