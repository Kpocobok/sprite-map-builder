const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['electron/main.ts', 'electron/preload.ts'],
    bundle: true,
    platform: 'node',
    outdir: 'electron',
    tsconfig: 'tsconfig.json',
    external: ['electron'],
  })
  .catch(() => process.exit(1));
