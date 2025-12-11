import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
	latitude: number;
	longitude: number;
	elevation: number;
	timezone: string;
	timezoneAbbreviation: string;
	daily: {
		time: Date[];
		weather_code: Float32Array;
		temperature_2m_mean: Float32Array;
		wind_speed_10m_mean: Float32Array;
	};
}

export async function fetchWeatherData(): Promise<WeatherData> {
	const params = {
		latitude: 32.7831,
		longitude: -96.8067,
		daily: ["weather_code", "temperature_2m_mean", "wind_speed_10m_mean"],
		timezone: "America/Chicago",
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];

	const latitude = response.latitude();
	const longitude = response.longitude();
	const elevation = response.elevation();
	const timezone = response.timezone()!;
	const timezoneAbbreviation = response.timezoneAbbreviation()!;
	const utcOffsetSeconds = response.utcOffsetSeconds();

	const daily = response.daily()!;

	const times = Array.from(
		{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
		(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
	);

	return {
		latitude,
		longitude,
		elevation,
		timezone,
		timezoneAbbreviation,
		daily: {
			time: times,
			weather_code: daily.variables(0)!.valuesArray()!,
			temperature_2m_mean: daily.variables(1)!.valuesArray()!,
			wind_speed_10m_mean: daily.variables(2)!.valuesArray()!,
		},
	};
}
