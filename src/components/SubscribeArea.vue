<template>
  <v-container>
    <v-row>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="topicList"
        item-key="topicName"
        show-select
        class="elevation-1"
        hov
        @click:row="goto"
      >
      </v-data-table>
    </v-row>
    <v-row v-for="topic in filteredList" :key="topic.topicName">
      <v-card class="ma-2" title width="100%" dark>
        <v-card-title :id="topic.topicName.substring(1)">{{ topic.topicName }}</v-card-title>
        <perfect-scrollbar>
          <v-textarea
            :value="JSON.stringify(topic.res, null, 4)"
            readonly
            dark
            class="body-2"
            auto-grow
            full-width
            no-resize
          ></v-textarea>
        </perfect-scrollbar>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ROSLIB from 'roslib';
export default {
  name: 'SubscribeArea',
  data: () => ({
    excludeTopicList: ['/client_count', '/tf2_web_republisher/status'],
    selected: [],
    headers: [
      {
        text: 'Topic Name',
        value: 'topicName',
      },
      {
        text: 'Message Type',
        value: 'msgType',
      },
    ],
  }),
  computed: {
    topicList() {
      return this.$store.state.topicList;
    },
    filteredList() {
      const selectedName = this.selected.map(topic => topic.topicName);
      return this.topicList.filter(topic => selectedName.includes(topic.topicName));
    },
  },
  async mounted() {
    // this.topicList.forEach((topic, index) => {
    //   new ROSLIB.Topic({
    //     ros: this.$ros,
    //     name: topic.topicName,
    //     messageTypes: topic.msgTypes,
    //   }).subscribe(res => {
    //     this.topicList[index].res = res;
    //   });
    // });
  },
  methods: {
    subscribeTopic: function(topic) {},
    goto: function(item) {
      this.$vuetify.goTo(`#${item.topicName.substring(1)}`, { offset: 0 });
    },
  },
};
/*
  msgType:"std_msgs/Int32"
  topicName:"/client_count"

  msgType:"tf2_web_republisher/TFSubscriptionActionResult"
  topicName:"/tf2_web_republisher/result"

*/
</script>

<style scoped>
.text-start {
  cursor: pointer;
}
</style>
