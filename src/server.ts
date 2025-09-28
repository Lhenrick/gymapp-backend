import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./prisma.js";

const port = env.PORT;

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1);
  }
}

start();
