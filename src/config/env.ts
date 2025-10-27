import "dotenv/config";

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "changeme",
  // APP_URL is the public URL where the app is reachable (include protocol),
  // e.g. https://gymapp-backend-production-77bd.up.railway.app
  APP_URL:
    process.env.APP_URL ?? `http://localhost:${process.env.PORT ? Number(process.env.PORT) : 8080}`,
};
