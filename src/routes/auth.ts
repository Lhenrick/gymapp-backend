import { Router } from "express";
import { login, me, register } from "../controllers/auth.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", requireAuth, me);

export default router;
