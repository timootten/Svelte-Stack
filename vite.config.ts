import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { visualizer } from "rollup-plugin-visualizer";
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
    Inspect(), enhancedImages(), sveltekit(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  //build: { minify: false },
  ssr: {
    noExternal: ['oslo']
  }
});
