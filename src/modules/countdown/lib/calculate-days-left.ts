import type { InferSelectModel } from "drizzle-orm";
import type { countdowns } from "@/db/schema";

type CountdownData = Pick<
  InferSelectModel<typeof countdowns>,
  "startDate" | "endDate" | "weeklyDaysOff" | "additionalDaysOff"
>;

export function calculateDaysLeft(countdown: CountdownData): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const startDate = new Date(countdown.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(countdown.endDate);
  endDate.setHours(0, 0, 0, 0);

  if (today > endDate) {
    return 0;
  }

  // Determine the actual start date for counting
  const countStartDate = new Date(today < startDate ? startDate : today);
  const allDays: Date[] = [];

  while (countStartDate <= endDate) {
    allDays.push(new Date(countStartDate));
    countStartDate.setDate(countStartDate.getDate() + 1);
  }

  // Filter out non-school days
  const schoolDays = allDays.filter((day) => {
    const dayOfWeek = day.getDay();

    // Check if it's a weekly day off (e.g., weekends)
    if (countdown.weeklyDaysOff.includes(dayOfWeek)) {
      return false;
    }

    // Check if it's an additional day off
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
