export interface AirQualityData {
  aqi: number;
  city: string;
  country: string;
  pollutants: {
    pm25: number | null;
    pm10: number | null;
    o3: number | null;
    no2: number | null;
    so2: number | null;
    co: number | null;
  };
  dominantPollutant: string;
  timestamp: string;
  weather?: {
    t?: number;
    h?: number;
    w?: number;
  };
  forecast?: {
    day: string;
    avg: number;
  }[];
  geo?: [number, number];
  stationUrl?: string;
}

export type Language = "km" | "en";
