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

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the web code
COPY apps/web/ ./apps/web/

# Build the web app
RUN pnpm --filter web run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Set environment for Next.js standalone
ENV NODE_ENV=production
# Railway injects its own PORT at runtime, but setting a default is safe
ENV PORT=3000
# Essential for Next.js to not bind strictly to localhost inside a container
ENV HOSTNAME="0.0.0.0"

# Copy standalone build WITH specific user permissions
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=appuser:nodejs /app/apps/web/public ./apps/web/public

# Switch to the non-root user AFTER copying files
USER appuser

EXPOSE 3000

# Start the Next.js server
CMD ["node", "apps/web/server.js"]