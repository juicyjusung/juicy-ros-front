<template>
  <v-form ref="form">
    <v-card class="elevation-12 ma-auto" width="400px" min-width="300px">
      <v-card-title>
        <v-container class="align-center">
          <v-img src="@/assets/juicyros.png" />
          <span class="title ma-auto">
            Sign up
          </span>
        </v-container>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            v-model="signup.email"
            :rules="rules.emailRules"
            prepend-icon="mail"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="signup.username"
            :rules="rules.nameRules"
            prepend-icon="person"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="signup.password"
            prepend-icon="lock"
            :rules="rules.min"
            type="password"
            name="password"
            label="Password"
            class="input-group--focused"
            required
          ></v-text-field>
          <v-text-field
            v-model="signup.confirmPassword"
            prepend-icon="lock"
            :rules="[passwordConfirmationRule, ...rules.confirmPassRules]"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            class="input-group--focused"
            required
            @keyup.native.enter="submit()"
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container justify-center>
          <v-layout row justify-center>
            <v-btn class="mx-2" color="primary" @click="submit">Submit</v-btn>
            <v-btn class="mx-2" color="secondary" @click="navigateToLogin()">Cancel</v-btn>
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
    loginError: false,
    loading: false,
    signup: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    rules: {
      min: [v => v.length >= 8 || 'Password must be at least 8 characters long'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      nameRules: [v => !!v || 'username is required'],
      passwordRules: [
        v => !!v || 'Please enter your password',
        v => v.length >= 8 || 'Password must be at least 8 characters long',
      ],
      confirmPassRules: [
        v => !!v || 'Please enter your password',
        v => v.length >= 8 || 'Password must be at least 8 characters long',
      ],
    },
  }),
  computed: {
    passwordConfirmationRule() {
      return () => this.signup.password === this.signup.confirmPassword || 'Password must match';
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    submit() {
      if (this.validate()) {
        this.$emit('signup', {
          email: this.signup.email,
          name: this.signup.username,
          password: this.signup.password,
        });
      }
    },
    navigateToLogin() {
      this.$emit('navigateToLogin');
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
