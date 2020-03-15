import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthStore from '@/store/auth';
import RosStore from '@/store/ros';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    // Only persist the cart store in local storage.
    cartStore: state.cartStore,
  }),
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore: AuthStore,
    rosStore: RosStore,
  },

  // This plugin automatically make the data from stores persist by saving it into local storage.
  plugins: [vuexLocal.plugin],
});
