import Vue from 'vue'
import App from './App.vue'

import router from './router'

import heliosRX from 'heliosrx'
import { rtdb } from './firebase' // Import realtime database
import models from "@/models"

Vue.config.productionTip = false

Vue.use(heliosRX, {
  models:  models,
  db:      rtdb,
  devMode: true,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
