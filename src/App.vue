<template>
  <v-app>
    <v-app-bar app dense flat>
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto" class="d-flex">
          <span>
            <v-text-field
              type="number"
              class="pt-1"
              style="width:120px"
              prefix=" "
              v-model="count"
              hide-details
            />
          </span>
          <v-btn
            :disabled="count < 1 || count > 10000"
            class="pointer"
            color="primary darken-2"
            @click="initial"
            icon
          >
            <v-icon>mdi-file-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary darken-2" @click="exportPeople" icon>
            <v-icon>mdi-floppy</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer
      v-if="error"
      class="warning lighten-5 warning--text text--darken-4"
      min-height="2rem"
    >
      <v-row no-gutters>
        <v-col>
          <p id="res" class="text-center ma-0">{{ error }}</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    count: {
      get() {
        return this.$store.getters.count as number;
      },
      set(val: string) {
        let v = parseInt(val);
        this.$store.dispatch('count', v);
      },
    },
    processing(): boolean {
      return this.$store.getters.processing;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    exportPeople() {
      this.$store.dispatch('exportPeople');
    },
    initial() {
      this.$store.dispatch('initial');
    },
  },
});
</script>
