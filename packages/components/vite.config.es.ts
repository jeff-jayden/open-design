import { defineConfig, mergeConfig } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import baseConfig from './vite.config.base';

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  return mergeConfig(baseConfig(configEnv), {
    build: {
      outDir: 'dist/es',
      lib: {
        formats: ['es']
      }
    }
  });
});
