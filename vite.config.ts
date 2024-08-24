import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { visualizer } from "rollup-plugin-visualizer";
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
    //Inspect(),
    enhancedImages(),
    sveltekit(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  build: {
    minify: true,
    /*rollupOptions: {
      output: {
        manualChunks(id: string) {
          console.log("CHUNK ID: ", id)
          if (id.includes('@melt-ui')) {
            return 'melt-ui'
          }
          if (id.includes('bits-ui')) {
            return `bits-ui`;
          }
        }
      }
    }*/
  },
  ssr: {
    noExternal: ['oslo']
  },
})
