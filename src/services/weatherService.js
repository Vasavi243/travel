/**
 * WanderAI Weather Service
 * Integrates with OpenWeather API with graceful fallbacks and caching.
 */

const OPENWEATHER_API_KEY =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_OPENWEATHER_API_KEY
    : (typeof process !== "undefined" && process.env ? process.env.VITE_OPENWEATHER_API_KEY : undefined);


// Realistic weather profiles based on destination coordinates and climates
const CLIMATE_PROFILES = {
  paris: { temp: 18, condition: "Partly Cloudy", icon: "03d", feelsLike: 17, humidity: 68, windSpeed: 12, country: "FR" },
  tokyo: { temp: 22, condition: "Clear Sky", icon: "01d", feelsLike: 22, humidity: 55, windSpeed: 9, country: "JP" },
  dubai: { temp: 34, condition: "Sunny & Warm", icon: "01d", feelsLike: 37, humidity: 42, windSpeed: 16, country: "AE" },
  bali: { temp: 29, condition: "Tropical Breeze", icon: "02d", feelsLike: 32, humidity: 78, windSpeed: 14, country: "ID" },
  "new york": { temp: 19, condition: "Breezy & Sunny", icon: "02d", feelsLike: 18, humidity: 58, windSpeed: 18, country: "US" },
  rome: { temp: 24, condition: "Sunny", icon: "01d", feelsLike: 25, humidity: 52, windSpeed: 11, country: "IT" },
  singapore: { temp: 30, condition: "Scattered Showers", icon: "10d", feelsLike: 35, humidity: 82, windSpeed: 10, country: "SG" },
  goa: { temp: 31, condition: "Warm Coastal Breeze", icon: "02d", feelsLike: 34, humidity: 76, windSpeed: 15, country: "IN" },
  london: { temp: 17, condition: "Light Drizzle", icon: "10d", feelsLike: 16, humidity: 75, windSpeed: 15, country: "GB" },
  barcelona: { temp: 25, condition: "Sunny Mediterranean", icon: "01d", feelsLike: 26, humidity: 58, windSpeed: 11, country: "ES" },
  amsterdam: { temp: 16, condition: "Breezy & Overcast", icon: "03d", feelsLike: 15, humidity: 72, windSpeed: 19, country: "NL" },
  venice: { temp: 23, condition: "Clear Skies", icon: "01d", feelsLike: 24, humidity: 60, windSpeed: 8, country: "IT" },
  florence: { temp: 26, condition: "Sunny & Warm", icon: "01d", feelsLike: 27, humidity: 50, windSpeed: 7, country: "IT" },
  prague: { temp: 18, condition: "Partly Sunny", icon: "02d", feelsLike: 18, humidity: 63, windSpeed: 10, country: "CZ" },
  vienna: { temp: 20, condition: "Mild & Pleasant", icon: "02d", feelsLike: 20, humidity: 59, windSpeed: 12, country: "AT" },
  santorini: { temp: 27, condition: "Golden Sun & Sea Breeze", icon: "01d", feelsLike: 28, humidity: 48, windSpeed: 20, country: "GR" },
  athens: { temp: 28, condition: "Bright & Sunny", icon: "01d", feelsLike: 29, humidity: 45, windSpeed: 14, country: "GR" },
  lisbon: { temp: 24, condition: "Sunny Atlantic Coast", icon: "01d", feelsLike: 24, humidity: 56, windSpeed: 16, country: "PT" },
  madrid: { temp: 27, condition: "Clear & Dry", icon: "01d", feelsLike: 27, humidity: 38, windSpeed: 9, country: "ES" },
  zurich: { temp: 19, condition: "Fresh Alpine Air", icon: "02d", feelsLike: 19, humidity: 65, windSpeed: 8, country: "CH" },
  interlaken: { temp: 16, condition: "Crisp Mountain Breeze", icon: "02d", feelsLike: 15, humidity: 70, windSpeed: 6, country: "CH" },
  istanbul: { temp: 22, condition: "Bosphorus Breeze", icon: "02d", feelsLike: 22, humidity: 64, windSpeed: 17, country: "TR" },
  bangkok: { temp: 33, condition: "Tropical Warmth", icon: "02d", feelsLike: 38, humidity: 74, windSpeed: 11, country: "TH" },
  phuket: { temp: 31, condition: "Warm Andaman Sea", icon: "02d", feelsLike: 36, humidity: 79, windSpeed: 13, country: "TH" },
  maldives: { temp: 30, condition: "Tropical Ocean Sun", icon: "01d", feelsLike: 34, humidity: 75, windSpeed: 12, country: "MV" },
  mumbai: { temp: 32, condition: "Humid Coastal Sun", icon: "02d", feelsLike: 37, humidity: 77, windSpeed: 14, country: "IN" },
  delhi: { temp: 29, condition: "Sunny", icon: "01d", feelsLike: 30, humidity: 45, windSpeed: 8, country: "IN" },
  jaipur: { temp: 31, condition: "Desert Sunshine", icon: "01d", feelsLike: 32, humidity: 35, windSpeed: 10, country: "IN" },
  kerala: { temp: 30, condition: "Lush Tropical Breeze", icon: "02d", feelsLike: 35, humidity: 81, windSpeed: 9, country: "IN" },
  seoul: { temp: 21, condition: "Clear & Crisp", icon: "01d", feelsLike: 21, humidity: 52, windSpeed: 11, country: "KR" },
  "hong kong": { temp: 28, condition: "Warm Subtropical", icon: "02d", feelsLike: 32, humidity: 76, windSpeed: 15, country: "HK" },
  "kuala lumpur": { temp: 32, condition: "Tropical Afternoon Clouds", icon: "03d", feelsLike: 37, humidity: 80, windSpeed: 7, country: "MY" },
  kyoto: { temp: 21, condition: "Serene & Clear", icon: "01d", feelsLike: 21, humidity: 58, windSpeed: 6, country: "JP" },
  hanoi: { temp: 28, condition: "Warm & Humid", icon: "02d", feelsLike: 32, humidity: 78, windSpeed: 10, country: "VN" },
  "los angeles": { temp: 24, condition: "Sunny Pacific Coast", icon: "01d", feelsLike: 24, humidity: 55, windSpeed: 10, country: "US" },
  "las vegas": { temp: 32, condition: "Hot Desert Sun", icon: "01d", feelsLike: 31, humidity: 18, windSpeed: 14, country: "US" },
  "san francisco": { temp: 17, condition: "Coastal Fog & Sun", icon: "03d", feelsLike: 16, humidity: 73, windSpeed: 21, country: "US" },
  miami: { temp: 29, condition: "Tropical Sun & Ocean Breeze", icon: "01d", feelsLike: 33, humidity: 72, windSpeed: 16, country: "US" },
  chicago: { temp: 18, condition: "Lake Michigan Breeze", icon: "02d", feelsLike: 17, humidity: 60, windSpeed: 22, country: "US" },
  toronto: { temp: 18, condition: "Pleasant & Clear", icon: "01d", feelsLike: 18, humidity: 57, windSpeed: 14, country: "CA" },
  vancouver: { temp: 16, condition: "Fresh Pacific Air", icon: "02d", feelsLike: 16, humidity: 68, windSpeed: 11, country: "CA" },
  cancun: { temp: 30, condition: "Caribbean Sunshine", icon: "01d", feelsLike: 34, humidity: 73, windSpeed: 15, country: "MX" },
  "rio de janeiro": { temp: 28, condition: "Tropical Beach Sun", icon: "01d", feelsLike: 31, humidity: 70, windSpeed: 13, country: "BR" },
  "buenos aires": { temp: 22, condition: "Mild & Sunny", icon: "01d", feelsLike: 22, humidity: 56, windSpeed: 15, country: "AR" },
  lima: { temp: 21, condition: "Mild Pacific Breeze", icon: "03d", feelsLike: 21, humidity: 77, windSpeed: 12, country: "PE" },
  "machu picchu": { temp: 17, condition: "Andean Mountain Breeze", icon: "02d", feelsLike: 17, humidity: 62, windSpeed: 9, country: "PE" },
  sydney: { temp: 23, condition: "Harbour Sun & Breeze", icon: "01d", feelsLike: 23, humidity: 58, windSpeed: 18, country: "AU" },
  melbourne: { temp: 19, condition: "Breezy & Changeable", icon: "02d", feelsLike: 18, humidity: 61, windSpeed: 19, country: "AU" },
  auckland: { temp: 19, condition: "Mild Maritime Sun", icon: "02d", feelsLike: 19, humidity: 67, windSpeed: 17, country: "NZ" },
  queenstown: { temp: 15, condition: "Crisp Alpine Air", icon: "01d", feelsLike: 14, humidity: 55, windSpeed: 10, country: "NZ" },
  "cape town": { temp: 22, condition: "Atlantic Coastal Sun", icon: "01d", feelsLike: 22, humidity: 60, windSpeed: 21, country: "ZA" },
  cairo: { temp: 29, condition: "Sunny & Dry", icon: "01d", feelsLike: 29, humidity: 35, windSpeed: 13, country: "EG" },
  marrakech: { temp: 28, condition: "Warm Desert Sun", icon: "01d", feelsLike: 28, humidity: 32, windSpeed: 10, country: "MA" },
  zanzibar: { temp: 30, condition: "Tropical Island Breeze", icon: "01d", feelsLike: 34, humidity: 76, windSpeed: 14, country: "TZ" },
  nairobi: { temp: 24, condition: "Mild & Sunny", icon: "02d", feelsLike: 24, humidity: 54, windSpeed: 11, country: "KE" },
  "abu dhabi": { temp: 33, condition: "Sunny & Warm", icon: "01d", feelsLike: 36, humidity: 45, windSpeed: 15, country: "AE" },
  doha: { temp: 33, condition: "Clear Arabian Sun", icon: "01d", feelsLike: 35, humidity: 48, windSpeed: 14, country: "QA" },
  muscat: { temp: 32, condition: "Sunny Coastal Warmth", icon: "01d", feelsLike: 34, humidity: 50, windSpeed: 12, country: "OM" },
  petra: { temp: 25, condition: "Desert Canyon Sun", icon: "01d", feelsLike: 24, humidity: 30, windSpeed: 12, country: "JO" }
};

function getFallbackWeather(queryName = "Default City") {
  const q = queryName.toLowerCase().trim();
  for (const [city, data] of Object.entries(CLIMATE_PROFILES)) {
    if (q.includes(city) || city.includes(q)) {
      return {
        ...data,
        cityName: queryName.charAt(0).toUpperCase() + queryName.slice(1),
        country: data.country || "",
        coordinates: { lat: 0, lon: 0 },
        isFallback: true,
        source: "Realistic Seasonal Simulation"
      };
    }
  }

  return {
    cityName: queryName.charAt(0).toUpperCase() + queryName.slice(1),
    country: "",
    coordinates: { lat: 0, lon: 0 },
    temp: 23,
    condition: "Mild & Clear",
    icon: "02d",
    feelsLike: 23,
    humidity: 62,
    windSpeed: 12,
    isFallback: true,
    source: "Realistic Seasonal Simulation"
  };
}


/**
 * Fetch weather by geographic coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} [fallbackCityName] - City name for fallback reference
 * @returns {Promise<Object>}
 */
export async function getWeatherByCoords(lat, lon, fallbackCityName = "") {
  if (
    OPENWEATHER_API_KEY &&
    OPENWEATHER_API_KEY !== "your_key_here" &&
    OPENWEATHER_API_KEY.trim().length > 10
  ) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        return {
          cityName: data.name || fallbackCityName || "Current Location",
          country: data.sys?.country || "",
          coordinates: { lat, lon },
          temp: Math.round(data.main?.temp ?? 20),
          feelsLike: Math.round(data.main?.feels_like ?? 20),
          condition: data.weather?.[0]?.main || "Clear",
          description: data.weather?.[0]?.description || "Clear sky",
          icon: data.weather?.[0]?.icon || "01d",
          humidity: data.main?.humidity ?? 60,
          windSpeed: Math.round((data.wind?.speed ?? 3) * 3.6), // convert m/s to km/h
          isFallback: false,
          source: "OpenWeather Live"
        };
      } else {
        console.warn(`OpenWeather returned error code ${res.status}. Falling back to simulation.`);
      }
    } catch (err) {
      console.warn("OpenWeather network failure:", err.message);
    }
  }

  // Graceful fallback
  const fallback = getFallbackWeather(fallbackCityName || "Current Coordinates");
  return {
    ...fallback,
    coordinates: { lat, lon }
  };
}

/**
 * Search city coordinates and fetch weather
 * @param {string} cityName - e.g. "Paris", "Tokyo", "London"
 * @returns {Promise<Object>}
 */
export async function getWeatherByCity(cityName) {
  const query = (cityName || "").trim();
  if (!query) {
    throw new Error("City not found. Please try another location.");
  }

  if (
    OPENWEATHER_API_KEY &&
    OPENWEATHER_API_KEY !== "your_key_here" &&
    OPENWEATHER_API_KEY.trim().length > 10
  ) {
    try {
      // 1. Direct Geocoding search
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=1&appid=${OPENWEATHER_API_KEY}`;

      const geoRes = await fetch(geoUrl);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          const { lat, lon, name, country } = geoData[0];
          const weather = await getWeatherByCoords(lat, lon, `${name}, ${country}`);
          return {
            ...weather,
            cityName: name,
            country: country || weather.country,
            coordinates: { lat, lon }
          };
        } else {
          throw new Error("City not found. Please try another location.");
        }
      } else {
        throw new Error("City not found. Please try another location.");
      }
    } catch (err) {
      if (err.message === "City not found. Please try another location.") {
        throw err;
      }
      console.warn("Geocoding fetch error:", err.message);
    }
  }

  // Fallback
  return getFallbackWeather(query);
}