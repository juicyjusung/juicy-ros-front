import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import RosPlugin from './plugins/ros';
import UtilPlugin from './plugins/util';
import VuetifySnackbarQueue from 'vuetify-snackbar-queue';

Vue.config.productionTip = false;

Vue.use(UtilPlugin, { store });
Vue.use(RosPlugin, { store });
Vue.use(VuetifySnackbarQueue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
