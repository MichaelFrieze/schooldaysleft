# SchoolDaysLeft

A countdown tracker for school built with React 19, TanStack React Router/Start, React Query, Convex, Clerk, Tailwind CSS v4, and shadcn‑ui.

## Intro

SchoolDaysLeft lets authenticated users create and manage countdowns for school terms, accounting for weekly days off and additional days off. The UI is built with TanStack Start and shadcn‑ui; data and auth are handled by Convex and Clerk.

## Tech stack

- React 19 + Vite 7
- TanStack Start RC
- TanStack React Query 5
- Convex (real-time DB, serverless functions)
- Clerk (authentication)
- Tailwind CSS v4 + shadcn‑ui components
- TypeScript

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

Copy `.env.example` and create `.env.local` (adjust values)

## Available scripts

From `package.json`:

- `pnpm dev`: start the web dev server and the Convex dev server concurrently.
- `pnpm dev:web`: start the Vite dev server only.
- `pnpm dev:convex`: start the Convex dev server only.
- `pnpm build`: build the client app and run a type check.
- `pnpm start`: run the production server output.
- `pnpm preview`: build and preview the production server output locally.
- `pnpm deploy:convex`: deploy Convex to production.
- `pnpm format:check`: run Prettier to check files.
- `pnpm format:write`: run Prettier to format files.
- `pnpm lint`: run ESLint to lint code.
- `pnpm lint:fix`: run ESLint with --fix to attempt automatic fixes.
- `pnpm typecheck`: run the TypeScript type check.
- `pnpm check`: run linting and type checks.

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
- Use Prettier and ESLint for formatting and linting before commits. Run `pnpm format:write` and `pnpm lint` (or `pnpm lint:fix`).
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
