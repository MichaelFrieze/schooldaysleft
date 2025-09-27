import type { Countdown } from "../types";

export function calculateWeeksRemaining(countdown: Countdown): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(countdown.endDate);
  endDate.setHours(0, 0, 0, 0);

  if (today > endDate) {
    return 0;
  }

  const timeDiff = endDate.getTime() - today.getTime();

  // Convert to weeks (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const weeksInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  return Math.ceil(timeDiff / weeksInMilliseconds);
}
