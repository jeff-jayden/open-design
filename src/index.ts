import type {App} from "vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import "./styles/index.css";
import OpButton from "@/components/button";
import OpIcon from '@/components/icon'

library.add(fas)

const components = [
    OpButton,
    OpIcon
]

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.name, component)
    })
}

export {
    OpButton,
    OpIcon
}

export default {
    install
}