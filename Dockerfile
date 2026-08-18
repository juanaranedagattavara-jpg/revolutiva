FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* vars are inlined into the client bundle (and read while
# prerendering ISR pages) at `next build` time, not at container runtime —
# so they must be passed as Docker build args, not just runtime env vars.
# EasyPanel: set these under the app's "Build args", not just "Environment".
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL=https://revolutiva.travel
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000

# Cap V8's heap explicitly. Without this, Node sizes the default heap off
# whatever memory it can see (which on some hosts/orchestrators is NOT the
# same as the container's actual cgroup memory limit), so it can happily
# grow past a low EasyPanel "Memory Limit" and get SIGKILLed by the kernel
# OOM killer with zero log output — exactly the silent, sub-second
# restart-loop symptom this project hit in production. With a limit set,
# an out-of-memory condition instead throws a loud, logged
# "JavaScript heap out of memory" error before the process dies, and Node
# never even attempts to grow past it. 460 assumes a >=512MB EasyPanel
# Memory Limit for this service — if that limit is raised/lowered, adjust
# this value to stay a bit below it (EasyPanel: Environment tab, this can
# be overridden at runtime without rebuilding the image).
ENV NODE_OPTIONS="--max-old-space-size=460"

# Self-consistent with whatever PORT is actually injected at runtime (Next's
# standalone server.js reads process.env.PORT, and EasyPanel may override
# the ENV PORT=3000 default above) — avoids the healthcheck silently
# probing the wrong port if EasyPanel's dashboard "Port" setting drifts
# from what the container really listens on.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
