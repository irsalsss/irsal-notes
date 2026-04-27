# irsal-notes

A monorepo application with a Next.js web app and NestJS API server, orchestrated with **Turborepo**.

---

## 🛠 Technology Stack

### 🌐 Web Frontend (`apps/web`)
The frontend is built with a focus on developer experience, type safety, and modern performance standards.

*   **Next.js 16 (App Router)**: Utilizing the latest React features for server-side rendering, streaming, and optimized routing.
*   **TanStack Query (v5)**: Powerful asynchronous state management for handling server-side data fetching, caching, and synchronization.
*   **Zustand**: A lightweight, fast, and scalable state management solution for client-side global state.
*   **Orval & Axios**: Automated Type-safe API client generation. Orval consumes the Swagger definitions from the API to generate hooks and types, ensuring perfect alignment between frontend and backend.
*   **SASS (SCSS)**: Leveraging SASS for structured, maintainable, and modular styling.
*   **Radix UI Icons**: A consistent and accessible icon set for a premium look and feel.
*   **React Hook Form**: Performant and flexible form validation and management.

### ⚙️ API Backend (`apps/api`)
The backend is designed for scalability, maintainability, and enterprise-grade architecture.

*   **NestJS v11**: A progressive Node.js framework for building efficient and scalable server-side applications, utilizing modern TypeScript and modular patterns.
*   **Prisma ORM**: A next-generation type-safe ORM for Node.js and TypeScript, making database access easy and error-free.
*   **PostgreSQL**: A powerful, open-source object-relational database system used for reliable data storage.
*   **JWT & Bcrypt**: Secure authentication flow using JSON Web Tokens and industry-standard password hashing.
*   **Swagger (OpenAPI)**: Comprehensive API documentation that serves as the "single source of truth" for the frontend codegen.
*   **Validation**: Robust DTO (Data Transfer Object) validation using `class-validator` and `class-transformer`.

### 🏗 Infrastructure & Tooling
*   **Turborepo**: High-performance build system for JavaScript and TypeScript monorepos, enabling remote caching and parallel execution.
*   **pnpm**: Fast, disk space efficient package manager.
*   **Docker & Docker Compose**: Containerization for consistent development and production environments.

---

## 🚀 Getting Started

### Docker Setup (Recommended)

The easiest way to spin up the entire stack (Database, API, and Web) is using Docker.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Steps:**
1.  **Clone the repository**
2.  **Start the services:**
    ```bash
    docker-compose up --build
    ```
    This will:
    - Build images for `api` and `web`.
    - Spin up a **PostgreSQL** database.
    - Run database migrations automatically.
    - Expose **Web App** at `http://localhost:3000` and **API** at `http://localhost:3001`.

---

### Local Development (Manual)

**Prerequisites:**
- Node.js (v20+)
- pnpm (v9+)
- A PostgreSQL database (e.g., Supabase or local)

**Steps:**

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Environment Configuration:**
    Create a `.env` file in the root (see `.env.example` for reference).
    ```env
    DATABASE_URL="postgresql://user:pass@localhost:5432/db"
    JWT_SECRET="your-secret-key"
    ```

3.  **Database Migration:**
    ```bash
    pnpm --filter api prisma migrate dev
    ```

4.  **Launch Development Servers:**
    ```bash
    pnpm dev
    ```
    This starts both the Web and API apps in parallel using Turborepo.

---

## 📖 API Documentation & Codegen

- **Swagger UI**: Accessible at `http://localhost:3001/api` when the API is running.
- **Client Generation**: The frontend uses `orval` to generate hooks. To update the client after API changes:
  ```bash
  pnpm --filter web codegen
  ```

---

## 📁 Project Structure

```text
irsal-notes/
├── apps/
│   ├── web/          # Next.js Application
│   └── api/          # NestJS API Server
├── packages/
│   ├── ui/           # Shared React Component Library
│   ├── utils/        # Shared Utility Functions
│   ├── eslint-config/# Shared ESLint presets
│   └── tsconfig/     # Shared TypeScript configurations
└── docker-compose.yml
```

