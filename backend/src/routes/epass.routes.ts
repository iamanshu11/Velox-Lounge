import { Router } from 'express';
import { getEPasses, getEPass, createEPass, cancelEPass } from '../controllers/epass.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.get   ('/',           getEPasses);
router.post  ('/',           createEPass);
router.get   ('/:id',        getEPass);
router.patch ('/:id/cancel', cancelEPass);

export default router;
