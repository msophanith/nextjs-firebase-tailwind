"use client";

interface AqiLegendProps {
  readonly t: any;
}

export function AqiLegend({ t }: AqiLegendProps) {
  const legendItems = [
    { range: "0-50", color: "bg-green-500" },
    { range: "51-100", color: "bg-yellow-500" },
    { range: "101-150", color: "bg-orange-500" },
    { range: "151-200", color: "bg-red-500" },
    { range: "201-300", color: "bg-purple-500" },
    { range: "301+", color: "bg-rose-700" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
      <h3 className="text-2xl font-bold mb-4">{t.understandingAQI}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {legendItems.map((item) => (
          <div key={item.range} className="text-center">
            <div className={`${item.color} rounded-lg p-3 mb-2`}>
              <p className="font-bold text-sm">{item.range}</p>
            </div>
            <p className="text-xs opacity-90">
              {t.aqiRanges[item.range as keyof typeof t.aqiRanges]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
