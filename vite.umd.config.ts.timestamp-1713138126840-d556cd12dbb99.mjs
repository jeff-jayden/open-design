// vite.umd.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/vue/open-design/node_modules/.store/vite@4.5.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue/open-design/node_modules/.store/@vitejs+plugin-vue@4.6.2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/vue/open-design/node_modules/.store/@vitejs+plugin-vue-jsx@3.1.0/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueMacros from "file:///D:/vue/open-design/node_modules/.store/unplugin-vue-macros@1.11.2/node_modules/unplugin-vue-macros/dist/index.mjs";
import { resolve } from "node:path";
var __vite_injected_original_dirname = "D:\\vue\\open-design";
var __vite_injected_original_import_meta_url = "file:///D:/vue/open-design/vite.umd.config.ts";
var vite_umd_config_default = defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx()
        // if needed
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "open-design",
      fileName: "open-design",
      formats: ["umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
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
  vite_umd_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS51bWQuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdnVlXFxcXG9wZW4tZGVzaWduXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2dWVcXFxcb3Blbi1kZXNpZ25cXFxcdml0ZS51bWQuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92dWUvb3Blbi1kZXNpZ24vdml0ZS51bWQuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSBcInVucGx1Z2luLXZ1ZS1tYWNyb3NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgVnVlTWFjcm9zLnZpdGUoe1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICB2dWU6IHZ1ZSgpLFxuICAgICAgICB2dWVKc3g6IHZ1ZUpzeCgpLCAvLyBpZiBuZWVkZWRcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3QvdW1kXCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJvcGVuLWRlc2lnblwiLFxuICAgICAgZmlsZU5hbWU6IFwib3Blbi1kZXNpZ25cIixcbiAgICAgIGZvcm1hdHM6IFtcInVtZFwiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxuICAgICAgICB9LFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xuICAgICAgICAgIGlmIChjaHVua0luZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaW5kZXguY3NzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaHVua0luZm8ubmFtZSBhcyBzdHJpbmc7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1AsU0FBUyxlQUFlLFdBQVc7QUFFelIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFDdEIsU0FBUyxlQUFlO0FBTnhCLElBQU0sbUNBQW1DO0FBQTRHLElBQU0sMkNBQTJDO0FBU3RNLElBQU8sMEJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFVBQVUsS0FBSztBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1AsS0FBSyxJQUFJO0FBQUEsUUFDVCxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQ2pCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxhQUFhO0FBQ2xDLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
