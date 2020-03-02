import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import * as USER from './UserTypes';
import * as ROS from './RosTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('_user_')),
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
  },
  mutations: {
    [USER.LOGIN]: (state, payload) => {
      state.user = payload.user;
      localStorage.setItem('_user_', JSON.stringify(payload.user));
    },
    [USER.LOGOUT]: state => {
      state.user = null;
      localStorage.removeItem('_user_');
    },
    [ROS.SET_TOPIC_LIST]: (state, payload) => {
      state.topiclist = payload.topiclist;
    },
    [ROS.ADD_TOPIC]: (state, payload) => {
      state.topiclist.push(payload.topic);
    },
    [ROS.ADD_MSGTYPE]: (state, payload) => {
      state.msgtypelist.push(payload.msgtype);
    },
    [ROS.SET_MSG_TYPE_LIST]: (state, payload) => {
      state.msgtypelist = payload.msgtypelist;
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
    [ROS.GET_TOPIC_LIST]: async ({ state, commit }) => {
      // const URL = '';
      // const res = await axios({
      //   method: 'get',
      //   url: URL,
      // });
      // const { data } = res;
      const data = {
        topiclist: ['/clobot/chatbot/link_append', '/clobot/chatbot/link_append2', '/clobot/chatbot/link_append3'],
      };
      commit(ROS.SET_TOPIC_LIST, data);
    },
    //payload : pubdata
    [ROS.SET_PUB_LIST]: async ({ state, commit }, payload) => {
      commit(ROS.SET_PUB_LIST, payload);
    },
  },
  modules: {},
});
