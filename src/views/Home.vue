<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col>
        <v-form ref="form" @submit.prevent="save">
          <v-row justify="space-between" no-gutters>
            <v-col cols="auto">
              <v-text-field
                v-model="keyword"
                color="grey"
                clearable
                @click:clear="resetKeyword"
                hide-details
                prefix=" "
                dense
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-virtual-scroll
          :items="people"
          width="300"
          height="420"
          item-height="90"
        >
          <template v-slot:default="{ item }">
            <v-list-item three-line>
              <div>
                <div class="subtitle-1">{{ item.value.name }}</div>
                <div class="caption grey--text">
                  {{ item.value.gender == 'male' ? 'ذكر' : 'انثى' }}
                </div>
                <div v-if="hasPhone" class="caption grey--text">
                  {{ item.value.phone }}
                </div>
                <div v-if="hasAge" class="caption grey--text">
                  {{ item.value.age }}
                </div>
              </div>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-col>
      <v-col>
        <v-list>
          <v-list-item>
            <v-checkbox label="اﻹسم" v-model="hasName" disabled />
          </v-list-item>
          <v-list-item>
            <v-checkbox label="النوع" v-model="hasName" disabled />
          </v-list-item>
          <v-list-item>
            <v-checkbox label="رقم الهاتف" v-model="hasPhone" />
          </v-list-item>
          <v-list-item>
            <v-checkbox label="العمر" v-model="hasAge" />
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Person } from '@/index';

export default Vue.extend({
  name: 'Home',

  data: () => ({
    hasName: true,
    hasGender: true,
    // pNameRules: [(v: string) => !!v || 'Wrong Name'],
  }),
  computed: {
    people() {
      const keyword = this.$store.getters.keyword as string;
      const people = this.$store.getters.people as Person[];
      return people.filter((person) => person.value.name.startsWith(keyword));
    },
    hasPhone: {
      get() {
        return this.$store.getters.hasPhone as boolean;
      },
      set(val: boolean) {
        this.$store.dispatch('hasPhone', val);
      },
    },
    hasAge: {
      get() {
        return this.$store.getters.hasAge as boolean;
      },
      set(val: boolean) {
        this.$store.dispatch('hasAge', val);
      },
    },
    keyword: {
      get() {
        return this.$store.getters.keyword as string;
      },
      set(val: string) {
        this.$store.dispatch('keyword', val);
      },
    },
  },
  methods: {
    save() {
      const form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        this.$store
          .dispatch('addPatiant', this.keyword)
          .then(() => form.reset());
      }
    },
    resetKeyword() {
      setTimeout(() => {
        this.$store.dispatch('keyword', '');
      }, 200);
    },
  },
  mounted() {
    this.$store.dispatch('initial');
  },
});
</script>
