export type Countdown = {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeklyDaysOff: number[];
  additionalDaysOff: Date[];
  createdAt: Date;
  updatedAt: Date;
};
