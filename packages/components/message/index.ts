import type { App } from 'vue';
import OpenMessage from '@/components/message/message.vue';

OpenMessage.install = (app: App) => {
  app.component(OpenMessage.name, OpenMessage);
};

export { createMessage, closeAll } from './methods';
export default OpenMessage;
export * from './types';
