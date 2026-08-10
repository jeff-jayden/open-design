import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';
import { externalDependencies } from './vite.config.shared';

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue({ isProduction: true })
      }
    })
  ],
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'open-design',
      fileName: 'open-design',
      formats: ['cjs']
    },
    rollupOptions: {
      external: externalDependencies,
      output: {
        exports: 'named',
        preserveModules: true,
        entryFileNames: '[name].js'
      }
    }
  }
});
