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
- When selecting weekly days off, I think I want the array to always be in order. Right now it's ordered based on how the user selects those days.
- on the create new countdown form, I need to let the user know if they are trying to use a countdown name that is already used.
- Add caching to data layer
- Kayla school year (no more days off): Sept 4th, June 12th - 11 days left from May 29th
- improve dashboard cards design
- improve landing page design
- create 404 error page
- maybe let user know when they do not have access to something
- improve suspense skeletons
- countdown page main card needs a better design
- The 4 small cards below the main card either need to go or find a way to be useful. It is consistent with landing page but useless
- Consider removing quick actions
- calendar for holidays and breaks
- maybe add back the quick actions
- Holidays and breaks card needs improvement. Both design and text. It should show total additional days off left and not always just the total.

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
