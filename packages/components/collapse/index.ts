import type { App } from 'vue';
import Collapse from './src/collapse.vue';
import CollapseItem from './src/collapse-item.vue';

Collapse.install = (app: App) => {
  app.component(Collapse.name, Collapse);
};
CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name, CollapseItem);
};
export default Collapse;
export { CollapseItem, Collapse };
export * from './src/types';
