# TODO

- full moon
- chance of outside recess (weather)
- not in the mood
- consider using drawer for contact button
- consider using drawer for donate button
- use drawer component in mobile view and dialog in desktop
- look into how easy it is to use stripe in a small form component in drawer.
- consider adding drizzle-kit push --force to preview branches:
- Use a webhook to update user button full name after a change
- look for some tailwind classes that are not needed in the landing page
- consider removing different fonts because on iOS Chrome browser it can cause text to shift on reload
- start building new countdown page

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```

```
calculateSchoolDays: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [countdown] = await ctx.db
        .select()
        .from(countdowns)
        .where(
          and(
            eq(countdowns.id, input.id),
            eq(countdowns.userId, ctx.session.userId),
          ),
        );

      if (!countdown) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Countdown not found",
        });
      }

      // Calculate school days remaining (same logic as mock-data)
      const today = new Date();
      const endDate = new Date(countdown.endDate);

      if (today >= endDate) return 0;

      let schoolDays = 0;
      const currentDate = new Date(today);

      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        const isWeeklyDayOff = countdown.weeklyDaysOff.includes(dayOfWeek);
        const isAdditionalDayOff = countdown.additionalDaysOff.some(
          (dateStr) =>
            new Date(dateStr).toDateString() === currentDate.toDateString(),
        );

        if (!isWeeklyDayOff && !isAdditionalDayOff) {
          schoolDays++;
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return schoolDays;
    }),
```
