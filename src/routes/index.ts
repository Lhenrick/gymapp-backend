import { Router } from 'express';
import auth from './auth';
import catalog from './catalog';
import plan from './plan';
import session from './session';
import stats from './stats';

const router = Router();

router.use('/auth', auth);
router.use('/catalog', catalog);
router.use('/plans', plan);
router.use('/sessions', session);
router.use('/stats', stats);

export default router;
