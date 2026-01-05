import { build } from 'esbuild';
import { writeFileSync } from 'fs';

// Build the server worker
await build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/_worker.js',
  platform: 'browser',
  conditions: ['worker', 'browser'],
  external: [],
});

// Create _routes.json to only route API calls to the worker
writeFileSync('dist/_routes.json', JSON.stringify({
  version: 1,
  include: ['/api/*'],
  exclude: []
}, null, 2));

console.log('✅ Worker built successfully');
console.log('✅ Routes configuration created');
