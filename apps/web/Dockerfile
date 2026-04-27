FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Copy the standalone output (which now mirrors the monorepo root)
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/standalone ./

# 2. Copy static files to their exact locations within the mirrored structure
COPY --from=builder --chown=appuser:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=appuser:nodejs /app/apps/web/public ./apps/web/public

USER appuser

EXPOSE 3000

# 3. Run the server exactly where Next.js placed it
CMD ["node", "apps/web/server.js"]