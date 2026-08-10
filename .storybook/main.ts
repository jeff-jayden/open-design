import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, '..');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  async viteFinal(userConfig) {
    return mergeConfig(userConfig, {
      plugins: [
        VueMacros.vite({
          plugins: {
            vue: vue()
          }
        })
      ],
      resolve: {
        alias: {
          '@open-design/components': path.join(monorepoRoot, 'packages/components'),
          '@open-design/hooks': path.join(monorepoRoot, 'packages/hooks'),
          '@open-design/constants': path.join(monorepoRoot, 'packages/constants'),
          '@open-design/utils': path.join(monorepoRoot, 'packages/util'),
          '@open-design/styles': path.join(monorepoRoot, 'packages/styles')
        }
      }
    });
  }
};

export default config;
