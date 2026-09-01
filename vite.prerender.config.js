import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Compiles scripts/prerender.jsx (and the App tree it imports) into a plain
 * Node bundle so the static HTML can be generated after the client build.
 * Kept separate from vite.config.js so the normal build is untouched.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'scripts/prerender.jsx',
    outDir: 'node_modules/.prerender',
    emptyOutDir: true,
    // CSS is already emitted by the client build; this pass only needs markup.
    cssCodeSplit: false,
    minify: false,
    rollupOptions: {
      output: { entryFileNames: 'prerender.mjs' },
    },
  },
});
