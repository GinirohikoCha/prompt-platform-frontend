import { App } from '@vue/runtime-core'
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
import Tooltip from 'primevue/tooltip'
import OverlayPanel from 'primevue/overlaypanel'
import Textarea from 'primevue/textarea'
import Message from 'primevue/message'
import Checkbox from 'primevue/checkbox'
import InputMask from 'primevue/inputmask'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Fieldset from 'primevue/fieldset'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

export default (app: App) => {
  app.directive('tooltip', Tooltip)
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
  app.component('OverlayPanel', OverlayPanel)
  app.component('Textarea', Textarea)
  app.component('Message', Message)
  app.component('Checkbox', Checkbox)
  app.component('InputMask', InputMask)
  app.component('Password', Password)
  app.component('Toast', Toast)
  app.use(ToastService)
  app.component('Fieldset', Fieldset)
  app.component('Avatar', Avatar)
  app.component('Dialog', Dialog)
  app.component('ConfirmDialog', ConfirmDialog)
  app.use(ConfirmationService)
}
