# AGENTS.md - Development Guidelines

## Build/Lint/Test Commands
- `pnpm dev` - Start development server with Turbo
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run both lint and typecheck
- `pnpm format:check` - Check Prettier formatting
- `pnpm format:write` - Fix Prettier formatting
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Drizzle Studio

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Prefer `type` imports: `import { type ComponentProps } from "react"`
- Use `@/` path alias for src imports
- Follow modular architecture: organize by feature in `src/modules/`
- Use Tailwind CSS with `cn()` utility for className merging
- Component props: destructure with defaults, use `...props` spread
- Error handling: Use try-catch with proper error types
- Naming: camelCase for variables/functions, PascalCase for components/types
- Use `export { Component }` syntax, not `export default`
- Prefer function declarations over arrow functions for components
- Use Zod for schema validation and type inference