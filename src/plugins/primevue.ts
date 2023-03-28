import App from '@/App.vue'
//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'
//core
import 'primevue/resources/primevue.min.css'
//icons
import 'primeicons/primeicons.css'
//flex
import 'primeflex/primeflex.css'
// comps
import Button from 'primevue/button'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'

export default (app: App) => {
  app.component('Button', Button)
  app.component('Image', Image)
  app.component('InputText', InputText)
}
