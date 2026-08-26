import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sites } from '@openai/sites-vite-plugin';

function copyWorkerEntrypoint() {
  return {
    name: 'copy-worker-entrypoint',
    apply: 'build',
    async closeBundle() {
      const outputDirectory = resolve('dist/server');

      await mkdir(outputDirectory, { recursive: true });
      await copyFile(resolve('server/index.js'), resolve(outputDirectory, 'index.js'));
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/client',
  },
  plugins: [react(), sites(), copyWorkerEntrypoint()],
});
