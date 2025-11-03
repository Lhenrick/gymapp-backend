import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.js";
import { env } from "./config/env.js";

// Allowed CORS origins. If you deployed the backend to Railway set APP_URL in
// your Railway project and it will automatically be added here. Keep any
// frontend origins you need (e.g., localhost:3000).
const allowed = [
  "http://localhost:3000",
  "https://gymapp-backend-three.vercel.app",
  env.APP_URL,
];

const app = express();
app.use(helmet());
app.use(cors({ origin: allowed, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Provide the health route both at /health and /api/health so deployments
// (or external checks) that target the /api prefix work as expected.
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api", routes);

app.use(errorHandler);

export default app;
