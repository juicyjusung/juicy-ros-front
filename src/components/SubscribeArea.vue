<template>
  <v-container fluid>
    <v-row>
      <v-hover v-slot:default="{ hover }">
        <v-card width="100%" class="ma-2" :elevation="hover ? 4 : 2">
          <v-card-title>
            Subscription
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="topicList"
            :search="search"
            item-key="topic_name"
            show-select
            hov
            @click:row="goto"
          >
            <template v-slot:no-data>
              <p class="headline ma-auto">데이터가 없습니다.</p>
            </template>
          </v-data-table>
        </v-card>
      </v-hover>
    </v-row>
    <v-row v-for="topic in selected" :key="topic.topic_name">
      <v-card class="ma-2" title width="100%" dark>
        <v-card-title :id="topic.topic_name.replace(/\//gi, '_')" ref="topic.topic_name">
          {{ topic.topic_name }}
        </v-card-title>
        <perfect-scrollbar>
          <v-textarea
            :value="JSON.stringify(topic.message, null, 4)"
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
  props: ['topicList', 'rosObj'],
  data: () => ({
    search: '',
    selected: [],
    headers: [
      {
        text: 'Topic Name',
        value: 'topic_name',
      },
      {
        text: 'Message Type',
        value: 'message_type',
      },
    ],
  }),
  computed: {},
  watch: {
    selected: function(curList, prevList) {
      if (!curList) return;
      prevList.forEach(topic => {
        topic.topicObj.unsubscribe();
      });
      curList.forEach((topic, index) => {
        const topicObj = new ROSLIB.Topic({
          ros: this.rosObj,
          name: topic.topic_name,
          messageTypes: topic.message_type,
        });
        this.selected[index].topicObj = topicObj;
        topicObj.subscribe(res => {
          this.selected[index].message = res;
        });
      });
    },
  },
  async mounted() {},
  methods: {
    goto: function(item) {
      if (!this.selected.includes(item)) return;
      this.$vuetify.goTo(`#${item.topic_name.replace(/\//gi, '_')}`, { offset: 0 });
    },
  },
};
</script>

<style scoped>
.text-start {
  cursor: pointer;
}
</style>
