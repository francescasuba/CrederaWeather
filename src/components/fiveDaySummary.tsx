import { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/dailyWeatherApi";
import type { WeatherData } from "../utils/dailyWeatherApi";
import { getWeatherDescription } from "../utils/wmoCodes";
import { formatTemp } from "../utils/formatTemp";

function weekdayName(date: Date) {
	return date.toLocaleDateString(undefined, { weekday: "long" });
}

export function FiveDaySummary({ unit = "F" as "C" | "F" }: { unit?: "C" | "F" }) {
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
	const todayIndex = weatherData.daily.time.findIndex(d => {
		return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
	});

	const start = todayIndex >= 0 ? todayIndex + 1 : 0; // next day
	const end = Math.min(start + 5, weatherData.daily.time.length);
	const slice = weatherData.daily.time.slice(start, end);

	return (
		// <div className="dailyWeather">
			<div className="border-2 border-indigo-600 flex flex-row flex-wrap md:flex-nowrap gap-4 m-8">
				{slice.map((date, idx) => {
					const index = start + idx;
					return (
						<div key={index} className="flex-1 min-w-0 border border-indigo-600 p-4">
								<h3>{weekdayName(date)}</h3>
								<p>Temperature: {formatTemp(weatherData.daily.temperature_2m_mean[index], unit)}</p>
								<p>Weather: {getWeatherDescription(Math.round(weatherData.daily.weather_code[index]))}</p>
								<p>Wind Speed: {weatherData.daily.wind_speed_10m_mean[index]} km/h</p>
								<p className="weatherCode">(Code: {weatherData.daily.weather_code[index]})</p>
							</div>
					);
				})}
			</div>
		// </div>
	);
}
