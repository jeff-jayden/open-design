// vite.es.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/vue/open-design/node_modules/.store/vite@4.5.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue/open-design/node_modules/.store/@vitejs+plugin-vue@4.6.2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/vue/open-design/node_modules/.store/@vitejs+plugin-vue-jsx@3.1.0/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueMacros from "file:///D:/vue/open-design/node_modules/.store/unplugin-vue-macros@1.11.2/node_modules/unplugin-vue-macros/dist/index.mjs";
import { resolve } from "node:path";
import dts from "file:///D:/vue/open-design/node_modules/.store/vite-plugin-dts@3.8.2/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\vue\\open-design";
var __vite_injected_original_import_meta_url = "file:///D:/vue/open-design/vite.es.config.ts";
var vite_es_config_default = defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx()
        // if needed
      }
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/types"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "open-design",
      fileName: "open-design",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "async-validator",
        "@popperjs/core",
        "axios"
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name;
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWVcXFxcb3Blbi1kZXNpZ25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZ1ZVxcXFxvcGVuLWRlc2lnblxcXFx2aXRlLmVzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdnVlL29wZW4tZGVzaWduL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSBcInVucGx1Z2luLXZ1ZS1tYWNyb3NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBWdWVNYWNyb3Mudml0ZSh7XG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIHZ1ZTogdnVlKCksXG4gICAgICAgIHZ1ZUpzeDogdnVlSnN4KCksIC8vIGlmIG5lZWRlZFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgdHNjb25maWdQYXRoOiBcIi4vdHNjb25maWcuYnVpbGQuanNvblwiLFxuICAgICAgb3V0RGlyOiBcImRpc3QvdHlwZXNcIixcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdC9lc1wiLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwib3Blbi1kZXNpZ25cIixcbiAgICAgIGZpbGVOYW1lOiBcIm9wZW4tZGVzaWduXCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwidnVlXCIsXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxuICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxuICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXG4gICAgICAgIFwiYXhpb3NcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUgPT09IFwic3R5bGUuY3NzXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImluZGV4LmNzc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2h1bmtJbmZvLm5hbWUgYXMgc3RyaW5nO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9QLFNBQVMsZUFBZSxXQUFXO0FBRXZSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFQaEIsSUFBTSxtQ0FBbUM7QUFBMkcsSUFBTSwyQ0FBMkM7QUFVck0sSUFBTyx5QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsVUFBVSxLQUFLO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxLQUFLLElBQUk7QUFBQSxRQUNULFFBQVEsT0FBTztBQUFBO0FBQUEsTUFDakI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsYUFBYTtBQUNsQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
