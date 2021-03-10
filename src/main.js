import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'

Vue.use(ElementUI);

axios.defaults.baseURL = "http://api.pilibili.cn/api";


axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;

import router from './router'

import '@/assets/css/base.css'

import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
