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

	if (today < startDate) {
		return 0;
	}

	if (today > endDate) {
		return 100;
	}

	const remainingDays = calculateDaysLeft(countdown);

	const totalDays = calculateTotalDays(countdown);

	if (totalDays === 0) {
		return 100;
	}

	const daysCompleted = totalDays - remainingDays;
	const progressValue = (daysCompleted / totalDays) * 100;

	return progressValue;
}
