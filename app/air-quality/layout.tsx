import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Air Quality Monitor | Real-time Global AQI Data",
  description:
    "Monitor real-time air quality index (AQI) globally. High-precision data for PM2.5, PM10, and Ozone with interactive maps and health advisories.",
  keywords: [
    "air quality",
    "AQI",
    "PM2.5",
    "real-time air pollution",
    "pollution monitor",
  ],
  openGraph: {
    title: "Live Air Quality Monitor",
    description:
      "Monitor real-time air quality index (AQI) globally with interactive distribution maps.",
    type: "website",
    images: [
      {
        url: "https://aqicn.org/images/logo-80.png", // Fallback logo
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function AirQualityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
