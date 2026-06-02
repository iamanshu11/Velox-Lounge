FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies (includes devDeps for tsc)
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Build — must copy everything tsconfig includes (src/ + db/)
FROM deps AS builder
COPY tsconfig.json ./
COPY src/ ./src/
COPY db/ ./db/
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# tsc outputs dist/src/ and dist/db/ because rootDir is "./"
COPY --from=builder /app/dist ./dist

# Also need db/ source for tsx-based migration scripts at runtime
COPY db/ ./db/
RUN npm install tsx --save-dev

EXPOSE 5004

# Correct path: rootDir="./" so server.ts → dist/src/server.js
CMD ["node", "dist/src/server.js"]
