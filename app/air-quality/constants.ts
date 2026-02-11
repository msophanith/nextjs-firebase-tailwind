import { Language } from "./types";

export const translations = {
  km: {
    title: "គុណភាពខ្យល់",
    subtitle: "ទិន្នន័យគុណភាពខ្យល់ជាក់ស្តែងសម្រាប់ទីក្រុងរបស់អ្នក",
    loading: "កំពុងផ្ទុកទិន្នន័យគុណភាពខ្យល់...",
    error: "មិនអាចទាញយកទិន្នន័យគុណភាពខ្យល់បានទេ។ សូមព្យាយាមម្តងទៀត។",
    tryAgain: "ព្យាយាមម្តងទៀត",
    refresh: "ធ្វើឱ្យស្រស់",
    lastUpdated: "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ",
    dominant: "លេចធ្លោ",
    understandingAQI: "ការយល់ដឹងអំពី AQI",
    cities: {
      A908095: "ភ្នំពេញ, កម្ពុជា",
      Bangkok: "បាងកក, ថៃ",
      Singapore: "សិង្ហបុរី",
      Hanoi: "ហាណូយ, វៀតណាម",
      Jakarta: "ហ្សាការតា, ឥណ្ឌូនេស៊ី",
      Manila: "ម៉ានីល, ហ្វីលីពីន",
      "Ho Chi Minh": "ហូជីមិញ, វៀតណាម",
      Tokyo: "តូក្យូ, ជប៉ុន",
    },
    aqiLevels: {
      Good: "ល្អ",
      Moderate: "មធ្យម",
      "Unhealthy for Sensitive": "មិនល្អសម្រាប់អ្នកងាយរងគ្រោះ",
      Unhealthy: "មិនល្អ",
      "Very Unhealthy": "មិនល្អខ្លាំង",
      Hazardous: "គ្រោះថ្នាក់",
    },
    healthRecommendations: {
      good: "គុណភាពខ្យល់គឺល្អ។ រីករាយជាមួយសកម្មភាពខាងក្រៅ!",
      moderate:
        "គុណភាពខ្យល់អាចទទួលយកបាន។ បុគ្គលងាយរងគ្រោះគួរពិចារណាកំណត់ការប្រើប្រាស់កម្លាំងខាងក្រៅយូរ។",
      unhealthySensitive:
        "សមាជិកក្រុមងាយរងគ្រោះអាចជួបផលប៉ះពាល់សុខភាព។ សាធារណជនទូទៅមិនសូវរងផលប៉ះពាល់ទេ។",
      unhealthy:
        "មនុស្សគ្រប់គ្នាអាចចាប់ផ្តើមជួបផលប៉ះពាល់សុខភាព។ ក្រុមងាយរងគ្រោះអាចជួបផលប៉ះពាល់ធ្ងន់ធ្ងរជាងនេះ។",
      veryUnhealthy:
        "ការព្រមានសុខភាព៖ មនុស្សគ្រប់គ្នាអាចជួបផលប៉ះពាល់សុខភាពធ្ងន់ធ្ងរជាងនេះ។",
      hazardous: "ការព្រមានសុខភាពអាសន្ន។ ប្រជាជនទាំងមូលទំនងជារងផលប៉ះពាល់។",
    },
    pollutants: {
      pm25: { name: "PM2.5", description: "ភាគល្អិតតូច" },
      pm10: { name: "PM10", description: "ភាគល្អិតធំ" },
      o3: { name: "O₃", description: "អូហ្សូន" },
      no2: { name: "NO₂", description: "ណីត្រូសែនឌីអុកស៊ីត" },
      so2: { name: "SO₂", description: "ស៊ុលហ្វ័រឌីអុកស៊ីត" },
      co: { name: "CO", description: "កាបូនម៉ូណូអុកស៊ីត" },
    },
    aqiRanges: {
      "0-50": "ល្អ",
      "51-100": "មធ្យម",
      "101-150": "មិនល្អសម្រាប់អ្នកងាយរងគ្រោះ",
      "151-200": "មិនល្អ",
      "201-300": "មិនល្អខ្លាំង",
      "301+": "គ្រោះថ្នាក់",
    },
    source: "ប្រភពទិន្នន័យ៖ World Air Quality Index Project (waqi.info)",
    madeBy: "រៀបចំឡើងដោយ ❤️ ពី Jay",
    advisories: {
      title: "ដំបូន្មានការពារសុខភាព",
      mask: "ពាក់ម៉ាស N95 នៅខាងក្រៅ",
      purifier: "ប្រើម៉ាស៊ីនបន្សុទ្ធខ្យល់ក្នុងផ្ទះ",
      windows: "បិទបង្អួចក្នុងអំឡុងពេល AQI ខ្ពស់",
      exercise: "ចៀសវាងការហាត់ប្រាណនៅខាងក្រៅ",
      plants: "ដាំរុក្ខជាតិក្នុងផ្ទះដើម្បីខ្យល់ស្អាត",
      monitor: "ពិនិត្យគុណភាពខ្យល់ឱ្យបានទៀងទាត់",
    },
    forecast: {
      title: "ការព្យាករណ៍ AQI",
      tomorrow: "ថ្ងៃស្អែក",
      nextDays: "បណ្តាថ្ងៃបន្ទាប់",
    },
    weather: {
      temp: "សីតុណ្ហភាព",
      humidity: "សំណើម",
      wind: "ល្បឿនខ្យល់",
    },
  },
  en: {
    title: "Air Quality Monitor",
    subtitle: "Real-time air quality data for your city",
    loading: "Loading air quality data...",
    error: "Unable to fetch air quality data. Please try again.",
    tryAgain: "Try Again",
    refresh: "Refresh",
    lastUpdated: "Last updated",
    dominant: "Dominant",
    understandingAQI: "Understanding AQI",
    cities: {
      A908095: "Phnom Penh, Cambodia",
      Bangkok: "Bangkok, Thailand",
      Singapore: "Singapore",
      Hanoi: "Hanoi, Vietnam",
      Jakarta: "Jakarta, Indonesia",
      Manila: "Manila, Philippines",
      "Ho Chi Minh": "Ho Chi Minh, Vietnam",
      Tokyo: "Tokyo, Japan",
    },
    aqiLevels: {
      Good: "Good",
      Moderate: "Moderate",
      "Unhealthy for Sensitive": "Unhealthy for Sensitive",
      Unhealthy: "Unhealthy",
      "Very Unhealthy": "Very Unhealthy",
      Hazardous: "Hazardous",
    },
    healthRecommendations: {
      good: "Air quality is satisfactory. Enjoy outdoor activities!",
      moderate:
        "Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.",
      unhealthySensitive:
        "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      unhealthy:
        "Everyone may begin to experience health effects. Sensitive groups may experience more serious effects.",
      veryUnhealthy:
        "Health alert: everyone may experience more serious health effects.",
      hazardous:
        "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    },
    pollutants: {
      pm25: { name: "PM2.5", description: "Fine Particles" },
      pm10: { name: "PM10", description: "Coarse Particles" },
      o3: { name: "O₃", description: "Ozone" },
      no2: { name: "NO₂", description: "Nitrogen Dioxide" },
      so2: { name: "SO₂", description: "Sulfur Dioxide" },
      co: { name: "CO", description: "Carbon Monoxide" },
    },
    aqiRanges: {
      "0-50": "Good",
      "51-100": "Moderate",
      "101-150": "Unhealthy for Sensitive",
      "151-200": "Unhealthy",
      "201-300": "Very Unhealthy",
      "301+": "Hazardous",
    },
    source: "Data Source: World Air Quality Index Project (waqi.info)",
    madeBy: "Made with ❤️ by Jay",
    advisories: {
      title: "Health & Safety Advisories",
      mask: "Wear N95 Mask Outdoors",
      purifier: "Use Indoor Air Purifiers",
      windows: "Close Windows During High AQI",
      exercise: "Avoid Heavy Outdoor Exercise",
      plants: "Keep Indoor Plants for Clean Air",
      monitor: "Check Air Quality Regularly",
    },
    forecast: {
      title: "AQI Forecast",
      tomorrow: "Tomorrow",
      nextDays: "Coming Days",
    },
    weather: {
      temp: "Temperature",
      humidity: "Humidity",
      wind: "Wind Speed",
    },
  },
};

export const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  A908095: { lat: 11.5732374, lng: 104.9174903 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Hanoi: { lat: 21.0285, lng: 105.8542 },
  Jakarta: { lat: -6.2088, lng: 106.8456 },
  Manila: { lat: 14.5995, lng: 120.9842 },
  "Ho Chi Minh": { lat: 10.8231, lng: 106.6297 },
  Tokyo: { lat: 35.6895, lng: 139.6917 },
};
