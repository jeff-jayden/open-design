import { App } from 'vue';
import OpenSwitch from './src/switch.vue';

OpenSwitch.install = (app: App) => {
  app.component(OpenSwitch.name, OpenSwitch);
};

export default OpenSwitch;

export * from './src/types';
