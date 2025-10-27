import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./prisma.js";

const port = env.PORT;

async function start() {
  try {
    if (env.DATABASE_URL && env.DATABASE_URL.trim() !== "") {
      await prisma.$connect();
      console.log("✅ Connected to database");
    } else {
      console.warn("⚠️  DATABASE_URL not set — skipping DB connect");
    }

    app.listen(port, () => {
      // Prefer to show the public APP_URL when available (e.g. Railway).
      const publicUrl = env.APP_URL ? env.APP_URL.replace(/\/$/, "") : `http://localhost:${port}`;
      console.log(`✅ Server running on ${publicUrl}`);
    });
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1);
  }
}

start();
