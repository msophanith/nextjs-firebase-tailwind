'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { CAMBODIA_BOUNDS, CAMBODIA_CENTER } from '@/lib/cambodia';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom marker icon
const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className='relative flex items-center justify-center'>
      <MapPin className='text-primary fill-primary/20' size={32} />
    </div>
  ),
  className: 'custom-div-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

type Props = {
  onSelect: (lat: number, lng: number) => void;
};

export default function ManualLocationPicker({ onSelect }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return position ? <Marker position={position} icon={customIcon} /> : null;
  }

  return (
    <div className='h-[300px] w-full relative'>
      <MapContainer
        center={CAMBODIA_CENTER}
        zoom={7}
        minZoom={6}
        maxZoom={18}
        maxBounds={[
          [CAMBODIA_BOUNDS.minLat, CAMBODIA_BOUNDS.minLng],
          [CAMBODIA_BOUNDS.maxLat, CAMBODIA_BOUNDS.maxLng],
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        className='z-0'
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <LocationMarker />
      </MapContainer>
      <div className='absolute bottom-2 right-2 z-[1000] bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] border border-border pointer-events-none'>
        Click on map to set location
      </div>
    </div>
  );
}
