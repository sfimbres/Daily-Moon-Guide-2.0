//import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)
app.config.globalProperties.$window = window;
app.mount('#app')
