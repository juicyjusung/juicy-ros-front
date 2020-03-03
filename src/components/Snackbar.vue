<template>
  <v-snackbar-queue :timeout="3000" :items="items" @remove="removeItem"></v-snackbar-queue>
</template>

<script>
import { mapState } from 'vuex';
import * as COMMON from '../store/CommonTypes';
export default {
  name: 'Snackbar',
  data: () => ({}),
  computed: mapState({
    items: state => state.snackItems,
  }),
  methods: {
    removeItem(id) {
      this.$store.commit(COMMON.REMOVE_SNACK_ITEM, { id });
    },
  },
};
</script>

<style scoped></style>
