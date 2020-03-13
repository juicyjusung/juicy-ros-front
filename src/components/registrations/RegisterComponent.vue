<template>
  <v-container>
    <v-form>
      <v-card class="elevation-12">
        <v-card-title>
          <v-container class="justify-center">
            <v-img src="@/assets/juicyros.png" />
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="login.username"
              prepend-icon="person"
              :error-messages="usernameErrors"
              label="Username(Email)"
              required
              @input="$v.login.username.$touch()"
              @blur="$v.login.username.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              prepend-icon="lock"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              class="input-group--focused"
              required
              :error-messages="passwordErrors"
              @keyup.native.enter="submit()"
              @click:append="showPassword = !showPassword"
              @input="$v.login.password.$touch()"
              @blur="$v.login.password.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              prepend-icon="lock"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              class="input-group--focused"
              required
              :error-messages="passwordErrors"
              @keyup.native.enter="submit()"
              @click:append="showPassword = !showPassword"
              @input="$v.login.password.$touch()"
              @blur="$v.login.password.$touch()"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container justify-center>
            <v-layout row justify-center>
              <v-btn color="primary" @click="submit">Submit</v-btn>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  data: () => ({
    showPassword: false,
    loginError: false,
    loading: false,
    login: {
      username: '',
      password: '',
    },
  }),
  validations: {
    login: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.login.username.$dirty) return errors;
      !this.$v.login.username.required && errors.push('');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.login.password.$dirty) return errors;
      !this.$v.login.password.required && errors.push('La password è obbligatoria.');
      return errors;
    },
  },
  methods: {
    submit() {
      console.log('SUBMIT');
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // this.auth();
        this.$emit('login', {
          email: this.login.username,
          password: this.login.password,
        });
      }
    },
    register() {
      this.$emit('register');
    },
  },
};
</script>

<style lang="scss">
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
