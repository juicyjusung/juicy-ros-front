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
import TopicList from '../components/TopicList';
export default {
  name: 'Main',
  components: { TopicList, PublishArea },
};
</script>

<style scoped></style>
