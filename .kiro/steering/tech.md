# Technology Stack

## Framework & Core Technologies

- **Framework**: Next.js 15 with App Router
- **Runtime**: Node.js (v20+)
- **Package Manager**: pnpm
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with custom themes

## Backend & Data

- **API**: tRPC for type-safe API routes
- **Database**: PostgreSQL (Neon hosted)
- **ORM**: Drizzle ORM with migrations
- **Authentication**: Clerk
- **Caching/Rate Limiting**: Upstash Redis
- **Real-time**: Convex (alternative data layer)

## UI & Components

- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query)
- **Themes**: next-themes with custom CSS variables
- **Animations**: tw-animate-css

## Development Tools

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript strict mode
- **Environment**: T3 env validation with Zod

## Common Commands

```bash
# Development
pnpm dev              # Start dev server with Turbo
pnpm build            # Production build
pnpm start            # Start production server
pnpm preview          # Build and start locally

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm typecheck        # TypeScript type checking
pnpm check            # Run lint + typecheck
pnpm format:write     # Format code with Prettier
pnpm format:check     # Check formatting

# Database
pnpm db:push          # Push schema to database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio

# Deployment
pnpm vercel-build     # Vercel build (includes db:push)
```

## Environment Setup

- Copy `.env.example` to `.env.local`
- Required services: Neon (PostgreSQL), Clerk (auth), Upstash (Redis), Convex
- All environment variables validated via `src/env.js`
