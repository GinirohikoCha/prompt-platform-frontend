import App from '@/App.vue'
import Button from 'primevue/button'

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css"
//core
import "primevue/resources/primevue.min.css"
//icons
import "primeicons/primeicons.css"

export default (app: App) => {
  app.component('Button', Button)
}
