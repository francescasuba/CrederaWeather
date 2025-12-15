export function getTodayIndex(dates: Date[]): number {
  const today = new Date();
  return dates.findIndex(d =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}
