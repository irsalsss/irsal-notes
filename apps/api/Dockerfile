FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.33.2

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl procps && rm -rf /var/lib/apt/lists/*

FROM base AS builder
WORKDIR /app

# Copy root files for pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
# Copy all package.json files to satisfy pnpm workspace
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies WITHOUT triggering Prisma postinstall
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the api code (including the Prisma schema)
COPY apps/api/ ./apps/api/

# Explicitly generate Prisma client now that ALL files are present
RUN cd apps/api && pnpm prisma generate

# Build the api
RUN pnpm --filter api run build

# Deploy the API to an isolated folder with production dependencies
RUN pnpm --filter api deploy --prod /app/out/api

# Generate Prisma client again in the deployed API folder
RUN cd /app/out/api && ./node_modules/.bin/prisma generate

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copy files with correct chown before switching users
COPY --from=builder --chown=appuser:nodejs /app/out/api ./

USER appuser

# Expose API port
EXPOSE 3001

# Entry point for the API
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node dist/src/main"]