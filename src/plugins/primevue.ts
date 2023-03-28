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
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import ScrollTop from 'primevue/scrolltop'
import ScrollPanel from 'primevue/scrollpanel'
import Divider from 'primevue/divider'

export default (app: App) => {
  app.component('Button', Button)
  app.component('Image', Image)
  app.component('InputText', InputText)
  app.component('SelectButton', SelectButton)
  app.component('Card', Card)
  app.component('Rating', Rating)
  app.component('Tag', Tag)
  app.component('ScrollTop', ScrollTop)
  app.component('ScrollPanel', ScrollPanel)
  app.component('Divider', Divider)
}
