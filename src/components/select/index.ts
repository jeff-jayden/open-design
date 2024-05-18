import type {App} from 'vue'
import Select from './select.vue'

Select.install = (app: App) => {
    app.component(Select.name, Select)
}

export default Select
export * from './types'
