export interface CountdownData {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeklyDaysOff: number[]; // 0 = Sunday, 1 = Monday, etc.
  additionalDaysOff: Date[];
  createdAt: Date;
}

// Mock storage for countdowns
let mockCountdowns: CountdownData[] = [];

export const createCountdown = (
  data: Omit<CountdownData, "id" | "createdAt">,
): CountdownData => {
  const countdown: CountdownData = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };

  mockCountdowns.push(countdown);
  console.log("Created countdown:", countdown);
  return countdown;
};

export const getCountdowns = (): CountdownData[] => {
  return [...mockCountdowns];
};

export const deleteCountdown = (id: string): boolean => {
  const initialLength = mockCountdowns.length;
  mockCountdowns = mockCountdowns.filter((c) => c.id !== id);
  return mockCountdowns.length < initialLength;
};

// Calculate school days remaining
export const calculateSchoolDaysRemaining = (
  countdown: CountdownData,
): number => {
  const today = new Date();
  const endDate = countdown.endDate;

  if (today >= endDate) return 0;

  let schoolDays = 0;
  const currentDate = new Date(today);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeeklyDayOff = countdown.weeklyDaysOff.includes(dayOfWeek);
    const isAdditionalDayOff = countdown.additionalDaysOff.some(
      (date) => date.toDateString() === currentDate.toDateString(),
    );

    if (!isWeeklyDayOff && !isAdditionalDayOff) {
      schoolDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schoolDays;
};
