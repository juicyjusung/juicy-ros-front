import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import * as USER from './UserTypes';
import * as ROS from './RosTypes';
import * as COMMON from './CommonTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('_user_')),
    rosip: '',
    rosstatus: '',
    topiclist: {},
    msgtypelist: {},
    pubdata: [
      {
        pubname: '퍼블리셔이름퍼블리셔이름름',
        topicName: '/clobot/link_append1',
        msgType: 'std_msgs/Boolean',
        msg: '{a: 1}',
      },
      {
        pubname: '213',
        topicName: '/mediazen/link_append1',
        msgType: 'std_msgs/Boolean',
        msg: '{a: 1}',
      },
      {
        pubname: '퍼블리셔이름',
        topicName: '/clobot/chatbot/link_append',
        msgType: 'std_msgs/String',
        msg: '{a: 1}',
      },
      {
        pubname: '테스트',
        topicName: '/clobot/chatbot/link_append',
        msgType: 'std_msgs/String',
        msg: '{a: 1}',
      },
    ],
    subdata: {},
    snackid: 0,
    snackItems: [],
  },
  mutations: {
    [COMMON.ADD_SNACK_ITEM]: (state, payload) => {
      state.snackItems.push({
        id: state.snackid++,
        color: payload.color,
        message: payload.message,
      });
    },
    [COMMON.REMOVE_SNACK_ITEM]: (state, payload) => {
      const index = state.snackItems.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        state.snackItems.splice(index, 1);
      }
    },
    [USER.LOGIN]: (state, payload) => {
      state.user = payload.user;
      localStorage.setItem('_user_', JSON.stringify(payload.user));
    },
    [USER.LOGOUT]: state => {
      state.user = null;
      localStorage.removeItem('_user_');
    },
    [ROS.SET_ROS_IP]: (state, payload) => {
      state.rosip = payload;
    },
    [ROS.SET_ROS_STATUS]: (state, payload) => {
      state.rosstatus = payload;
    },
    [ROS.SET_PUB_LIST]: (state, payload) => {
      state.pubdata = payload;
    },
  },
  actions: {
    // [USER.LOGIN]: ({ state, commit, dispatch }, payload) => {
    //   if (!payload) return null;
    //
    //   try{
    //     const { data } = await axios({
    //       method: 'post',
    //       url: 'url',
    //       data: payload,
    //     });
    //     if(data) {
    //       commit()
    //     }
    //   } catch(e) {
    //     console.error(e);
    //     throw new Error(e);
    //   }
    // },
    [USER.LOGOUT]: async ({ state, commit, dispatch }, payload) => {
      const token = state.user && state.user.token;
      const auth = token ? `${token.token_type} ${token.access_token}` : null;
      const options = { headers: { Authorization: auth, 'x-requested-with': 'XMLHttpRequest' } };
      await axios.get('logouturl', options);
      commit(USER.LOGOUT);
    },
    //payload : pubdata
    [ROS.SET_PUB_LIST]: async ({ state, commit }, payload) => {
      commit(ROS.SET_PUB_LIST, payload);
    },
    [ROS.GET_ROS_IP]: async ({ state, commit }) => {
      const data = 'ws://clobot-ros.koreacentral.cloudapp.azure.com:9090';
      console.log(data);
      commit(ROS.SET_ROS_IP, data);
      return data;
    },
  },
  modules: {},
});
