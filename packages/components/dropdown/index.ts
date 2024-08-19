import type { App } from 'vue';
import Dropdown from './src/dropdown.vue';

Dropdown.install = (app: App) => {
  app.component(Dropdown.name, Dropdown);
};

export default Dropdown;
export * from './src/types';
