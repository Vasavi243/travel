import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { DestinationDetails } from "./pages/DestinationDetails";
import { NotFound } from "./pages/NotFound";
import { getCurrentUserLocation } from "./services/locationService";
import { getWeatherByCoords, getWeatherByCity } from "./services/weatherService";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export function App() {
  // Single Source of Truth for WeatherCard display
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [currentBrowserLocation, setCurrentBrowserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [locationToast, setLocationToast] = useState(null);

  // Request ID sequence counter to prevent race conditions on fast consecutive searches
  const requestIdRef = useRef(0);

  /**
   * Manual Search and Quick Picks handler
   * Resolves city coordinates & fetches weather for selected city
   */
  const handleSelectCity = async (cityName) => {
    const query = (cityName || "").trim();
    if (!query) return;

    const currentReqId = ++requestIdRef.current;
    setWeatherLoading(true);
    setWeatherError("");

    try {
      const weather = await getWeatherByCity(query);
      if (currentReqId === requestIdRef.current) {
        setSelectedWeather(weather);
        setWeatherError("");
      }
      return weather;
    } catch (err) {
      if (currentReqId === requestIdRef.current) {
        const errorMsg = err.message || "City not found. Please try another location.";
        setWeatherError(errorMsg);
      }
      throw err;
    } finally {
      if (currentReqId === requestIdRef.current) {
        setWeatherLoading(false);
      }
    }
  };

  /**
   * Browser Geolocation Trigger
   * Only called on initial mount (once) or when user explicitly clicks "Use My Location"
   */
  const handleUseMyLocation = async (isInitial = false) => {
    const currentReqId = ++requestIdRef.current;
    setIsLocating(true);
    setWeatherLoading(true);
    if (!isInitial) {
      setLocationToast(null);
      setWeatherError("");
    }

    try {
      const coords = await getCurrentUserLocation();
      const weather = await getWeatherByCoords(
        coords.lat,
        coords.lon,
        "Your Location"
      );

      if (currentReqId === requestIdRef.current) {
        setCurrentBrowserLocation({
          cityName: weather.cityName,
          country: weather.country,
          lat: coords.lat,
          lon: coords.lon
        });
        setSelectedWeather(weather);
        setWeatherError("");

        if (!isInitial) {
          setLocationToast({
            type: "success",
            title: "Location Detected Successfully",
            message: `Currently in ${weather.cityName} • ${weather.temp}°C, ${weather.condition}`
          });
        }
      }
    } catch (err) {
      console.warn("Location detection notice:", err);
      if (isInitial) {
        // If initial browser geolocation fails or is denied, initialize with sensible default (Paris)
        try {
          const defaultWeather = await getWeatherByCity("Paris");
          if (currentReqId === requestIdRef.current) {
            setSelectedWeather(defaultWeather);
          }
        } catch {
          // Graceful fallback handled
        }
      } else {
        if (currentReqId === requestIdRef.current) {
          setLocationToast({
            type: "error",
            title: "Location Access Notice",
            message: err.message || "Could not retrieve your geographic coordinates."
          });
        }
      }
    } finally {
      if (currentReqId === requestIdRef.current) {
        setIsLocating(false);
        setWeatherLoading(false);
      }
    }
  };

  /**
   * Refresh Weather for currently selected city
   * Does NOT call browser geolocation; refreshes the active selectedLocation
   */
  const handleRefreshWeather = async () => {
    if (!selectedWeather) return;

    const currentReqId = ++requestIdRef.current;
    setWeatherLoading(true);
    setWeatherError("");

    try {
      let refreshed;
      if (selectedWeather.coordinates?.lat && selectedWeather.coordinates?.lon) {
        refreshed = await getWeatherByCoords(
          selectedWeather.coordinates.lat,
          selectedWeather.coordinates.lon,
          selectedWeather.cityName
        );
      } else if (selectedWeather.cityName) {
        refreshed = await getWeatherByCity(selectedWeather.cityName);
      }

      if (refreshed && currentReqId === requestIdRef.current) {
        setSelectedWeather({
          ...refreshed,
          cityName: selectedWeather.cityName,
          country: selectedWeather.country || refreshed.country
        });
      }
    } catch (err) {
      if (currentReqId === requestIdRef.current) {
        setWeatherError(err.message || "Failed to refresh meteorological telemetry.");
      }
    } finally {
      if (currentReqId === requestIdRef.current) {
        setWeatherLoading(false);
      }
    }
  };

  // Initial Load: Run ONCE on mount
  useEffect(() => {
    let isMounted = true;
    const initApp = async () => {
      try {
        const coords = await getCurrentUserLocation();
        const weather = await getWeatherByCoords(
          coords.lat,
          coords.lon,
          "Your Location"
        );
        if (isMounted) {
          setCurrentBrowserLocation({
            cityName: weather.cityName,
            country: weather.country,
            lat: coords.lat,
            lon: coords.lon
          });
          setSelectedWeather(weather);
        }
      } catch {
        try {
          const defaultWeather = await getWeatherByCity("Paris");
          if (isMounted) {
            setSelectedWeather(defaultWeather);
          }
        } catch {
          // Graceful fallback
        }
      }
    };
    initApp();
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Sticky Navbar */}
        <Navbar
          onUseMyLocation={() => handleUseMyLocation(false)}
          isLocating={isLocating}
        />

        {/* Global Toast Notification */}
        {locationToast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
            <div
              className={`p-4 rounded-2xl glass-panel border shadow-2xl flex items-start gap-3 ${
                locationToast.type === "success"
                  ? "border-cyan-500/40 bg-slate-900/90 text-white"
                  : "border-amber-500/40 bg-slate-900/90 text-amber-200"
              }`}
            >
              {locationToast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h5 className="text-xs font-bold">{locationToast.title}</h5>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {locationToast.message}
                </p>
              </div>
              <button
                onClick={() => setLocationToast(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedWeather={selectedWeather}
                  weatherLoading={weatherLoading}
                  weatherError={weatherError}
                  isLocating={isLocating}
                  currentBrowserLocation={currentBrowserLocation}
                  onSelectCity={handleSelectCity}
                  onUseMyLocation={() => handleUseMyLocation(false)}
                  onRefreshWeather={handleRefreshWeather}
                />
              }
            />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
