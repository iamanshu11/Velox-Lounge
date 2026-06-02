import app from './app';
import { env } from './config/env';
import { testConnection } from './config/db';

async function start(): Promise<void> {
  try {
    await testConnection();

    app.listen(env.PORT, () => {
      console.log(`\n🚀 DragonPass API running on http://localhost:${env.PORT}`);
      console.log(`   Environment : ${env.NODE_ENV}`);
      console.log(`   Health check: http://localhost:${env.PORT}/health\n`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
