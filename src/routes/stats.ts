import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { overview } from '../controllers/stats';

const router = Router();
router.use(requireAuth);
router.get('/overview', overview);

export default router;
