<template>
  <div>
    <div class="pa-2">
      <v-btn primary block @click="dialog = true">+ New Ros Connection</v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="display-1 align-center ma-auto">Ros Connection 추가</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  ref="connectionName"
                  v-model="connectionName"
                  label="Connection Name"
                  filled
                  required
                  placeholder="ex) 뚜봇"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="url"
                  v-model="url"
                  label="URL"
                  filled
                  required
                  placeholder="ex) ws://clobot-ros.koreacentral.cloudapp.azure.com:9090"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddRos',
  data: () => ({
    dialog: false,
    connectionName: '',
    url: '',
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    save: async function() {
      console.log('save');
      try {
        const payload = {
          connectionName: this.connectionName,
          url: this.url,
        };
        await this.$store.dispatch('rosStore/addRos', payload);
        this.close();
        this.$notify({
          group: 'all',
          type: 'success',
          text: 'Ros connection 등록이 완료되었습니다.',
        });
      } catch (e) {
        console.error(e);
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'Ros connection 추가가 실패하였습니다.',
        });
      }
    },
    close: function() {
      this.connectionName = '';
      this.url = '';
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  font-family: 'Jua', sans-serif !important;
}
</style>
