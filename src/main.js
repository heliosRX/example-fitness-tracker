import Vue from 'vue'
import App from './App.vue'

import router from './router'

import heliosRX from 'heliosrx'
import { rtdb } from './firebase' // Import realtime database
import models from "@/models"

/* -------------------- Global CSS imports ---------------------------------- */
import "milligram"
import './styles/helios-simple.scss';

Vue.use(heliosRX, {
  models:  models,
  db:      rtdb,
  devMode: true,
})

/* ---------------------------- Vue Config ---------------------------------- */
Vue.config.productionTip = false

export default new Vue({
  // db: db,
  // store: store,
  router,
  render: h => h(App)
}).$mount('#app')
