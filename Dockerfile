# syntax=docker/dockerfile:1

# --- Builder stage ---
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# Install OS deps (optional: openssl for prisma etc.) and pnpm if needed
RUN apk add --no-cache python3 make g++

# Install deps separately to leverage layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp

# Only copy production node_modules and built files
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER nodeusr

CMD ["node", "dist/main.js"]


