import { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/dailyWeatherApi";
import type { WeatherData } from "../utils/dailyWeatherApi";
import { wmoToIcon } from "../utils/wmoCodes";
import { formatTemp } from "../utils/formatTemp";

function weekdayName(date: Date) {
	return date.toLocaleDateString(undefined, { weekday: "short" });
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
			<div className="flex flex-row flex-wrap md:flex-nowrap text-[#4A4A4A]">
				{slice.map((date, idx) => {
					const index = start + idx;
					return (
						<div key={index} className={`flex-1 min-w-0 ${idx < slice.length - 1 ? 'border-r border-[#D8D8D8]' : ''} p-4`}>
								<p className="text-sm">{weekdayName(date)}</p>
								<i className={`wi wi-${wmoToIcon[Math.round(weatherData.daily.weather_code[index])] || 'na'} text-5xl text-[#65AED5]`}></i>
								<p className="text-2xl">{formatTemp(weatherData.daily.temperature_2m_mean[index], unit)}</p>
							</div>
					);
				})}
			</div>
	);
}
