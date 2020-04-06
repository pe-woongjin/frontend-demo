import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.use(VueMomentJS, moment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
