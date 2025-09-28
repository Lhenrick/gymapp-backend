import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { createPlanSchema } from "../schemas/plan.js";
import { createPlan, myPlans, deletePlan } from "../controllers/plan.js";

const router = Router();
router.use(requireAuth);
router.get("/", myPlans);
router.post("/", validateBody(createPlanSchema), createPlan);
router.delete("/:id", deletePlan);

export default router;
