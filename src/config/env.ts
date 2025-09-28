import 'dotenv/config';

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'changeme',
};
