<template>
  <v-row justify="center">
    <v-dialog v-model="showModal" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onClickCancel">취소</v-btn>
          <v-btn color="green darken-1" text @click="onClickOK">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { eventHub } from '@/utils/EventHub';

export default {
  name: 'ConfirmModal',
  data: () => ({
    title: '',
    text: '',
    cb: undefined,
    showModal: false,
  }),
  async created() {
    eventHub.$on('showConfirm', this.getEvent);
  },
  beforeDestroy() {
    eventHub.$off('showConfirm', this.getEvent);
    // eventHub.$off('after-response');
  },
  methods: {
    getEvent: function(title, text, cb) {
      this.title = title;
      this.text = text;
      this.cb = cb;
      this.showModal = true;
    },
    onClickOK: function() {
      this.cb();
      this.showModal = false;
    },
    onClickCancel: function() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped></style>
