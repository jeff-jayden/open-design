import type { App } from 'vue';
import OpenButton from './src/button.vue';
import OpenButtonGroup from './src/button-group.vue';

OpenButton.install = (app: App) => {
  app.component(OpenButton.name, OpenButton);
};

OpenButtonGroup.install = (app: App) => {
  app.component(OpenButtonGroup.name, OpenButtonGroup);
};

export default OpenButton;
export { OpenButton, OpenButtonGroup };
export * from './src/types';
