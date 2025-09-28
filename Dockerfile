FROM node:20-alpine
WORKDIR /app

# 1) Install deps without running postinstall (no schema yet)
COPY package*.json ./
RUN npm ci --ignore-scripts

# 2) Copy the rest of the app (now prisma/ exists in the image)
COPY . .

# 3) Prisma runtime deps on Alpine
RUN apk add --no-cache openssl

# 4) Generate Prisma Client (now schema is present)
RUN npx prisma generate --schema=prisma/schema.prisma

# 5) Build TS
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/server.js"]
