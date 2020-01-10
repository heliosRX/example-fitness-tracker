import Vue from 'vue'
import heliosRX from 'heliosrx'
import App from './App.vue'

import router from './router'

import { rtdb } from './firebase' // Import realtime database
import models from "@/models"
import api from 'heliosrx/src/api'
import GenericStore from 'heliosrx/src/store'

Vue.config.productionTip = false

Vue.use(heliosRX, {
  models: models,
})

GenericStore.setDefaultDB( rtdb );
api.get_registry().commit('INIT_REGISTRY');

window.$models = models;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
