import type { Countdown } from "../types";

export function calculateTotalDays(countdown: Countdown): number {
  const startDate = new Date(countdown.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(countdown.endDate);
  endDate.setHours(0, 0, 0, 0);

  if (startDate > endDate) {
    return 0;
  }

  const countStartDate = new Date(startDate);
  const allDays: Date[] = [];

  while (countStartDate <= endDate) {
    allDays.push(new Date(countStartDate));
    countStartDate.setDate(countStartDate.getDate() + 1);
  }

  const schoolDays = allDays.filter((day) => {
    const dayOfWeek = day.getDay();

    if (countdown.weeklyDaysOff.includes(dayOfWeek)) {
      return false;
    }

    const isAdditionalDayOff = countdown.additionalDaysOff.some((offDay) => {
      const normalizedOffDay = new Date(offDay);
      normalizedOffDay.setHours(0, 0, 0, 0);

      return (
        normalizedOffDay.getDate() === day.getDate() &&
        normalizedOffDay.getMonth() === day.getMonth() &&
        normalizedOffDay.getFullYear() === day.getFullYear()
      );
    });

    return !isAdditionalDayOff;
  });

  return schoolDays.length;
}
