import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx() // if needed
      }
    }),
    dts({
      tsconfigPath: './tsconfig.web.json',
      outDir: 'dist/types'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'packages/components/index.ts'),
      name: 'open-design',
      fileName: 'open-design',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'async-validator', '@popperjs/core', 'axios'],
      output: {
        assetFileNames: (chunkInfo) => {
          // console.log(chunkInfo)
          if (chunkInfo.name === 'style.css') {
            return 'index.css';
          }
          return chunkInfo.name as string;
        }
      }
    }
  }
});

// import {defineConfig, mergeConfig, UserConfig} from "vite";
// import baseConfig from './vite.config'
// import {resolve} from "node:path";
// import dts from "vite-plugin-dts";
//
// // https://vitejs.dev/config/
// const config =  defineConfig({
//   plugins: [
//     dts({
//       tsconfigPath: "./tsconfig.build.json",
//       outDir: "dist/types",
//     })
//   ],
//   build: {
//     outDir: "dist/es",
//     lib: {
//       entry: resolve(__dirname, "src/index.js"),
//       fileName: 'open-design',
//       formats: ["es"]
//     }
//   }
// })
//
// const mergeConfigList = mergeConfig(baseConfig, config)
// console.log("===================================================")
// console.log(JSON.stringify(mergeConfigList))
// console.log("===================================================")
// export default mergeConfigList

/**
 * {
 *   plugins: [
 *     VueMacros.vite({
 *       plugins: {
 *         vue: vue(),
 *         vueJsx: vueJsx(), // if needed
 *       },
 *     }),
 *     dts({
 *       tsconfigPath: "./tsconfig.build.json",
 *       outDir: "dist/types",
 *     }),
 *   ],
 *   resolve: {
 *     alias: {
 *       "@": fileURLToPath(new URL("./src", import.meta.url)),
 *     },
 *   },
 *   build: {
 *     outDir: "dist/es",
 *     lib: {
 *       entry: resolve(__dirname, "src/index.js"),
 *       name: "open-design",
 *       fileName: "open-design",
 *       formats: ["es"],
 *     },
 *     rollupOptions: {
 *       external: [
 *         "vue",
 *         "@fortawesome/fontawesome-svg-core",
 *         "@fortawesome/free-solid-svg-icons",
 *         "@fortawesome/vue-fontawesome",
 *         "async-validator",
 *         "@popperjs/core",
 *         "axios",
 *       ],
 *       output: {
 *         assetFileNames: (chunkInfo) => {
 *           // console.log(chunkInfo)
 *           if (chunkInfo.name === "style.css") {
 *             return "index.css";
 *           }
 *           return chunkInfo.name as string;
 *         },
 *       },
 *     },
 *   },
 * }
 */
