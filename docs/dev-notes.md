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
- on the create new countdown form, I need to let the user know if they are trying to use a countdown name that is already used.
- Add caching to data layer
- Kayla school year (no more days off): Sept 4th, June 12th - 11 days left from May 29th
- improve dashboard cards design
- improve landing page design
- improve countdown page design
- create 404 error page
- maybe let user know when they do not have access to something
- improve suspense skeletons
- Use a modal or something to confirm delete on countdown page
- Consider adding a calendar for every month in holidays and break card
- Consider removing outside days from calendar in holidays and break card

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
