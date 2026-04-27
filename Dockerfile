FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_HOME="/tmp/corepack"
RUN npm install -g pnpm@10.33.2

# Install openssl for Prisma and procps for process management if needed
RUN apt-get update -y && apt-get install -y openssl procps && rm -rf /var/lib/apt/lists/*

FROM base AS builder
WORKDIR /app

# Accept build arguments
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy everything
COPY . .

# Install dependencies for the entire monorepo
RUN pnpm install --frozen-lockfile

# Generate Prisma client for the API
RUN cd apps/api && ./node_modules/.bin/prisma generate

# Build the entire monorepo (Next.js and NestJS)
RUN pnpm run build

# Deploy the API to an isolated folder with production dependencies
RUN pnpm --filter api deploy --prod /app/out/api
# Generate Prisma client again in the deployed API folder to ensure the binary is present
RUN cd /app/out/api && ./node_modules/.bin/prisma generate

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser
RUN chown appuser:nodejs /app

RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "--- DEBUG: Looking for server.js ---"' >> /app/start.sh && \
    echo 'find . -name "server.js"' >> /app/start.sh && \
    echo 'echo "--- Running Prisma Migrations ---"' >> /app/start.sh && \
    echo 'cd /app/apps/api && ./node_modules/.bin/prisma migrate deploy' >> /app/start.sh && \
    echo 'echo "--- Starting NestJS on Port 3001 ---"' >> /app/start.sh && \
    echo 'cd /app/apps/api && PORT=3001 node dist/src/main &' >> /app/start.sh && \
    echo 'echo "--- Starting Next.js on Port 3000 ---"' >> /app/start.sh && \
    echo 'cd /app && PORT=3000 HOSTNAME=0.0.0.0 exec node apps/web/server.js' >> /app/start.sh && \
    chmod +x /app/start.sh && \
    chown appuser:nodejs /app/start.sh

USER appuser

COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/standalone ./

COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=appuser:nodejs /app/apps/web/public ./apps/web/public

COPY --from=builder --chown=appuser:nodejs /app/out/api ./apps/api

# Expose both ports
EXPOSE 3000 3001

CMD ["/app/start.sh"]
