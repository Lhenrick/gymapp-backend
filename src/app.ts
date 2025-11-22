import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import userRoutes from "./routes/user.js";
import { errorHandler } from "./middleware/error.js";

// Allowed CORS origins. If you deployed the backend to Railway set APP_URL in
// your Railway project and it will automatically be added here. Keep any
// frontend origins you need (e.g., localhost:3000).
const allowed = [
  "http://localhost:3000",
  "https://click-n-fit.vercel.app",
  "https://vercel.com/lhenricks-projects/click-n-fit/ANj79AzL2tx4NzW9WeD5q2Jow6kS",
];

const app = express();
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // origin is undefined for tools like Postman
      console.log("🌐 CORS request from:", origin);

      if (!origin || allowed.includes(origin)) {
        return callback(null, true);
      }

      console.warn("❌ CORS blocked:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/user", userRoutes);
app.use("/api", routes);

app.use(errorHandler);

export default app;
