import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { overview } from "../controllers/stats.js";

const router = Router();
router.use(requireAuth);
router.get("/overview", overview);

export default router;
