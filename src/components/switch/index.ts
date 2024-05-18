import {App} from 'vue'
import OpenSwitch from "@/components/switch/switch.vue";

OpenSwitch.install = (app: App) => {
    app.component(OpenSwitch.name, OpenSwitch)
}

export default OpenSwitch
export * from './types'