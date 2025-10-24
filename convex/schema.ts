import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  countdowns: defineTable({
    userId: v.string(),
    name: v.string(),
    startDate: v.number(), // Convex uses timestamps as numbers (milliseconds since epoch)
    endDate: v.number(),
    weeklyDaysOff: v.array(v.number()),
    additionalDaysOff: v.array(v.number()), // Array of timestamps as numbers
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_name', ['userId', 'name']), // Equivalent to the unique index in Drizzle
})
