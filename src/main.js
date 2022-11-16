import IconWrapper from '~/components/icon-wrapper.vue'
import { vfmPlugin } from 'vue-final-modal'
import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import { hook } from '~/core/middleware'
hook(router)

const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia)
app.use(vfmPlugin)

app.component('icon-wrapper', IconWrapper)

router.isReady().then(() => app.mount('#app'))
