FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.33.2

FROM base AS builder
WORKDIR /app

# Accept build arguments for Next.js
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy root files for pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/

# Copy all package.json files to satisfy pnpm workspace
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies WITHOUT triggering Prisma postinstall from the API package
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the web code
COPY apps/web/ ./apps/web/

# Build the web app
RUN pnpm --filter web run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Copy the standalone output (which mirrors the monorepo root)
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/standalone ./

# 2. Copy static files to their exact locations within the mirrored structure
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=appuser:nodejs /app/apps/web/public ./apps/web/public

USER appuser

EXPOSE 3000

CMD ["sh", "-c", "if [ -f apps/web/server.js ]; then node apps/web/server.js; elif [ -f server.js ]; then node server.js; else echo 'CRITICAL ERROR: server.js NOT FOUND! Menampilkan isi direktori /app:' && ls -la && echo 'Menampilkan isi direktori /app/apps/web (jika ada):' && ls -la apps/web || true && exit 1; fi"]