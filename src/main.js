import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import RosPlugin from './plugins/ros';
import UtilPlugin from './plugins/util';
import VuetifySnackbarQueue from 'vuetify-snackbar-queue';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import '@/assets/css/global.scss';
import '@/assets/css/overrides.scss';
import './plugins/axios';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;

Vue.use(UtilPlugin, { store });
Vue.use(RosPlugin, { store });
Vue.use(VuetifySnackbarQueue);
Vue.use(PerfectScrollbar);
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
