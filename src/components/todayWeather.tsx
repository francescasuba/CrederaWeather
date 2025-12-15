import { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/dailyWeatherApi";
import type { WeatherData } from "../utils/dailyWeatherApi";
import { getWeatherDescription, wmoToIcon } from "../utils/wmoCodes";
import { formatWindSpeed } from "../utils/formatWindSpeed";
import formatTemp from "../utils/formatTemp";
import { getTodayIndex } from "../utils/getTodaysDate";

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

  const todayIndex = getTodayIndex(weatherData.daily.time);

  const index = todayIndex >= 0 ? todayIndex : 0;
  

  return (
    <div className="weatherDay flex items-center space-x-4 p-r-1">
      <p className="text-[#65AED5] text-5xl">{formatTemp(weatherData.daily.temperature_2m_mean[index], unit)}</p>
      <i className={`wi wi-${wmoToIcon[Math.round(weatherData.daily.weather_code[index])] || 'na'} text-5xl text-[#65AED5]`}></i>
      <div>
        <p className="text-[#65AED5] font-semibold text-sm">{getWeatherDescription(Math.round(weatherData.daily.weather_code[index]))}</p>
        <p className="text-[#65AED5] font-semibold text-sm">{formatWindSpeed(weatherData.daily.wind_speed_10m_mean[index], unit)}</p>
      </div>
    </div>
  );
}

export default TodayWeather;
