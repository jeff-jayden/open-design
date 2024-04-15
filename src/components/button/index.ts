import OpenButton from "@/components/button/button.vue";
import type {App} from "vue";

OpenButton.install = (app: App) => {
    app.component(OpenButton.name, OpenButton)
}

export default OpenButton
export * from './types'