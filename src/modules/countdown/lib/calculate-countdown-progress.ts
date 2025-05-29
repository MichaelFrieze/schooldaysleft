import type { Countdown } from "../types";
import { calculateDaysLeft } from "./calculate-days-left";
import { calculateTotalDays } from "./calculate-total-days";

export function calculateCountdownProgress(countdown: Countdown): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(countdown.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(countdown.endDate);
  endDate.setHours(0, 0, 0, 0);

  // If we haven't started yet, progress is 0
  if (today < startDate) {
    return 0;
  }

  // If we're past the end date, progress is 100
  if (today > endDate) {
    return 100;
  }

  // Get remaining school days from today using the existing function
  const remainingDays = calculateDaysLeft(countdown);

  // Get total school days from the start date
  const totalDays = calculateTotalDays(countdown);

  // Avoid division by zero
  if (totalDays === 0) {
    return 100;
  }

  // Progress = (elapsed days / total days) * 100
  const progressValue = ((totalDays - remainingDays) / totalDays) * 100;

  return progressValue;
}
