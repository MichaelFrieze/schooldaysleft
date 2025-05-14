# TODO

- full moon
- chance of outside recess (weather)
- not in the mood
- consider using drawer for contact button
- consider using drawer for donate button
- use drawer component in mobile view and dialog in desktop
- look into how easy it is to use stripe in a small form component in drawer.
- consider adding drizzle-kit push --force to preview branches:
- iOS chrome browser bounces when scrolling to bottom and reverts to top. doesn't happen on other browsers, not even brave
- refactor dashboard
- support button in footer isn't aligned correctly
- fix notebook dark theme
- consider having 2 separate landing pages. They will be the same, but one will be for logged in users and the other can be static
- remove border from palette

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
