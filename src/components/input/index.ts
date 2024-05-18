import OpenInput from "@/components/input/input.vue";
import type {App} from 'vue'


OpenInput.install = (app: App) => {
    app.component(OpenInput.name, OpenInput)
}

export default OpenInput
export * from './types'

