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
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'open-design',
      fileName: 'open-design',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'async-validator', '@popperjs/core', 'axios'],
      output: {
        dir: 'dist/es',
        preserveModules: true,
        entryFileNames: '[name].mjs'
        // sourcemap: true

        // 修改静态资源的名字
        // assetFileNames(assetInfo) {
        //   if (assetInfo.name === 'style.css') {
        //     return 'index.css';
        //   }
        // }

        // 分割代码的时候用的
        // manualChunks(id: string) {
        //   if (id.includes('node_modules')) {
        //     return 'vendors';
        //   }
        // },
        // chunkFileNames: '[name]-[hash].mjs'
      }
    }
  }
});
