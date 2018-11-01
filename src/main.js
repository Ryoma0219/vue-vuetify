// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from 'vuetify'
import axios from 'axios'
import store from './store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.http = Vue.prototype.$http = axios
Vue.use(vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
