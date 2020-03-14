<template>
  <div class="login">
    <v-container class="fill-height">
      <user-account-modal @loginSuccess="loggedIn()"></user-account-modal>
    </v-container>
  </div>
</template>

<script>
import UserAccountModal from '@/components/registrations/UserAccountModal.vue';

export default {
  name: 'Login',
  components: {
    UserAccountModal,
  },

  data() {
    return {
      registrationClass: ['registration-mode'],
      userLoggedIn: false,
    };
  },

  methods: {
    loggedIn() {
      // Do something when logged in.
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/global.scss';

.login {
  margin: auto;
  height: 100%;
  width: 100%;
  background-color: #448aff;
}
</style>
