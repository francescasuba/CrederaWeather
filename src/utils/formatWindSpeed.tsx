export function formatWindSpeed(speed: number, unit: "C" | "F"): string {
  const converted = Math.ceil(speed * (unit === "F" ? 0.621371 : 1));
  const unitLabel = unit === "F" ? "mph" : "km/h";
  return `${converted} ${unitLabel}`;
}