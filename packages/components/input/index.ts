import type { App } from 'vue';
import OpenInput from '@/components/input/input.vue';

OpenInput.install = (app: App) => {
  app.component(OpenInput.name, OpenInput);
};

export default OpenInput;
export * from './src/types';
