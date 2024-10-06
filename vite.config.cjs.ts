import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue({
          isProduction: true,
          template: {
            compilerOptions: {
              hoistStatic: false,
              cacheHandlers: false
            }
          }
        })
      }
    }),
    dts({
      tsconfigPath: './tsconfig.web.json',
      outDir: 'dist/types'
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
      output: {
        exports: 'named',
        preserveModules: true,
        entryFileNames: '[name].js'
      }
    }
  }
});
