import { Router } from 'express';
import { getLounges, getLounge } from '../controllers/lounge.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.get('/',    getLounges);
router.get('/:id', getLounge);

export default router;
