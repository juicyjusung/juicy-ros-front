<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-container>
        <PublishArea />
      </v-container>
    </v-col>
    <v-col cols="12" md="6">
      <v-container>
        <h1>Right</h1>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import PublishArea from '../components/PublishArea';
export default {
  name: 'Main',
  components: { PublishArea },
};
</script>

<style scoped></style>
