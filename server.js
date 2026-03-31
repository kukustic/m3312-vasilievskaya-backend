import 'dotenv/config';
import { execSync } from 'child_process';

try {
  console.log('Running Prisma migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Migrations applied successfully!');
} catch (err) {
  console.error('Migration failed:', err);
}

try {
  await import('./dist/src/main.js');
} catch (err) {
  console.error(
    'Failed to start Nest app. Make sure the project is built (dist/ exists).',
    err,
  );
  process.exitCode = 1;
}