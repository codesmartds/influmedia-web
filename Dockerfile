FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci --ignore-scripts

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Build-time placeholders; real values come from Cloud Run env vars.
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build-placeholder
ENV PAYLOAD_SECRET=build_placeholder_secret
ENV GCS_BUCKET=influmedia-web-media
ENV GCS_PROJECT_ID=influmedia-web
ENV GCS_PREFIX=production
RUN npm run build

# Runs pending Payload migrations; deployed as a Cloud Run Job before each release.
# The standalone runner below lacks the Payload CLI and migrations/.
FROM builder AS migrator
CMD ["npx", "payload", "migrate"]

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Seed assets read at runtime by POST /api/seed.
COPY --from=builder --chown=nextjs:nodejs /app/seed-source ./seed-source
USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
