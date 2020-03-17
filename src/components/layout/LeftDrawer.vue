<template>
  <div>
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar color="red">
          <span class="white--text headline">{{ username.substr(0, 1) }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="subtitle-1">{{ username }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle-2">{{ useremail }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <AddRos></AddRos>
    <v-list nav>
      <v-divider></v-divider>
      <v-list-item-group v-model="selected">
        <v-list-item v-for="(item, i) in rosConnections" :key="i" link @click="setCurrentRos(item)">
          <v-list-item-icon>
            <v-icon>fa-robot</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{ item.connection_name }}</v-list-item-title>
            <v-list-item><v-btn>hello</v-btn></v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddRos from '@/components/modal/AddRos';
export default {
  name: 'LeftDrawer',
  components: { AddRos },
  data: () => ({
    selected: undefined,
  }),
  computed: {
    ...mapGetters({
      rosConnections: 'rosStore/getRosConnections',
      username: 'authStore/getName',
      useremail: 'authStore/getEmail',
    }),
  },
  methods: {
    setCurrentRos: function(ros) {
      this.$router.push({ path: '/ros' }).catch(() => {});
      this.$store.commit('rosStore/setCurrentRos', ros);
    },
  },
};
</script>

<style scoped></style>
