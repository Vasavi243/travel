import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes with clsx and twMerge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Maps OpenWeather icon codes to user-friendly emoji or icons
 */
export function getWeatherEmoji(iconCode) {
  if (!iconCode) return "🌤️";
  if (iconCode.startsWith("01")) return "☀️"; // Clear
  if (iconCode.startsWith("02")) return "🌤️"; // Few clouds
  if (iconCode.startsWith("03") || iconCode.startsWith("04")) return "☁️"; // Clouds
  if (iconCode.startsWith("09") || iconCode.startsWith("10")) return "🌧️"; // Rain
  if (iconCode.startsWith("11")) return "⛈️"; // Thunderstorm
  if (iconCode.startsWith("13")) return "❄️"; // Snow
  if (iconCode.startsWith("50")) return "🌫️"; // Mist
  return "🌤️";
}

/**
 * Capitalizes words in a string
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}