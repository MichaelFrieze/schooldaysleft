import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const countdowns = pgTable(
  "countdowns",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    weeklyDaysOff: integer("weekly_days_off").array().notNull().default([]),
    additionalDaysOff: timestamp("additional_days_off")
      .array()
      .notNull()
      .default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("countdown_user_name_idx").on(t.userId, t.name)],
);
