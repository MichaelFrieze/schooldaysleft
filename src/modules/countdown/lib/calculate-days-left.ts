import type { Countdown } from "../types";

export function calculateDaysLeft(countdown: Countdown): number {
  const now = new Date();
  const today = new Date(now);

  const schoolEndHour = 17; // 5 PM

  // If it's after 5 PM, start counting from tomorrow
  if (now.getHours() >= schoolEndHour) {
    today.setDate(today.getDate() + 1);
  }

  today.setHours(0, 0, 0, 0);

  const startDate = new Date(countdown.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(countdown.endDate);
  endDate.setHours(0, 0, 0, 0);

  if (today > endDate) {
    return 0;
  }

  // Determine the actual start date for counting
  const countStartDate = new Date(today < startDate ? startDate : today);

  // Pre-normalize all additional days off and create a Set for lookup
  const additionalDaysOffSet = new Set(
    countdown.additionalDaysOff.map((offDay) => {
      const normalized = new Date(offDay);
      normalized.setHours(0, 0, 0, 0);
      return normalized.getTime(); // Use timestamp for comparison
    }),
  );

  let schoolDaysCount = 0;

  while (countStartDate <= endDate) {
    const dayOfWeek = countStartDate.getDay();

    // Check if it's NOT a weekly day off
    if (!countdown.weeklyDaysOff.includes(dayOfWeek)) {
      // Check if it's NOT an additional day off (O(1) lookup)
      if (!additionalDaysOffSet.has(countStartDate.getTime())) {
        schoolDaysCount++;
      }
    }

    countStartDate.setDate(countStartDate.getDate() + 1);
  }

  return schoolDaysCount;
}
