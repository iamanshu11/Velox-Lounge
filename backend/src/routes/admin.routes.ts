import { Router } from 'express';
import { getStats, getUsers } from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, requireAdmin);
router.get('/stats', getStats);
router.get('/users', getUsers);

export default router;
