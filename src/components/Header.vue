<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h1>juicy ROS web</h1>
    </div>
    <v-spacer></v-spacer>
    <v-btn class="mr-4" @click="dialog = true">
      <v-icon :color="$store.state.rosstatus === 'connected' ? 'green' : 'red'">lens</v-icon>
      ROS_IP<v-icon>settings</v-icon>
    </v-btn>
    <h2>Logout</h2>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">ROS IP 셋팅</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    dialog: false,
  }),
  methods: {
    save() {},
    close() {},
  },
};
</script>

<style scoped></style>
