import { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/dailyWeatherApi";
import type { WeatherData } from "../utils/dailyWeatherApi";
import { getWeatherDescription } from "../utils/wmoCodes";
import { formatTemp } from "../utils/formatTemp";

function weekdayName(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "long" });
}

export function TodayWeather({ unit = "F" as "C" | "F" }: { unit?: "C" | "F" }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) return <div className="dailyWeather">Loading weather data...</div>;
  if (error) return <div className="dailyWeather">Error: {error}</div>;
  if (!weatherData) return <div className="dailyWeather">No data available</div>;

  // find today's index (match date part only)
  const today = new Date();
  const todayIndex = weatherData.daily.time.findIndex((d) => {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });

  const index = todayIndex >= 0 ? todayIndex : 0;
  const date = weatherData.daily.time[index];

  return (
    <div className="dailyWeather">
      <div className="weatherForecast">
        <div className="weatherDay">
          <h3>Today is {weekdayName(date)}!</h3>
          <p>Temperature: {formatTemp(weatherData.daily.temperature_2m_mean[index], unit)}</p>
          <p>Weather: {getWeatherDescription(Math.round(weatherData.daily.weather_code[index]))}</p>
          <p>Wind Speed: {weatherData.daily.wind_speed_10m_mean[index]} km/h</p>
          <p className="weatherCode">(Code: {weatherData.daily.weather_code[index]})</p>
        </div>
      </div>
    </div>
  );
}

export default TodayWeather;
