import type { Id } from "convex/_generated/dataModel";

export type Countdown = {
	_id: Id<"countdowns">;
	_creationTime: number;
	userId: string;
	name: string;
	startDate: number;
	endDate: number;
	weeklyDaysOff: number[];
	additionalDaysOff: number[];
	createdAt: number;
	updatedAt: number;
};
