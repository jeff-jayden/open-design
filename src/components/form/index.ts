import type {App} from 'vue'
import Form from './form.vue'
import FormItem from './form-item.vue'

Form.install = (app: App) => {
    app.component(Form.name, Form)
}

FormItem.install = (app: App) => {
    app.component(FormItem.name, FormItem)
}

export default Form;
export {Form, FormItem};

export * from './types'