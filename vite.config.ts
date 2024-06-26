import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [Inspect(), sveltekit()],
  ssr: {
    noExternal: ['oslo']
  }
});
