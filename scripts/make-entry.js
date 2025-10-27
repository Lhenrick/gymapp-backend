import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Ensure dist directory exists
const distDir = join(process.cwd(), 'dist');
try {
  mkdirSync(distDir, { recursive: true });
} catch (e) {
  // ignore
}

const entryPath = join(distDir, 'server.js');
const content = `// Auto-generated entry that delegates to compiled server
// This ensures platforms that run "node dist/server.js" work
import('./src/server.js').catch(err => {
  console.error('Failed to load compiled server:', err);
  process.exit(1);
});
`;

writeFileSync(entryPath, content, { encoding: 'utf8' });
console.log('Created', entryPath);
