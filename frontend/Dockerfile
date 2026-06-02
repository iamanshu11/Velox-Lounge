FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Build
FROM deps AS builder
COPY . .
# Build-time env (the API URL must point to the backend container)
ARG NEXT_PUBLIC_API_URL=http://localhost:5004/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3004
ENV PORT=3004
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
