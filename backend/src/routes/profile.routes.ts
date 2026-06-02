import { Router } from 'express';
import { updateProfile, changePassword } from '../controllers/profile.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.put   ('/',         updateProfile);
router.patch ('/password', changePassword);

export default router;
