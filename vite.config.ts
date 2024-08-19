import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [Inspect(), enhancedImages(), sveltekit()],
  ssr: {
    noExternal: ['oslo']
  }
});
