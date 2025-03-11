import type { App } from 'vue';
import OpenDropDown from './src/DropDown.vue';

OpenDropDown.install = (app: App) => {
  app.component(OpenDropDown.name, OpenDropDown);
};

export default OpenDropDown;
export { OpenDropDown };
export * from './src/types';
