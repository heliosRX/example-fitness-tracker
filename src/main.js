import Vue from 'vue';
import App from './App.vue';

import heliosRX from 'heliosrx';
import { rtdb } from './firebase'; // Import realtime database
import models from "@/models";
import '@/user-management';
// import store from '@/store'

/* -------------------- Global CSS imports ---------------------------------- */
import "milligram"
import './styles/helios-simple.scss';

/* -------------------- Global CSS imports ---------------------------------- */
Vue.use(heliosRX, {
  models:  models,
  db:      rtdb,
  devMode: true,
  // useExistingStore: store,
});

if ( process.browser ) {
  window.$heliosRX = heliosRX;
}

/* ------------------------ Import Resource Loader -------------------------- */
let loader = require("@/resource-loader.js").default;
loader.beforeAppStartsLoading();

// import router from './router'
let router = require("@/router").default;
loader.connectRouter( router );

/* ---------------------------- Vue Config ---------------------------------- */
Vue.config.productionTip = false;

export default new Vue({
  // db: db,
  // store: store,
  router,
  render: h => h(App)
}).$mount('#app');
