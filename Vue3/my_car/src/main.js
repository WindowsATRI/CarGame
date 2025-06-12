import './assets/base.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.VueCookies = VueCookies;
app.use(createPinia())
app.use(router)

app.mount('#app')
