import { createApp } from 'vue'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import installPrimeVueComps from '@/plugins/primevue'

import '@/style/index.scss'

const app: App = createApp(App)

installPrimeVueComps(app)

app.use(PrimeVue)
app.mount('#app')
