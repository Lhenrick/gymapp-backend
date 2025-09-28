import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { createSession, addSet, mySessions } from '../controllers/session';
import { validateBody } from '../middleware/validate';
import { addSetSchema, createSessionSchema } from '../schemas/session';

const router = Router();
router.use(requireAuth);
router.get('/', mySessions);
router.post('/', validateBody(createSessionSchema), createSession);
router.post('/:sessionId/sets', validateBody(addSetSchema), addSet);

export default router;
