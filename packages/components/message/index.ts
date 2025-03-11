import type { App } from 'vue';
import OpenMessage from './src/message.vue';

OpenMessage.install = (app: App) => {
  app.component(OpenMessage.name, OpenMessage);
};

export { createMessage, closeAll } from './src/methods';
export default OpenMessage;

export * from './src/instance';
export * from './src/types';
