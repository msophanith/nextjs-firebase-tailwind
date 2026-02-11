export const getAQILevel = (aqi: number) => {
  if (aqi <= 50)
    return {
      level: "Good",
      color: "from-green-400 to-emerald-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    };
  if (aqi <= 100)
    return {
      level: "Moderate",
      color: "from-yellow-400 to-amber-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    };
  if (aqi <= 150)
    return {
      level: "Unhealthy for Sensitive",
      color: "from-orange-400 to-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
    };
  if (aqi <= 200)
    return {
      level: "Unhealthy",
      color: "from-red-400 to-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    };
  if (aqi <= 300)
    return {
      level: "Very Unhealthy",
      color: "from-purple-400 to-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    };
  return {
    level: "Hazardous",
    color: "from-rose-600 to-rose-700",
    textColor: "text-rose-700",
    bgColor: "bg-rose-50",
  };
};

export const getHealthRecommendation = (aqi: number, t: any) => {
  if (aqi <= 50) return t.healthRecommendations.good;
  if (aqi <= 100) return t.healthRecommendations.moderate;
  if (aqi <= 150) return t.healthRecommendations.unhealthySensitive;
  if (aqi <= 200) return t.healthRecommendations.unhealthy;
  if (aqi <= 300) return t.healthRecommendations.veryUnhealthy;
  return t.healthRecommendations.hazardous;
};
