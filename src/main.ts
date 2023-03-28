import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import installPrimeVueComps from '@/plugins/primevue'

import '@/style/index.scss'
import 'virtual:svg-icons-register'

const app: App = createApp(App)

installPrimeVueComps(app)

app.use(router)
  .use(createPinia())
  .use(PrimeVue)
app.mount('#app')
