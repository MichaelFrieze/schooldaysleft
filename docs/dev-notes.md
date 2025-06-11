# TODO

- dashboard cards need to look more like clickable buttons and get correct info displayed
- Consider making the account page a modal
- Use a modal or something to confirm delete on countdown page (check next-tube)

- full moon (teachers will think this is funny)
- chance of outside recess (weather)
- not in the mood for motivational quotes
- Use a webhook to update user button full name after a change
- look for some tailwind classes that are not needed and replace margin classes with padding when possible
- go through CodeRabbit recommendations and take notes: https://github.com/MichaelFrieze/schooldaysleft/pull/21

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
