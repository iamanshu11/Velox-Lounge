import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { notFoundHandler, globalErrorHandler } from './middlewares/error.middleware';

// Routes
import authRoutes       from './routes/auth.routes';
import membershipRoutes from './routes/membership.routes';
import epassRoutes      from './routes/epass.routes';
import loungeRoutes     from './routes/lounge.routes';
import bookingRoutes    from './routes/booking.routes';
import profileRoutes    from './routes/profile.routes';
import activityRoutes   from './routes/activity.routes';
import adminRoutes      from './routes/admin.routes';

const app = express();

// ─── Security ───────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin:      env.CORS_ORIGIN,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// ─── Rate limiting ───────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      20,
  message:  { success: false, error: 'Too many requests, please try again later.' },
});

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max:      200,
  message:  { success: false, error: 'Too many requests.' },
});

app.use(globalLimiter);

// ─── Parsing & logging ───────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.isDev ? 'dev' : 'combined'));

// ─── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.NODE_ENV });
});

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth',       authLimiter, authRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/epasses',    epassRoutes);
app.use('/api/lounges',    loungeRoutes);
app.use('/api/bookings',   bookingRoutes);
app.use('/api/profile',    profileRoutes);
app.use('/api/activity',   activityRoutes);
app.use('/api/admin',      adminRoutes);

// ─── Error handling ──────────────────────────────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
