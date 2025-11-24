import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  define: {
    __MAP_STROKE__: JSON.stringify('#334155')
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
