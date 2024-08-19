import type { App } from 'vue';
import Form from './src/form.vue';
import FormItem from './src/form-item.vue';

Form.install = (app: App) => {
  app.component(Form.name, Form);
};

FormItem.install = (app: App) => {
  app.component(FormItem.name, FormItem);
};

export default Form;
export { Form, FormItem };

export * from './src/constant'
export * from './src/types';
