<template>
  <div>
    <v-data-table :headers="headers" :search="search" :items="pubdata" class="elevation-1" calculate-widths>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Publisher</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog :key="dialogkey" v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        ref="pubname"
                        v-model="editedItem.pubname"
                        :rules="[rules.required]"
                        label="Pub Name"
                        filled
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        ref="topicName"
                        v-model="editedItem.topicName"
                        :rules="[rules.required]"
                        label="토픽명"
                        filled
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-autocomplete
                        v-model="editedItem.topicName"
                        :item="editedItem.topicName"
                        :items="topicList"
                        label="Topic Name List"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        ref="msgType"
                        v-model="editedItem.msgType"
                        :rules="[rules.required]"
                        label="메세지타입"
                        filled
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-autocomplete
                        v-model="editedItem.msgType"
                        label="Msg Type List"
                        :items="msgtypeList"
                        :item="editedItem.msgType"
                      ></v-autocomplete>
                    </v-col>
                    <v-col col2="12">
                      <v-textarea
                        ref="msg"
                        v-model="editedItem.msg"
                        :rules="[rules.required]"
                        clearable
                        clear-icon="cancel"
                        label="Value"
                        filled
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">play_arrow</v-icon>
        <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import * as ROS from '../store/RosTypes';
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    name: 'PublishArea',
    dialog: false,
    dialogkey: 0,
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    search: '',
    headers: [
      {
        text: 'Pub Name',
        align: 'start',
        value: 'pubname',
      },
      { text: 'Topic Name', align: 'start', value: 'topicName' },
      { text: 'Msg Type', align: 'start', value: 'msgType' },
      { text: 'Msg', align: 'start', value: 'msg' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      pubname: '',
      topicName: '',
      msgType: '',
      msg: '',
    },
    defaultItem: {
      pubname: '',
      topicName: '',
      msgType: '',
      msg: '',
    },
    rules: {
      required: value => !!value || 'Required.',
    },
    formHasErrors: false,
  }),

  computed: {
    ...mapState(['pubdata']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    topicList() {
      const topicNameArr = this.pubdata.map(pub => pub.topicName);
      return topicNameArr.filter((topicName, index) => topicNameArr.indexOf(topicName) === index).sort();
    },
    msgtypeList() {
      const msgTypeArr = this.pubdata.map(pub => pub.msgType);
      return msgTypeArr.filter((msgtype, index) => msgTypeArr.indexOf(msgtype) === index).sort();
    },
  },
  //	return array.indexOf( item ) === idx ;

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([ROS.GET_TOPIC_LIST, ROS.SET_PUB_LIST, ROS.SET_TOPIC_LIST, ROS.ADD_TOPIC]),
    initialize() {
      this.GET_TOPIC_LIST();
    },
    editItem(item) {
      this.editedIndex = this.pubdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.pubdata.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        this.pubdata.splice(index, 1) &&
        this.SET_PUB_LIST(this.pubdata);
    },
    close() {
      console.log('on Close dialog');
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.forceRerender();
      }, 300);
    },
    save() {
      try {
        this.formHasErrors = false;
        Object.keys(this.editedItem).forEach(f => {
          if (!this.editedItem[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });
        if (this.formHasErrors) return;

        if (this.editedIndex > -1) {
          Object.assign(this.pubdata[this.editedIndex], this.editedItem);
          this.SET_PUB_LIST(this.pubdata);
        } else {
          this.pubdata.push(this.editedItem);
          this.SET_PUB_LIST(this.pubdata);
        }
        this.dialog = false;
        this.setSnackbar('등록되었습니다', 'success');
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
          this.forceRerender();
        }, 300);
      } catch (e) {
        console.error(e);
      }
    },
    forceRerender() {
      this.dialogkey += 1;
    },
    setSnackbar(text = '', color = 'info') {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackbarColor = color;
    },
  },
};
</script>

<style></style>
