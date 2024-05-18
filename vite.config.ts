import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// 为了解析后缀为.vue文件
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import {resolve} from "node:path";
import VueMacros from 'unplugin-vue-macros'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(), // if needed
      },
    }),
    VueDevTools(),
    // 配置TypeScript声明文件的插件，指定了tsconfig文件的路径。
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  //这个配置主要用于开发阶段和生产构建阶段，影响Vite的模块解析和打包过程。
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "open-design",
      fileName: "open-design",
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
      ],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (chunkInfo) => {
          console.log(chunkInfo)
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name as string;
        },
      },
    },
  }
})
