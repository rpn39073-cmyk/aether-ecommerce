import { execSync } from 'child_process';

console.log('Installing Server Dependencies...');
execSync('npm install', { cwd: './server', stdio: 'inherit' });

console.log('Installing Root Dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Building Frontend...');
// Using execSync directly with vite to avoid recursive npm scripts
execSync('npx vite build', { stdio: 'inherit' });

console.log('Build Complete. The frontend static files are located in server/public.');
