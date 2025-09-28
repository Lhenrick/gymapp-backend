import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createPlanSchema } from '../schemas/plan';
import { createPlan, myPlans, deletePlan } from '../controllers/plan';

const router = Router();
router.use(requireAuth);
router.get('/', myPlans);
router.post('/', validateBody(createPlanSchema), createPlan);
router.delete('/:id', deletePlan);

export default router;
