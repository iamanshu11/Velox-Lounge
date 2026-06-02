import { Router } from 'express';
import { getMembership, updateMembership, activateMembership } from '../controllers/membership.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.get  ('/',         getMembership);
router.put  ('/',         updateMembership);
router.post ('/activate', activateMembership);

export default router;
