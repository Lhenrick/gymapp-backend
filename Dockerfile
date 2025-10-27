FROM node:20-alpine AS builder
WORKDIR /app

# Install all deps (including dev dependencies) in the builder
COPY package*.json ./
# Install dependencies but skip lifecycle scripts (postinstall) until schema is present
RUN npm ci --ignore-scripts

# Copy source and other files needed for build
COPY . .

# Install runtime deps needed by Prisma on Alpine
RUN apk add --no-cache openssl

# Generate Prisma client after source files are copied, then build TypeScript
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

# Remove devDependencies to keep node_modules small for runtime
RUN npm prune --production


### Final image: copy only production artifacts
FROM node:20-alpine AS runner
WORKDIR /app

# Copy package metadata (optional)
COPY package*.json ./

# Copy production node_modules and compiled output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Ensure runtime deps for Prisma
RUN apk add --no-cache openssl

EXPOSE 8080
CMD ["node", "dist/server.js"]
