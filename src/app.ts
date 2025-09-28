import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/error";

const allowed = [
  "http://localhost:3000",
  "https://gymapp-backend-three.vercel.app",
];

const app = express();
app.use(helmet());
app.use(cors({ origin: allowed, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);

app.use(errorHandler);

export default app;
