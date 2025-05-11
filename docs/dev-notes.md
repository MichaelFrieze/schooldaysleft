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
- Write docs on how to add new themes
- Figure out how to apply .dark class to all dark themes
- Update toggle mode button to work with theme switcher
- Maybe use a server action to update session with user theme preference
- Make Clerk appearnce variables work with new theme

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
