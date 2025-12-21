import './assets/demo.css';

import '@open-design/styles/src/index.scss';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus).mount('#app');
