export function formatTemp(celsius: number, unit: "C" | "F"): string {
  if (unit === "F") return Math.round((celsius * 9) / 5 + 32) + "°F";
  return Math.round(celsius) + "°C";
}

export default formatTemp;
