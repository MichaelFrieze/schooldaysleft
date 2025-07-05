# schooldaysleft

A web application to count down the school days left until your next break, vacation, or any important date.

## Key Features

- **Multiple Countdowns**: Create and manage as many countdowns as you need. Perfect for teachers, students, and parents tracking different school schedules.
- **Flexible Scheduling**: Easily set a start and end date, specify weekly days off (e.g., weekends), and add custom holidays or breaks.
- **Progress Tracking**: Visualize your countdown with a progress bar that shows the percentage of days completed and days remaining.
- **Custom Themes**: Personalize your experience by choosing from multiple color themes and switching between light and dark modes.

## Tech Stack

This project is built with the T3 Stack and other modern technologies:

- **Framework**: [Next.js](https://nextjs.org/)
- **UI**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) on [Neon](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **API**: [tRPC](https://trpc.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MichaelFrieze/schooldaysleft.git
    cd schooldaysleft
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your credentials (e.g., Clerk, Neon database URL).

4.  **Push the database schema:**
    This will sync your database schema with your Drizzle ORM schema.

    ```bash
    pnpm run db:push
    ```

5.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Lints the codebase.
- `pnpm format:write`: Formats the code with Prettier.
- `pnpm db:studio`: Opens Drizzle Studio to browse your database.

## Folder Structure

The application is organized into modules, with each feature or domain located in its own directory within `src/modules`. This approach helps to keep the codebase organized and scalable.

```
src/modules/
├── account/
├── auth/
├── countdown/
├── dashboard/
├── edit-countdown/
├── home/
├── landing/
├── new-countdown/
├── settings/
└── user/
```
