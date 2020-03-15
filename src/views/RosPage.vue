<template>
  <Ros v-if="Object.keys(currentRos).length !== 0" :current-ros="currentRos" :key="currentRos._id"></Ros>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Ros from '@/components/Ros';
export default {
  name: 'RosPage',
  components: { Ros },
  data: () => ({
    ros: {},
  }),
  computed: {
    ...mapState('rosStore', {
      currentRos: state => state.currentRos,
    }),
    ...mapGetters({
      rosConnections: 'rosStore/getRosConnections',
    }),
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped></style>
