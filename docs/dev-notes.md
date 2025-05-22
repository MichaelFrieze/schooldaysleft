# TODO

- full moon
- chance of outside recess (weather)
- not in the mood
- consider using drawer for contact button
- consider using drawer for donate button
- use drawer component in mobile view and dialog in desktop
- look into how easy it is to use stripe in a small form component in drawer.
- consider adding drizzle-kit push --force to preview branches:
- refactor dashboard
- Use a webhook to update user button full name after a change
- Create a single component for home and landing page to share
- look for some tailwind classes that are not needed in the landing page
- noticing some layout shift in the footer
- Consider using clerk sign-in button on landing page for modal
- make the sign-in and account pages look better
- use section instead of div on view pages
- consider using middleware to switch routes if not logged in, instead of page.
- consider removing different fonts because on iOS Chrome browser it can cause text to shift on reload

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
