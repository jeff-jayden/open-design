import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';
import { umdExternalDependencies } from './vite.config.shared';

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
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'open-design',
      fileName: 'open-design',
      formats: ['umd']
    },
    rollupOptions: {
      external: umdExternalDependencies,
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue'
        }
      }
    }
  }
});
