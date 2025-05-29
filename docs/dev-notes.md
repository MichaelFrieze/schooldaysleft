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
- I get an error when trying to create a new countdown and it has no weekly days off. Never mind, I can't reproduce the error.
- When selecting weekly days off, I think I want the array to always be in order. Right now it's ordered based on how the user selects those days.
- on the create new countdown form, I need to let the user know if they are trying to use a countdown name that is already used.
- Add caching to data layer
- Sept 4th, June 12th

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
