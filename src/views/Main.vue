<template>
  <v-row>
    <v-col cols="12" md="6">
      <PublishArea />
    </v-col>
    <v-col cols="12" md="6">
      <SubscribeArea></SubscribeArea>
    </v-col>
  </v-row>
</template>

<script>
import PublishArea from '@/components/PublishArea';
import SubscribeArea from '../components/SubscribeArea';
export default {
  name: 'Main',
  components: { SubscribeArea, PublishArea },
};
</script>

<style scoped></style>
