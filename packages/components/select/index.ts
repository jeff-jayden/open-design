import type { App } from 'vue';
import OpenSelect from './src/select.vue';

OpenSelect.install = (app: App) => {
  app.component(OpenSelect.name, OpenSelect);
};

export default OpenSelect;
export { OpenSelect };
export * from './src/types';
