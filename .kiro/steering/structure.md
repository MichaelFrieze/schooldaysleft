# Project Structure & Architecture

## Module-Based Organization

The project follows a **modular architecture** where each feature/domain is organized into its own module under `src/modules/`. This promotes separation of concerns and scalability.

```
src/modules/
├── account/          # User account management
├── auth/            # Authentication UI and logic
├── countdown/       # Core countdown functionality
├── dashboard/       # User dashboard
├── edit-countdown/  # Countdown editing interface
├── home/           # Home page
├── landing/        # Landing page
├── new-countdown/  # New countdown creation
├── settings/       # App settings and themes
└── user/           # User profile management
```

## Module Structure Pattern

Each module follows a consistent internal structure:

```
src/modules/{module-name}/
├── hooks/           # Custom React hooks
├── lib/            # Utility functions and calculations
├── server/         # tRPC procedures and data access
├── types.ts        # TypeScript type definitions
└── ui/
    ├── components/ # Reusable UI components
    ├── layouts/    # Layout components
    ├── sections/   # Page sections
    └── views/      # Main view components
```

## Core Directories

- **`src/app/`** - Next.js App Router pages and layouts
- **`src/components/ui/`** - shadcn/ui components
- **`src/lib/`** - Shared utilities and configurations
- **`src/db/`** - Database schema and connection
- **`src/trpc/`** - tRPC setup and configuration
- **`src/styles/`** - Global styles and theme CSS files

## Naming Conventions

- **Files**: kebab-case (`countdown-view.tsx`)
- **Components**: PascalCase (`CountdownView`)
- **Functions**: camelCase (`calculateDaysLeft`)
- **Constants**: SCREAMING_SNAKE_CASE (`DEFAULT_THEME`)
- **Types**: PascalCase (`CountdownData`)

## Import Patterns

- Use `@/` path alias for absolute imports from `src/`
- Group imports: external libraries → internal modules → relative imports
- Prefer named exports over default exports for utilities

## Component Architecture

- **Views**: Top-level page components (`*-view.tsx`)
- **Sections**: Major page sections (`*-section.tsx`)
- **Components**: Reusable UI elements
- **Layouts**: Shared layout components

## Data Flow

1. **UI Components** → call tRPC procedures
2. **tRPC Procedures** → validate input with Zod → call data layer
3. **Data Layer** → Drizzle ORM or Convex → database operations
4. **Error Handling** → `tryCatch` utility → standardized error responses

## File Organization Rules

- Keep related functionality together in modules
- Separate server-side code from client-side code
- Use consistent naming across similar file types
- Group UI components by complexity (components < sections < views)
