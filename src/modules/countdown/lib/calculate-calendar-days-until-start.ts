import type { Countdown } from "../types";

export function calculateCalendarDaysUntilStart(countdown: Countdown): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const startDate = new Date(countdown.startDate);
  startDate.setHours(0, 0, 0, 0);

  if (now >= startDate) {
    return 0;
  }

  const diffTime = Math.abs(startDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
