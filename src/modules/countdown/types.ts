import type { Doc } from "../../../convex/_generated/dataModel";

export type Countdown = Omit<
  Doc<"countdowns">,
  "startDate" | "endDate" | "additionalDaysOff" | "createdAt" | "updatedAt"
> & {
  id: string; // Add id as alias for _id for compatibility
  startDate: Date;
  endDate: Date;
  additionalDaysOff: Date[];
  createdAt: Date;
  updatedAt: Date;
};
