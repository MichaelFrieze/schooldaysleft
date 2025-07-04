import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

export const create = mutation({
  args: {
    name: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    weeklyDaysOff: v.array(v.number()),
    additionalDaysOff: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.subject;

    // Validation
    if (args.startDate >= args.endDate) {
      throw new Error("Start date must be earlier than end date");
    }

    if (!args.name || args.name.trim() === "") {
      throw new Error("Countdown name is required");
    }

    if (args.weeklyDaysOff.length > 0) {
      const invalidDays = args.weeklyDaysOff.filter(
        (day) => day < 0 || day > 6,
      );
      if (invalidDays.length > 0) {
        throw new Error("Weekly days off must be numbers between 0 and 6");
      }

      const uniqueDays = new Set(args.weeklyDaysOff);
      if (uniqueDays.size !== args.weeklyDaysOff.length) {
        throw new Error("Weekly days off cannot contain duplicates");
      }

      const sortedDays = [...args.weeklyDaysOff].sort((a, b) => a - b);
      const isInOrder = args.weeklyDaysOff.every(
        (day, index) => day === sortedDays[index],
      );
      if (!isInOrder) {
        throw new Error("Weekly days off must be in order from 0 to 6");
      }
    }

    if (args.additionalDaysOff.length > 0) {
      const uniqueDates = new Set(args.additionalDaysOff);
      if (uniqueDates.size !== args.additionalDaysOff.length) {
        throw new Error("Additional days off cannot contain duplicate dates");
      }

      const datesOutsideRange = args.additionalDaysOff.filter(
        (date) => date < args.startDate || date > args.endDate,
      );
      if (datesOutsideRange.length > 0) {
        throw new Error(
          "Additional days off must be between start date and end date",
        );
      }
    }

    // Check for existing countdown with same name
    const existingCountdown = await ctx.db
      .query("countdowns")
      .withIndex("by_user_name", (q) =>
        q.eq("userId", userId).eq("name", args.name),
      )
      .unique();

    if (existingCountdown) {
      throw new Error("Countdown name already exists");
    }

    const now = Date.now();

    const countdownId = await ctx.db.insert("countdowns", {
      userId,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      weeklyDaysOff: args.weeklyDaysOff,
      additionalDaysOff: args.additionalDaysOff,
      createdAt: now,
      updatedAt: now,
    });

    return countdownId;
  },
});

export const update = mutation({
  args: {
    id: v.id("countdowns"),
    name: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    weeklyDaysOff: v.optional(v.array(v.number())),
    additionalDaysOff: v.optional(v.array(v.number())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.subject;

    const existingCountdown = await ctx.db.get(args.id);

    if (!existingCountdown) {
      throw new Error("Countdown not found");
    }

    if (existingCountdown.userId !== userId) {
      throw new Error("Countdown does not belong to user");
    }

    // Validation for weeklyDaysOff
    if (args.weeklyDaysOff && args.weeklyDaysOff.length > 0) {
      const invalidDays = args.weeklyDaysOff.filter(
        (day) => day < 0 || day > 6,
      );
      if (invalidDays.length > 0) {
        throw new Error("Weekly days off must be numbers between 0 and 6");
      }

      const uniqueDays = new Set(args.weeklyDaysOff);
      if (uniqueDays.size !== args.weeklyDaysOff.length) {
        throw new Error("Weekly days off cannot contain duplicates");
      }

      const sortedDays = [...args.weeklyDaysOff].sort((a, b) => a - b);
      const isInOrder = args.weeklyDaysOff.every(
        (day, index) => day === sortedDays[index],
      );
      if (!isInOrder) {
        throw new Error("Weekly days off must be in order from 0 to 6");
      }
    }

    const effectiveStartDate = args.startDate ?? existingCountdown.startDate;
    const effectiveEndDate = args.endDate ?? existingCountdown.endDate;

    if (effectiveStartDate >= effectiveEndDate) {
      throw new Error("Start date must be earlier than end date");
    }

    if (args.name?.trim() === "") {
      throw new Error("Countdown name is required");
    }

    if (args.additionalDaysOff && args.additionalDaysOff.length > 0) {
      const uniqueDates = new Set(args.additionalDaysOff);
      if (uniqueDates.size !== args.additionalDaysOff.length) {
        throw new Error("Additional days off cannot contain duplicate dates");
      }

      const datesOutsideRange = args.additionalDaysOff.filter((date) => {
        const startDateToCheck = args.startDate ?? existingCountdown.startDate;
        const endDateToCheck = args.endDate ?? existingCountdown.endDate;

        return date < startDateToCheck || date > endDateToCheck;
      });

      if (datesOutsideRange.length > 0) {
        throw new Error(
          "Additional days off must be between start date and end date",
        );
      }
    }

    // Check for name conflicts
    if (args.name && args.name !== existingCountdown.name) {
      const duplicateCountdown = await ctx.db
        .query("countdowns")
        .withIndex("by_user_name", (q) =>
          q.eq("userId", userId).eq("name", args.name!),
        )
        .unique();

      if (duplicateCountdown && duplicateCountdown._id !== args.id) {
        throw new Error("Countdown name already exists");
      }
    }

    const updateData: Partial<Doc<"countdowns">> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updateData.name = args.name;
    if (args.startDate !== undefined) updateData.startDate = args.startDate;
    if (args.endDate !== undefined) updateData.endDate = args.endDate;
    if (args.weeklyDaysOff !== undefined)
      updateData.weeklyDaysOff = args.weeklyDaysOff;
    if (args.additionalDaysOff !== undefined)
      updateData.additionalDaysOff = args.additionalDaysOff;

    await ctx.db.patch(args.id, updateData);

    return args.id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("countdowns"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.subject;

    const existingCountdown = await ctx.db.get(args.id);

    if (!existingCountdown) {
      throw new Error("Countdown not found");
    }

    if (existingCountdown.userId !== userId) {
      throw new Error("Countdown does not belong to user");
    }

    await ctx.db.delete(args.id);

    return { success: true };
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.subject;

    const countdowns = await ctx.db
      .query("countdowns")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return countdowns;
  },
});

export const getById = query({
  args: {
    id: v.id("countdowns"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const userId = identity.subject;

    const countdown = await ctx.db.get(args.id);

    if (!countdown) {
      return null;
    }

    if (countdown.userId !== userId) {
      return null;
    }

    return countdown;
  },
});

export const getByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const userId = identity.subject;

    const countdown = await ctx.db
      .query("countdowns")
      .withIndex("by_user_name", (q) =>
        q.eq("userId", userId).eq("name", args.name),
      )
      .unique();

    return countdown;
  },
});
