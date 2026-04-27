# irsal-notes

A monorepo application with a Next.js web app and NestJS API server.

## How to Run

### Docker Setup (Recommended)

The easiest way to run the entire stack (Database, API, and Web) is using Docker.

**Prerequisites:**
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.

**Steps:**

1.  **Clone the repository** (if you haven't already).
2.  **Start the application:**

    ```bash
    docker-compose up --build
    ```

    This will:
    - Build the images for both `api` and `web`.
    - Spin up a PostgreSQL database.
    - Automatically run database migrations.
    - Start the **Web App** at `http://localhost:3000`.
    - Start the **API Server** at `http://localhost:3001`.

**Database Credentials (Default):**
- **User:** `postgres`
- **Password:** `postgres`
- **Database:** `irsal_notes`
- **Host:** `localhost` (from your machine) or `db` (inside Docker)
- **Port:** `5432`

---

### Local Setup (Manual)

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
