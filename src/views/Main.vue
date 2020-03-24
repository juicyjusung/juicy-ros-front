<template>
  <v-container fluid class="align-center">
    <div class="headline ma-auto my-4">ws 접속이 안된다면?</div>
    <v-hover v-slot:default="{ hover }">
      <v-card class="ma-auto my-3" max-width="800" :elevation="hover ? 8 : 2">
        <v-img src="@/assets/img/1.png" class="blue--text align-end"> </v-img>
        <v-card-text class="text--primary">
          <div class="subtitle-1">크롬에서는 https에서 SSL 인증이 없는 ws로의 접속이 기본적으로 막혀있습니다.</div>
          <div class="subtitle-1">따라서 사이트 설정에서 설정을 바꿔 주어야 합니다.</div>
        </v-card-text>
      </v-card>
    </v-hover>
    <v-hover v-slot:default="{ hover }">
      <v-card class="ma-auto  my-3" max-width="800" :elevation="hover ? 8 : 2">
        <v-img src="@/assets/img/2.png" class="blue--text align-end"> </v-img>
        <v-card-text class="text--primary">
          <div class="subtitle-1">우선 사이트 설정으로 들어갑니다.</div>
        </v-card-text>
      </v-card>
    </v-hover>
    <v-hover v-slot:default="{ hover }">
      <v-card class="ma-auto  my-3" max-width="800" :elevation="hover ? 8 : 2">
        <v-img src="@/assets/img/3.png" class="blue--text align-end"> </v-img>
        <v-card-text class="text--primary">
          <div class="subtitle-1">안전하지 않은 콘텐츠를 허용으로 설정해 줍니다.</div>
        </v-card-text>
      </v-card>
    </v-hover>
    <v-hover v-slot:default="{ hover }">
      <v-card class="ma-auto  my-3" max-width="800" :elevation="hover ? 8 : 2">
        <v-img src="@/assets/img/4.png" class="blue--text align-end"> </v-img>
        <v-card-text class="text--primary">
          <div class="subtitle-1">정상적으로 ros brdige에 접속이 되는지 확인 합니다.</div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped></style>
