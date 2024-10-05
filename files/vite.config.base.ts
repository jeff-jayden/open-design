import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import type { ConfigEnv, UserConfig, UserConfigFn } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      VueMacros.vite({
        plugins: {
          vue: vue()
        }
      }),
      dts({
        tsconfigPath: 'tsconfig.build.json',
        outDir: 'dist/types'
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'enum.ts'),
        name: 'open-design',
        fileName: 'open-design'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          assetFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'style.css') {
              return 'index.css';
            }
            return chunkInfo.name as string;
          }
        }
      }
    }
  };
}) as UserConfigFn;
