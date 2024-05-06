import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import '@qinloong/snow-sky/dist/index.css'
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import snowDesign from '@qinloong/snow-sky'


library.add(fas)
const app = createApp(App)
app.use(snowDesign)
app.use(ElementPlus)

app.mount('#app')
