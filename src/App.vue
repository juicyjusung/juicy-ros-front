<template>
  <v-app>
    <notifications group="all" width="100%" position="bottom center" />
    <div v-if="isLoading">
      <fingerprint-spinner class="spinner" :animation-duration="1500" :size="150" color="#136a8a" />
    </div>
    <ConfirmModal></ConfirmModal>
    <router-view />
  </v-app>
</template>

<script>
import { FingerprintSpinner } from 'epic-spinners';
import { mapState, mapActions, mapGetters } from 'vuex';
import { eventHub } from '@/utils/EventHub';
import * as USER from './store/UserTypes';
import ConfirmModal from '@/components/modal/ConfirmModal';
export default {
  name: 'App',

  components: {
    ConfirmModal,
    FingerprintSpinner,
  },

  data: () => ({
    rosURL: '',
    refCount: 0,
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      isSessionActive: 'authStore/isSessionActive',
    }),
  },
  async created() {
    eventHub.$on('before-request', this.setLoading);
    eventHub.$on('request-error', this.unsetLoading);
    eventHub.$on('after-response', this.unsetLoading);
    eventHub.$on('response-error', this.unsetLoading);

    eventHub.$on('before-websocket-connect', this.setLoading);
    eventHub.$on('websocket-connected', this.unsetLoading);
    eventHub.$on('websocket-errored', this.unsetLoading);

    await this.$store.dispatch('authStore/initiateAppSession');
    await this.$store.dispatch('rosStore/getRos');
  },
  beforeDestroy() {
    eventHub.$off('before-request', this.setLoading);
    eventHub.$off('request-error', this.unsetLoading);
    eventHub.$off('after-response', this.unsetLoading);
    eventHub.$off('response-error', this.unsetLoading);

    eventHub.$off('before-websocket-connect', this.setLoading);
    eventHub.$off('websocket-connected', this.unsetLoading);
    eventHub.$off('websocket-errored', this.unsetLoading);
  },
  methods: {
    ...mapActions([USER.LOGIN]),
    setLoading() {
      this.refCount += 1;
      this.isLoading = true;
    },

    unsetLoading() {
      if (this.refCount > 0) {
        this.refCount -= 1;
        this.isLoading = this.refCount > 0;
      }
    },
  },
};
</script>
<style lang="scss">
.notifications {
  .notification-wrapper {
    width: 100vw;
  }

  span {
    display: block;
  }
}

.spinner {
  position: fixed !important;
  top: 0px !important;
  height: 100vh !important;
  width: 100% !important;
  z-index: 10000 !important;
  background: rgba(255, 255, 255, 0.8) !important;
}
</style>
