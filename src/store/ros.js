import ProxyUrls from '@/constants/ProxyUrls';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    ros: undefined,
    rosStatus: '',
    ross: [],
    currentRos: {},
  },
  actions: {
    async getRos({ commit }) {
      try {
        const res = await Vue.prototype.$axios({
          method: 'get',
          url: ProxyUrls.allRos,
          withCredentials: true,
        });

        if (res && res.data) {
          commit('setUserRoss', res.data.responseData.ros);
        }

        return res;
      } catch (e) {
        throw new Error(e);
      }
    },
    async addRos({ commit }, payload) {
      try {
        const res = await Vue.prototype.$axios({
          method: 'post',
          url: ProxyUrls.addRos,
          data: payload,
          withCredentials: true,
        });
        if (res && res.data) {
          commit('addRos', res.data.responseData);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    async removeRos({ commit }, payload) {
      try {
        const res = await Vue.prototype.$axios({
          method: 'post',
          url: ProxyUrls.removeRos,
          data: payload,
          withCredentials: true,
        });
        if (res && res.data) {
          commit('setUserRoss', res.data.responseData.ros);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  mutations: {
    setUserRoss: (state, payload) => {
      state.ross = payload;
    },
    addRos(state, payload) {
      console.log('addRos payload: ', payload);
      state = state.ross.push(payload);
    },
    setCurrentRos(state, payload) {
      state.currentRos = payload;
    },
    setRosStatus(state, payload) {
      state.rosStatus = payload;
    },
  },
  getters: {
    getRosConnections(state) {
      return state.ross;
    },
  },
};
