import * as COMMON from '../store/CommonTypes';

export default {
  install(Vue, { store }) {
    Vue.prototype.$alert = (color, message) => {
      store.commit(COMMON.ADD_SNACK_ITEM, { color, message });
    };
  },
};
