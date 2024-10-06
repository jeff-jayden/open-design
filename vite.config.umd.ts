import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue()
      }
    })
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, 'packages/components/index.ts'),
      name: 'open-design',
      fileName: 'open-design',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
