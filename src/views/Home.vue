<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" color="#448aff" dark app>
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>juicyjusung@clobot.co.kr</v-list-item-title>
            <v-list-item-subtitle>juicyjusung</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <div class="pa-2">
          <v-btn primary block>+ New Ros Connection</v-btn>
        </div>
        <v-divider></v-divider>
        <v-list-item v-for="item in rosConnectionList" :key="item.url" link>
          <v-list-item-icon>
            <v-icon>fa-robot</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold subtitle-1">{{ item.rosConnectionName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#448aff" dark app hide-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer />
      <v-btn primary @click="onClickLogout">Log out</v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data: () => ({
    drawer: true,
    rosConnectionList: [
      {
        rosConnectionName: '뚜봇',
        url: 'ws://clobot-ros.koreacentral.cloudapp.azure.com:9090',
      },
      {
        rosConnectionName: '뚜봇2',
        url: 'ws://clobot-ros.koreacentral.cloudapp.azure.com:9091',
      },
    ],
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
  }),

  methods: {
    async onClickLogout() {
      try {
        await this.$store.dispatch('authStore/logout');
        this.$notify({
          group: 'all',
          type: 'success',
          text: 'You have been successfully logged out.',
        });
        await this.$router.push('/login');
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'Sorry but we could not log you out at the moment.',
        });
      }

      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
