# TODO

- dashboard cards need to look more like clickable buttons and get correct info displayed
- Make landing page look better

- full moon
- chance of outside recess (weather)
- not in the mood
- consider adding drizzle-kit push --force to preview branches:
- Use a webhook to update user button full name after a change
- look for some tailwind classes that are not needed in the landing page
- improve dashboard cards design
- improve landing page design
- improve countdown page design
- Use a modal or something to confirm delete on countdown page (check next-tube)
- go through CodeRabbit recommendations and take notes: https://github.com/MichaelFrieze/schooldaysleft/pull/21
- Consider making the account page a modal
- Watch Theo's tutorial to check out posthog and sentry
- When I refresh countdown page, number will shift by 1 after loaded. It's probably related to today date.

```
    "vercel-build": "if [ \"$VERCEL_ENV\" = \"production\" ]; then drizzle-kit push; elif [ \"$VERCEL_ENV\" = \"preview\" ]; drizzle-kit push --force; fi && next build",
```
