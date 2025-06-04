# TODO

- on the create new countdown form, I need to let the user know if they are trying to use a countdown name that is already used.
- Consider adding a calendar for every month in holidays and break card
- improve suspense skeletons
- toast notifications
- dashboard cards need to look more like clickable buttons and get correct info displayed
- Maybe add to countdown page if today counted or not.

- full moon
- chance of outside recess (weather)
- not in the mood
- consider using drawer for contact button
- consider using drawer for donate button
- use drawer component in mobile view and dialog in desktop
- consider adding drizzle-kit push --force to preview branches:
- Use a webhook to update user button full name after a change
- look for some tailwind classes that are not needed in the landing page
- Kayla school year (no more days off): Sept 4th, June 12th - 11 days left from May 29th
- improve dashboard cards design
- improve landing page design
- improve countdown page design
- maybe let user know when they do not have access to something
- Use a modal or something to confirm delete on countdown page (check next-tube)
- Consider removing outside days from calendar in holidays and break card
- go through everything and mark with TODO
- go through CodeRabbit recommendations and take notes: https://github.com/MichaelFrieze/schooldaysleft/pull/21
- Consider making the account page a modal
- find out what happens if you make 2 separate prefetches to the same query during the same request. For example, using prefetch getAll procedure in the layout and on the page.
- improve error handling
- I notice that confirm to delete requires 2 clicks
- consider adding infinite scroll on the dashboard if a user has many countdowns

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
