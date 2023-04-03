import { createApp } from 'vue'
import AppVue from '@/App.vue'
import { App } from '@vue/runtime-core'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import installPrimeVueComps from '@/plugins/primevue'

import '@/style/index.scss'
import 'virtual:svg-icons-register'

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});

const app: App = createApp(AppVue)

installPrimeVueComps(app)

app.use(router)
  .use(createPinia())
  .use(PrimeVue)
  .use(VMdPreview)
app.mount('#app')
