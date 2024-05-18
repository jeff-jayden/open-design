import OpenButton from "@/components/button/button.vue";
import OpenButtonGroup from "@/components/button/button-group.vue";
import type {App} from "vue";

OpenButton.install = (app: App) => {
    app.component(OpenButton.name, OpenButton)
}

OpenButtonGroup.install = (app: App) => {
    app.component(OpenButtonGroup.name, OpenButtonGroup)
}

export default OpenButton
export {OpenButton, OpenButtonGroup}
export * from './types'