<template>
  <v-data-table :headers="headers" :search="search" :items="pubdata" class="elevation-1" calculate-widths>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Publisher {{ editedItem.topicName }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pubname" label="Pub Name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.topicName"
                      :items="topiclist"
                      label="Topic Name"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.msgType"
                      :items="msgtypelist"
                      label="Message Type"
                    ></v-autocomplete>
                  </v-col>
                  <v-col></v-col>
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
</template>

<script>
export default {
  data: () => ({
    name: 'PublishArea',
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Pub Name',
        align: 'start',
        class: 'col-2 text-truncate',
        sortable: false,
        value: 'pubname',
      },
      { text: 'Topic Name', value: 'topicName', class: 'col-2 text-truncate' },
      { text: 'Msg Type', value: 'msgType' },
      { text: 'Msg', value: 'msg' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    desserts: [],
    topiclist: ['/clobot/chatbot/link_append', '/clobot/chatbot/link_append2', '/clobot/chatbot/link_append3'],
    msgtypelist: ['std_msgs/String', 'std_msgs/Bool'],
    pubdata: [
      {
        pubname:
          '퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름퍼블리셔이름',
        topicName: '/clobot/chatbot/link_append',
        msgType: 'std_msgs/String',
        msg: '{a: 1}',
      },
      {
        pubname: '퍼블리셔이름',
        topicName: '/clobot/chatbot/link_append',
        msgType: 'std_msgs/String',
        msg: '{a: 1}',
      },
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {},
    editItem(item) {
      this.editedIndex = this.pubdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.pubdata.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.pubdata.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedItem.topicName = '';
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pubdata[this.editedIndex], this.editedItem);
      } else {
        this.pubdata.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
td {
  height: 20px !important;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
