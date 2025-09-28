import { Router } from "express";
import auth from "./auth.js";
import catalog from "./catalog.js";
import plan from "./plan.js";
import session from "./session.js";
import stats from "./stats.js";

const router = Router();

router.use("/auth", auth);
router.use("/catalog", catalog);
router.use("/plans", plan);
router.use("/sessions", session);
router.use("/stats", stats);

export default router;
