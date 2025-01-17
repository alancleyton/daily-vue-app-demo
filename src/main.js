import { createApp } from 'vue';

import { configureStore } from './store/config';
import App from './App.vue';
import './style.css';

const store = configureStore();

const app = createApp(App);
app.use(store);
app.mount('#app');
