import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createSession, addSet, mySessions } from "../controllers/session.js";
import { validateBody } from "../middleware/validate.js";
import { addSetSchema, createSessionSchema } from "../schemas/session.js";

const router = Router();
router.use(requireAuth);
router.get("/", mySessions);
router.post("/", validateBody(createSessionSchema), createSession);
router.post("/:sessionId/sets", validateBody(addSetSchema), addSet);

export default router;
