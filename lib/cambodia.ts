export const CAMBODIA_BOUNDS = {
  minLat: 9.5,
  maxLat: 14.7,
  minLng: 102.3,
  maxLng: 107.6,
};

export function isInsideCambodia(lat: number, lng: number) {
  return (
    lat >= CAMBODIA_BOUNDS.minLat &&
    lat <= CAMBODIA_BOUNDS.maxLat &&
    lng >= CAMBODIA_BOUNDS.minLng &&
    lng <= CAMBODIA_BOUNDS.maxLng
  );
}

export const CAMBODIA_CENTER: [number, number] = [
  11.540972617031802, 104.92244439518558,
];
