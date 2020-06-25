import Vue from 'vue'
import VueScrollactive from 'vue-scrollactive'
import Toasted from 'vue-toasted'
import VueAnalytics from 'vue-analytics'

import App from './main/App.vue'
import router from './main/router'
import store from './main/store'

import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

import './main/modules'

Vue.use(VueScrollactive)
Vue.use(Toasted, {
  theme: 'outline',
  duration: 3000,
  position: 'bottom-right',
})
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS_ID,
  router,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
