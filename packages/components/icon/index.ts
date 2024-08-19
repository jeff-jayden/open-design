import type { App } from 'vue';
import OpenIcon from './src/icon.vue';

OpenIcon.install = (app: App) => {
  app.component(OpenIcon.name, OpenIcon);
};

export default OpenIcon;
export * from './src/types';
