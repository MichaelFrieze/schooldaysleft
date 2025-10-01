# SchoolDaysLeft

A countdown tracker for school built with React 19, TanStack React Router/Start, React Query, Convex, Clerk, Tailwind CSS v4, and shadcn‑ui.

## Intro

SchoolDaysLeft lets authenticated users create and manage countdowns for school terms, accounting for weekly days off and additional days off. The UI is built with TanStack Start and shadcn‑ui; data and auth are handled by Convex and Clerk.

## Tech stack

- React 19 + Vite 7
- TanStack Start 1.x
- TanStack React Query 5
- Convex (real-time DB, serverless functions)
- Clerk (authentication)
- Tailwind CSS v4 + shadcn‑ui components
- TypeScript, Biome (format/lint)

## Local development

Prereqs:

- Node 20+
- pnpm 9+

Install deps:

```bash
pnpm install
```

Create `.env.local` at the repo root (see Environment variables below), then start both the web app and Convex dev server:

```bash
pnpm dev
```

This runs:

- Vite dev server on port 3000
- Convex dev server via `convex dev`

## Environment variables

Environment is validated via `@t3-oss/env-core` in `src/env.ts`.

Server (no prefix):

- `SERVER_URL` (optional): Base URL when running the production server locally (used by the `start` script).
- `CLERK_SECRET_KEY` (required): Clerk secret key for server-side auth utils.
- `CONVEX_DEPLOYMENT` (required): Convex deployment URL or slug (e.g. `dev:my-project` or `https://...convex.cloud`).

Client (must be prefixed with `VITE_`):

- `VITE_APP_TITLE` (optional): App title override.
- `VITE_CLERK_PUBLISHABLE_KEY` (required)
- `VITE_CLERK_SIGN_IN_URL` (required)
- `VITE_CLERK_SIGN_UP_URL` (required)
- `VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` (required)
- `VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` (required)
- `VITE_CONVEX_URL` (required): Convex public URL for the browser client.

Convex auth config expects `VITE_CLERK_FRONTEND_API_URL` available to Convex runtime (see `convex/auth.config.ts`). In Convex dashboard, set an auth provider with your Clerk Frontend API URL and `applicationID: "convex"`.

Example `.env.local` (adjust values):

```bash
# Server
CLERK_SECRET_KEY=sk_live_...
CONVEX_DEPLOYMENT=dev:schooldaysleft
SERVER_URL=http://localhost:3000

# Client
VITE_APP_TITLE=SchoolDaysLeft
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_CLERK_SIGN_IN_URL=/sign-in
VITE_CLERK_SIGN_UP_URL=/sign-up
VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
VITE_CONVEX_URL=https://<your-convex>.convex.cloud
```

## Available scripts

From `package.json`:

- `pnpm dev`: Runs `convex dev --once`, then concurrently starts Vite on `:3000` and Convex dev server.
- `pnpm dev:web`: Start Vite dev server only.
- `pnpm dev:convex`: Start Convex dev only.
- `pnpm build`: Build client app with Vite (TanStack Start plugin targets Vercel by default).
- `pnpm serve`: Preview built client locally.
- `pnpm start`: Run the production server output (requires `.output/server/index.mjs`).
- `pnpm typecheck`: TypeScript type check.
- `pnpm test`: Run Vitest tests.
- `pnpm format` / `pnpm format:write`: Biome format.
- `pnpm lint` / `pnpm lint:fix`: Biome lint.
- `pnpm check` / `pnpm check:write` / `pnpm check:unsafe`: Biome check variants.

## Project structure

Key paths:

- `src/routes`: Route files for TanStack Router.
- `src/modules/*`: Feature modules for auth, countdowns, dashboards, etc.
- `src/components/ui`: shadcn‑ui components.
- `convex/*`: Convex schema and server functions.
- `src/env.ts`: Strongly‑typed environment schema.
- `src/router.tsx`: Router creation, Convex + Query client providers.

## Features

- Auth via Clerk integrated with TanStack Start.
- Convex‑backed CRUD for countdowns with validation on create/update.
- Countdown calculations (days left, weeks remaining, progress) and views.
- Responsive, themeable UI with Tailwind v4 and shadcn‑ui.
- React Query for data caching and Devtools integration.

## UI components (shadcn)

To add new components, follow the project rule to use the latest shadcn installer. For example, to add a `button`:

```bash
pnpx shadcn@latest add button
```

## Development conventions

- TypeScript everywhere; avoid `any`.
- Keep functions small and descriptive; prefer early returns.
- Use Biome for formatting and linting before commits.
- Prefer feature modules under `src/modules/*`.
- Do not commit secrets. Use `.env.local` for local development.

## Deployment

- The Vite TanStack Start plugin is configured with `target: "vercel"` in `vite.config.ts`.
- Provision Convex (deployment & env vars) and Clerk (publishable + secret keys, frontend API URL) in your hosting environment.
- Ensure all server env vars (no `VITE_` prefix) are available to the server runtime and Convex env (as applicable).

## Convex schema & functions

- Schema: `convex/schema.ts` defines a `countdowns` table indexed by user and by `(userId, name)`.
- Server functions: `convex/countdowns.ts` exports `create`, `update`, `remove`, `getAll`, `getById`, `getByName` with auth checks and strong validation.

## License

MIT
