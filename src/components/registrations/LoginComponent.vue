<template>
  <v-form ref="form">
    <v-card class="elevation-12 ma-auto" width="400px" min-width="300px">
      <v-card-title>
        <v-container class="justify-center">
          <v-img src="@/assets/juicyros.png" />
        </v-container>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            v-model="login.email"
            prepend-icon="person"
            :rules="rules.emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="login.password"
            prepend-icon="lock"
            :rules="rules.min"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            class="input-group--focused"
            required
            @keyup.native.enter="submit()"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container justify-center>
          <v-layout row justify-center>
            <v-btn color="primary" @click="submit">Login</v-btn>
            <v-btn @click="navigateToRegister">Signup</v-btn>
          </v-layout>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    login: {
      email: '',
      password: '',
    },
    rules: {
      min: [v => v.length >= 8 || 'Min 8 characters'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
    },
  }),
  computed: {},
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    submit() {
      if (this.validate()) {
        this.$emit('login', {
          email: this.login.email,
          password: this.login.password,
        });
      }
    },
    navigateToRegister() {
      this.$emit('navigateToRegister');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 50px !important;
}
.margin-rx-10 {
  margin-right: 10px !important;
}
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-word {
    position: absolute;
    top: 60%;
    font-weight: 700;
  }
}
</style>
