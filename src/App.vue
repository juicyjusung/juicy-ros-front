<template>
  <v-app>
    <Header></Header>
    <v-content>
      <Main />
    </v-content>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Main from './views/Main';
import Snackbar from './components/Snackbar';
import Header from './components/Header';
import { mapState, mapActions } from 'vuex';
import * as ROS from './store/RosTypes';
export default {
  name: 'App',

  components: {
    Header,
    Main,
    Snackbar,
  },

  data: () => ({
    rosURL: '',
  }),
  computed: {
    ...mapState(['rosip']),
  },
  async created() {
    const ros = this.$ros();
    const rosip = await this.GET_ROS_IP();
    this.$rosconnect(rosip);
  },
  methods: {
    ...mapActions([ROS.GET_ROS_IP]),
  },
};
</script>
