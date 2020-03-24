<template>
  <v-container fluid>
    <v-row class="mx-1">
      <v-hover v-slot:default="{ hover }">
        <v-card width="100%" class="ma-2" :elevation="hover ? 4 : 2">
          <v-card-title>
            Publishing
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
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
                          ref="pub_name"
                          v-model="editedItem.pub_name"
                          :rules="[rules.required]"
                          label="Pub Name"
                          filled
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="7">
                        <v-text-field
                          ref="topic_name"
                          v-model="editedItem.topic_name"
                          :rules="[rules.required]"
                          label="토픽명"
                          filled
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-autocomplete
                          v-model="editedItem.topic_name"
                          :item="editedItem.topic_name"
                          :items="topicNameList"
                          label="Topic Name List"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="7">
                        <v-text-field
                          ref="message_type"
                          v-model="editedItem.message_type"
                          :rules="[rules.required]"
                          label="메세지타입"
                          filled
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-autocomplete
                          v-model="editedItem.message_type"
                          :item="editedItem.message_type"
                          :items="messageTypeList"
                          label="Msg Type List"
                        ></v-autocomplete>
                      </v-col>
                      <v-col col2="12">
                        <v-textarea
                          ref="message"
                          v-model="editedItem.message"
                          :placeholder="messagePlaceholder"
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
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="currentRos.pub_data"
            class="elevation-1"
            calculate-widths
          >
            <template v-slot:headerCell="props">
              <span slot="activator">
                {{ props.header.text }}
              </span>
            </template>
            <template v-slot:items="{ item }">
              <td>{{ item.pub_name }}</td>
              <td>{{ item.topic_name }}</td>
              <td>{{ item.message_type }}</td>
              <td>{{ item.message }}</td>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon class="mr-2" @click="run(item)">play_arrow</v-icon>
              <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon @click="deleteItem(item)">delete</v-icon>
            </template>
            <template v-slot:no-data>
              <p class="headline ma-auto">데이터가 없습니다.</p>
            </template>
          </v-data-table>
        </v-card>
      </v-hover>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ROSLIB from 'roslib';
import { eventHub } from '@/utils/EventHub';

export default {
  props: ['topicList', 'rosObj'],
  data: () => ({
    name: 'PublishArea',
    dialog: false,
    dialogkey: 0,
    search: '',
    headers: [
      {
        text: 'Pub Name',
        align: 'start',
        value: 'pub_name',
      },
      { text: 'Topic Name', align: 'start', value: 'topic_name' },
      { text: 'Msg Type', align: 'start', value: 'message_type' },
      { text: 'Msg', align: 'start', value: 'message' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      pub_name: '',
      topic_name: '',
      message_type: '',
      message: '',
    },
    defaultItem: {
      pub_name: '',
      topic_name: '',
      message_type: '',
      message: '',
    },
    rules: {
      required: value => !!value || 'Required.',
    },
    formHasErrors: false,
    messagePlaceholder: `{
    "data": 3
}`,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    topicNameList() {
      if (this.topicList) return this.topicList.map(topic => topic.topic_name);
      return {};
    },
    messageTypeList() {
      if (this.topicList) return this.topicList.map(topic => topic.message_type);
      return {};
    },
    ...mapGetters({
      currentRos: 'rosStore/getCurrentRos',
    }),
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
    initialize() {},
    editItem(item) {
      this.editedIndex = this.currentRos.pub_data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const title = `${item.pub_name}을 삭제하겠습니까?`;
      const text = '삭제된 내용은 복구할 수 없습니다';
      const executeFunc = () => {
        this.$store.dispatch('rosStore/removePub', {
          pubItem: item,
          ros: this.currentRos,
        });
      };
      eventHub.$emit('showConfirm', title, text, executeFunc);
    },
    close() {
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
        Object.keys(this.defaultItem).forEach(f => {
          console.log(this.editedItem[f]);
          if (!this.editedItem[f]) this.formHasErrors = true;
          this.$refs[f] && this.$refs[f].validate(true);
        });
        if (this.formHasErrors) return;

        // Edit item
        if (this.editedIndex > -1) {
          this.$store.dispatch('rosStore/editPub', {
            pubItem: this.editedItem,
            ros: this.currentRos,
          });
        } else {
          // add item
          this.$store.dispatch('rosStore/addPub', {
            pubItem: this.editedItem,
            ros: this.currentRos,
          });
        }
        this.dialog = false;
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
    run(item) {
      try {
        const topic = new ROSLIB.Topic({
          ros: this.rosObj,
          name: item.topic_name,
          messageType: item.message_type,
        });
        const message = new ROSLIB.Message(JSON.parse(item.message));
        topic.publish(message);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style></style>
