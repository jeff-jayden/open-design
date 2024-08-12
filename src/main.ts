import { createApp } from 'vue';
import './styles/index.css';
import '@qinloong/snow-sky/dist/index.css';
import 'element-plus/dist/index.css';

import ElementPlus from 'element-plus';
import snowDesign from '@qinloong/snow-sky';
import App from './App.vue';

const app = createApp(App);
app.use(snowDesign);
app.use(ElementPlus);

app.mount('#app');
