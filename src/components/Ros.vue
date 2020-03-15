<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6" class="content">
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
      </v-col>
      <v-col cols="6" class="content">
        <SubscribeArea :key="currentRos._id" :topic-list="topicList" :ros-obj="ros"></SubscribeArea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ROSLIB from 'roslib';
import { eventHub } from '@/utils/EventHub';
import SubscribeArea from '@/components/SubscribeArea';

export default {
  name: 'Ros',
  components: { SubscribeArea },
  props: ['currentRos'],
  data: () => ({
    ros: undefined,
    status: 'disconnected',
    topicList: undefined,
  }),
  watch: {
    status: async function(status) {
      if (status === 'connected') {
        this.topicList = await this.getTopicList(this.ros);
      }
    },
  },
  mounted() {
    this.ros = this.currentRos;
    this.initRos(this.currentRos);
  },
  beforeDestroy() {
    if (this.ros) this.ros.close();
  },
  methods: {
    initRos: function(currentros) {
      if (!currentros.url) return;
      this.ros = new ROSLIB.Ros();
      this.ros
        .on('connection', () => {
          eventHub.$emit('websocket-connected');
          this.status = 'connected';
          this.$store.commit('rosStore/setRosStatus', 'connected');
          this.$notify({
            group: 'all',
            type: 'success',
            text: `[${currentros.connection_name}] 연결 성공 [${currentros.url}]`,
          });
        })
        // .on('close', () => {
        //   this.$notify({
        //     group: 'all',
        //     type: 'info',
        //     text: `[${currentros.connection_name}] 연결 해제 [${currentros.url}]`,
        //   });
        // })
        .on('error', () => {
          eventHub.$emit('websocket-errored');
          this.status = 'disconnected';
          this.$notify({
            group: 'all',
            type: 'error',
            text: `[${currentros.connection_name}] 연결 에러 [${currentros.url}]`,
          });
        });
      this.ros.connect(currentros.url);
      eventHub.$emit('before-websocket-connect');
    },
    getTopicList: function(ros) {
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
    },
  },
};
</script>

<style scoped></style>
