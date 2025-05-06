# TODO

- Theme Switcher component: https://github.com/heywinit/colorswitchcn
- full moon
- chance of outside recess (weather)
- not in the mood
- countdown until next break
- theme switcher
- breaks are, thanksgiving, winter, spring
- consider using drawer for contact button
- consider using drawer for donate button
- use drawer component in mobile view and dialog in desktop
- consider making logo icon bigger
- look into how easy it is to use stripe in a small form component in drawer.
- consider adding drizzle-kit push --force to preview branches:
- Add countdown selection in the navbar using a dropdown
- Move dashboard page contents to it's own module
- Clean up clerk appearance variables
- look into tailwind v3 to be able to use theme switcher
- go over file structure and make sure everything looks good so far
- Check to see if I can get theme color data from the theme switcher components for clerk appearance
- iOS chrome browser bounces when scrolling to bottom and reverts to top. doesn't happen on other browsers, not even brave

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
