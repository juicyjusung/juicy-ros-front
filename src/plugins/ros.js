import ROSLIB from 'roslib';
import * as COMMON from '../store/CommonTypes';
import * as ROS from '../store/RosTypes';

const RosPlugin = {
  install(Vue, { store }) {
    let ros;

    const initRos = URL => {
      if (ros) ros.close();
      ros = new ROSLIB.Ros();
      ros.connect(URL);
      ros.on('connection', async () => {
        const message = `연결 성공! [${ros.socket.url}]`;
        store.commit(ROS.SET_ROS_STATUS, 'connected');
        const topicList = await getTopicList(ros);
        console.log(topicList);
        topicList.forEach((topic, index) => {
          new ROSLIB.Topic({
            ros,
            name: topic.topicName,
            messageTypes: topic.msgTypes,
          }).subscribe(res => {
            store.commit(ROS.RESPONSE_MESSAGE, { index, res });
          });
        });
        store.commit(ROS.SET_TOPIC_LIST, topicList);
        store.commit(COMMON.ADD_SNACK_ITEM, { color: 'success', message: message });
      });
      ros.on('close', () => {
        store.commit(COMMON.ADD_SNACK_ITEM, { color: 'info', message: '연결이 종료되었습니다!' });
        store.commit(ROS.SET_ROS_STATUS, 'disconnected');
        console.log('Connection closed.');
      });
      ros.on('error', e => {
        store.commit(COMMON.ADD_SNACK_ITEM, { color: 'error', message: '연결실패!' });
        store.commit(ROS.SET_ROS_STATUS, 'disconnected');
        console.error(e);
      });
    };
    const getTopicList = ros => {
      return new Promise((resolve, reject) => {
        try {
          ros.getTopics(res => {
            const { topics, types } = res;
            resolve(topics.map((topic, index) => ({ topicName: topic, msgType: types[index], message: '' })));
          });
        } catch (e) {
          reject(e);
        }
      });
    };

    Vue.prototype.$ros = () => {
      return ros;
    };
    Vue.prototype.$rosconnect = async URL => {
      console.log('ROS연결 시도');
      initRos(URL);
    };
  },
};

export default RosPlugin;
