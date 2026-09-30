// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kevinwebpaez.github.io',
  base: '/Ceb_comunicaivo',
  prefetch: { prefetchAll: true },
  vite: {
    plugins: [tailwindcss()],
  },
});