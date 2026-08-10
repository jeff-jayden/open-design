import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import { externalDependencies } from './vite.config.shared';

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue({ isProduction: true })
      }
    }),
    dts({
      tsconfigPath: './tsconfig.web.json',
      entryRoot: 'packages',
      outDir: ['dist/es', 'dist/types'],
      copyDtsFiles: true,
      exclude: ['**/*.{test,spec}.{ts,tsx}', '**/_test_/**']
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
      external: externalDependencies,
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
