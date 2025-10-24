import type { Doc } from 'convex/_generated/dataModel'

export function calculateTotalDays(countdown: Doc<'countdowns'>): number {
  const startDate = new Date(countdown.startDate)
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date(countdown.endDate)
  endDate.setHours(0, 0, 0, 0)

  if (startDate > endDate) {
    return 0
  }

  // Pre-normalize all additional days off and create a Set for lookup
  const additionalDaysOffSet = new Set(
    countdown.additionalDaysOff.map((offDay) => {
      const normalized = new Date(offDay)
      normalized.setHours(0, 0, 0, 0)
      return normalized.getTime() // Use timestamp for comparison
    }),
  )

  let schoolDaysCount = 0

  while (startDate <= endDate) {
    const dayOfWeek = startDate.getDay()

    // Check if it's NOT a weekly day off
    if (!countdown.weeklyDaysOff.includes(dayOfWeek)) {
      // Check if it's NOT an additional day off
      if (!additionalDaysOffSet.has(startDate.getTime())) {
        schoolDaysCount++
      }
    }

    startDate.setDate(startDate.getDate() + 1)
  }

  return schoolDaysCount
}
