import { defineConfig } from 'vite';

export default defineConfig({
  base: '/map/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  define: {
    __MAP_STROKE__: JSON.stringify('#334155'),
    __WORLD_FILTER__: JSON.stringify('area'), // 'area' or 'gdp'
    __WORLD_TOPN__: JSON.stringify(10)
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
