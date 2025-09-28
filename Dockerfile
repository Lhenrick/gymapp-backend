FROM node:20-alpine
WORKDIR /app

# 1) Install deps (cacheable)
COPY package*.json ./
RUN npm ci

# 2) Copy source (includes prisma/)
COPY . .

# 3) Prisma runtime dependency on Alpine
RUN apk add --no-cache openssl

# 4) Generate Prisma Client AFTER prisma/ is present
RUN npx prisma generate --schema=prisma/schema.prisma

# 5) Build TS
RUN npm run build

EXPOSE 8080
# 6) Run migrations at container start, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy --schema=prisma/schema.prisma && node dist/server.js"]
