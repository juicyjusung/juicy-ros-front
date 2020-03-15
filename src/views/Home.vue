<template>
  <v-app>
    <!--    <v-app-bar color="#448aff" dark app hide-on-scroll clipped-left>-->
    <v-app-bar color="#448aff" app clipped-left dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn text rounded tile x-large to="/">juicyros</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn primary @click="onClickLogout">Log out</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped color="#91b3e0">
      <LeftDrawer></LeftDrawer>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <!--        <perfect-scrollbar>-->
        <router-view></router-view>
        <!--        </perfect-scrollbar>-->
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import LeftDrawer from '@/components/layout/LeftDrawer';
export default {
  name: 'Home',
  components: { LeftDrawer },
  data: () => ({
    drawer: true,
  }),
  computed: {},

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
