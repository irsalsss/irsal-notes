# irsal-notes

A monorepo application with a Next.js web app and NestJS API server.

## How to Run

### Prerequisites

- **Node.js** (v18+)
- **pnpm** (Package manager)
- **Supabase Account** (for PostgreSQL database)

### Steps

1.  **Install Dependencies**

    Run the following command in the root directory:

    ```bash
    pnpm install
    ```

2.  **Set up Supabase Database**

    Make sure you have a PostgreSQL database running. You will need the connection string (URL).

3.  **Configure Environment Variables for API**

    Create a `.env` file in `apps/api/`:

    ```bash
    # apps/api/.env
    DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&schema=public"
    ```

    **Important Notes:**
    - Replace `[PROJECT-REF]`, `[YOUR-PASSWORD]`, and `[REGION]` with your actual Supabase credentials
    - If using the **Connection pooling** URI, make sure to include `?pgbouncer=true&schema=public` at the end
    - If using the **Direct connection** URI, use `?schema=public` instead
    - You can find your project reference and password in the Supabase dashboard
    - For production, consider using environment variables or a secrets manager

4.  **Run Database Migrations**

    **Important:** For Prisma migrations, you may need to use the **Direct connection** URI instead of the pooled connection. Update your `.env` file temporarily with the direct connection string:

    ```bash
    # For migrations, use direct connection:
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public"
    ```

    Then initialize the database schema:

    ```bash
    cd apps/api
    npx prisma migrate dev --name init
    cd ../..
    ```

    After migrations are complete, you can switch back to the connection pooling URI for better performance in your application.

5.  **Start the Development Server**

    From the root directory, run:

    ```bash
    pnpm dev
    ```

    This command uses Turborepo to start both applications:
    - **Web App**: `http://localhost:3000`
    - **API Server**: `http://localhost:3001`

### Generate Swagger JSON

The `swagger.json` file is automatically generated when building the API. To generate it manually:

**Option 1: Build the API (automatically generates swagger.json)**

```bash
cd apps/api
pnpm build
```

**Option 2: Generate swagger.json directly**

After building the API, you can run the swagger generator:

```bash
cd apps/api
pnpm build
node dist/generate-swagger
```

The `swagger.json` file will be created in `apps/api/swagger.json`. This file is used by the web app to generate TypeScript API client code (via Orval).

Once started, the swagger will be accessible at: http://localhost:3001/api

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `apps/web`: a [Next.js](https://nextjs.org/) web application
- `apps/api`: a [NestJS](https://nestjs.com/) API server
- `packages/ui`: a React component library shared by the web application
- `packages/types`: shared TypeScript types
- `packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo has some additional tools already setup for you:

- [Turborepo](https://turborepo.com/) for monorepo task orchestration
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
# From the root directory
pnpm build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash
# Build only the web app
pnpm build --filter=web

# Build only the API
pnpm build --filter=api
```

### Develop

To develop all apps and packages, run the following command:

```bash
# From the root directory
pnpm dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash
# Develop only the web app
pnpm dev --filter=web

# Develop only the API
pnpm dev --filter=api
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
# From the root directory
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
