import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT:            parseInt(process.env.PORT || '5004'),
  NODE_ENV:        process.env.NODE_ENV || 'development',
  JWT_SECRET:      process.env.JWT_SECRET || 'fallback-secret-change-in-production-32chars',
  JWT_EXPIRES_IN:  process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN:     process.env.CORS_ORIGIN || 'http://localhost:3004',
  isDev:           (process.env.NODE_ENV || 'development') === 'development',
  isProd:          process.env.NODE_ENV === 'production',
};
