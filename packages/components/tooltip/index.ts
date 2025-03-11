import type { App } from 'vue';
import OpenToolTip from './src/tooltip.vue';

OpenToolTip.install = (app: App) => {
  app.component(OpenToolTip.name, OpenToolTip);
};

export default OpenToolTip;
export { OpenToolTip };
export * from './src/types';
