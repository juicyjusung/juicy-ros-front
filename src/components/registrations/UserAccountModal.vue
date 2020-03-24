<template>
  <v-row class="ma-auto">
    <v-col>
      <v-container v-if="activePanel === 'registration'">
        <transition name="register-transition" enter-active-class="animated slideInRight">
          <register-component @signup="register" @navigateToLogin="navigateToLogin"></register-component>
        </transition>
      </v-container>
      <div v-if="activePanel === 'login'">
        <transition name="login-transition" enter-active-class="animated slideInRight">
          <login-component
            @login="login"
            @navigateToRegister="navigateToRegister"
            @close="closeModal()"
          ></login-component>
        </transition>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import LoginComponent from '@/components/registrations/LoginComponent.vue';
import RegisterComponent from '@/components/registrations/RegisterComponent.vue';

export default {
  name: 'UserAccountModal',
  components: {
    LoginComponent,
    RegisterComponent,
  },
  data() {
    return {
      showLogin: true,
      activePanel: 'login',
      showFailure: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('loginSuccess');
    },
    async login(userInfo) {
      try {
        await this.$store.dispatch('authStore/login', userInfo);

        this.$emit('loginSuccess');

        this.$notify({
          group: 'all',
          type: 'success',
          text: 'Successfully logged in',
        });
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'User credentials are not correct. Please try again',
        });
      }
    },

    async register(userInfo) {
      try {
        await this.$store.dispatch('authStore/registerUser', userInfo);
        this.navigateToLogin();
        this.$emit('loginSuccess');
        this.$notify({
          group: 'all',
          type: 'success',
          text: 'User successfully created.',
        });
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'User could not be created at the moment. Please check if you already have an account.',
        });
      }
    },

    navigateToRegister() {
      this.activePanel = 'registration';
    },

    navigateToLogin() {
      this.activePanel = 'login';
    },
  },
};
</script>

<style lang="scss" scoped></style>
