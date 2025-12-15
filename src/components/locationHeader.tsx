import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/dailyWeatherApi";
import type { WeatherData } from "../utils/dailyWeatherApi";

export function LocationHeader({ loading, setLoading }: { loading: boolean, setLoading: (v: boolean) => void }) {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);

	const [city, setCity] = useState<string | null>(null);
	const [stateName, setStateName] = useState<string | null>(null);

	function weekdayName(date: Date) {
        return date.toLocaleDateString('en-US', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    }

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchWeatherData();
				setWeatherData(data);
				// reverse-geocode to get city/state
				try {
					const res = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${data.latitude}&lon=${data.longitude}&format=json`
					);
					if (res.ok) {
						const json = await res.json();
						const addr = json.address || {};
						const resolvedCity = addr.city || addr.town || addr.village || addr.hamlet || addr.county || null;
						const resolvedState = addr.state || addr.region || null;
						setCity(resolvedCity);
						setStateName(resolvedState);
					}
				} catch (geErr) {
					// ignore geocoding errors, keep coordinates as fallback
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch weather data");
			} finally {
				setLoading(false);
			}
		};
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <div className="weatherHeader">Loading location...</div>;
	if (error) return <div className="weatherHeader">Error: {error}</div>;
	if (!weatherData) return <div className="weatherHeader">No location data</div>;

	const renderLocation = () => {
		if (city || stateName) return (
			<>
				{city ? city : null}{city && stateName ? ", " : null}{stateName ? stateName : null}
			</>
		);
		return (
			<>
				{weatherData.latitude}°N {weatherData.longitude}°E
			</>
		);
	};

	return (
			<div className="weatherHeader text-white p-6">
				<div className="flex items-center justify-center gap-2 min-h-[1.5em]">
					<img src="/src/assets/location.png" alt="Location" className="h-[1.5em] inline-block" />
					<p className="font-semibold text-lg">{renderLocation()}</p>
				</div>
                <h3 className="text-sm font-normal">{weekdayName(new Date())}</h3>
			</div>
	);
}

export default LocationHeader;

