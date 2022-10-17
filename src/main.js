import { createApp } from 'vue'
import './style.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import App from './App.vue'

const app = createApp(App).mount('#app');

app.use(PrimeVue);
