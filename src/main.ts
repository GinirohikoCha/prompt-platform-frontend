import { createApp } from 'vue'
import AppVue from '@/App.vue'
import { App } from '@vue/runtime-core'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import installPrimeVueComps from '@/plugins/primevue'

import '@/style/index.scss'
import 'virtual:svg-icons-register'

const app: App = createApp(AppVue)

installPrimeVueComps(app)

app.use(router)
  .use(createPinia())
  .use(PrimeVue)
app.mount('#app')
