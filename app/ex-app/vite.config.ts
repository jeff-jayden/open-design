import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isBaseline = mode === 'baseline';
  const outputDirectory = isBaseline ? 'dist-baseline' : 'dist-optimized';
  const plugins: PluginOption[] = [
    vue() as unknown as PluginOption,
    vueJsx() as unknown as PluginOption
  ];

  if (!isBaseline) {
    plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'src/auto-imports.d.ts'
      }) as unknown as PluginOption,
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
        dts: 'src/components.d.ts'
      }) as unknown as PluginOption,
      compression({ algorithm: 'gzip', threshold: 1024 }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024
      })
    );
  }

  plugins.push(
    visualizer({
      filename: `${outputDirectory}/stats.html`,
      gzipSize: true,
      brotliSize: true,
      open: false
    }) as unknown as PluginOption
  );

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: isBaseline
      ? undefined
      : {
          include: ['vue', 'element-plus/es']
        },
    build: {
      outDir: outputDirectory,
      minify: isBaseline ? 'esbuild' : 'terser',
      cssCodeSplit: true,
      terserOptions: isBaseline
        ? undefined
        : {
            compress: {
              drop_console: true,
              drop_debugger: true,
              passes: 2
            },
            format: {
              comments: false
            }
          },
      rollupOptions: {
        input: isBaseline
          ? fileURLToPath(new URL('./index.baseline.html', import.meta.url))
          : fileURLToPath(new URL('./index.html', import.meta.url)),
        output: isBaseline
          ? undefined
          : {
              manualChunks(id) {
                if (!id.includes('node_modules')) return;
                if (id.includes('/vue/') || id.includes('@vue')) return 'vue';
                if (id.includes('element-plus') || id.includes('@element-plus')) {
                  return 'element-plus';
                }
                return 'vendor';
              }
            }
      }
    }
  };
});
