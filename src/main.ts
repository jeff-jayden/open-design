import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import '@jeff-jayden/open-design/dist/index.css'
import openDesign from '@jeff-jayden/open-design'


library.add(fas)
const app = createApp(App)
app.use(openDesign)

app.mount('#app')
