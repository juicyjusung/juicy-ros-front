import ROSLIB from 'roslib';
import * as COMMON from '../store/CommonTypes';
import * as ROS from '../store/RosTypes';

const RosPlugin = {
  install(Vue, { store }) {
    const ros = new ROSLIB.Ros();
    ros.on('error', e => {
      store.commit(COMMON.ADD_SNACK_ITEM, { color: 'error', message: '연결실패!' });
      store.commit(ROS.SET_ROS_STATUS, 'disconnected');
      console.error(e);
    });
    ros.on('connection', () => {
      const message = `연결 성공! [${ros.socket.url}]`;
      store.commit(ROS.SET_ROS_STATUS, 'connected');
      console.log(message);
      store.commit(COMMON.ADD_SNACK_ITEM, { color: 'success', message: message });
    });
    ros.on('close', () => {
      store.commit(COMMON.ADD_SNACK_ITEM, { color: 'info', message: '연결이 종료되었습니다!' });
      store.commit(ROS.SET_ROS_STATUS, 'disconnected');
      console.log('Connection closed.');
    });
    Vue.prototype.$ros = () => {
      return ros;
    };
    Vue.prototype.$rosconnect = URL => {
      ros.connect(URL);
    };
  },
};

export default RosPlugin;
