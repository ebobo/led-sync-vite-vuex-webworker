import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import store from './store'; // Import your Vuex store

const app = createApp(App);
app.use(store); // Use the store
app.mount('#app');
