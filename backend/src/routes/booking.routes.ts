import { Router } from 'express';
import { getBookings, getBooking, createBooking, cancelBooking } from '../controllers/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.get   ('/',           getBookings);
router.post  ('/',           createBooking);
router.get   ('/:id',        getBooking);
router.patch ('/:id/cancel', cancelBooking);

export default router;
