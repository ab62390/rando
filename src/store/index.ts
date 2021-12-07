import Vue from 'vue';
import Vuex from 'vuex';
import { allNames } from './names';
import { writeFileSync } from 'fs';
import { remote } from 'electron';
import { Person } from '@/index';
const { random, round } = Math;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: [] as Person[],
    count: 60,
    hasPhone: true,
    hasAge: true,
    keyword: '',
    error: '',
  },
  mutations: {
    count(state, val: number) {
      state.count = val;
    },
    hasPhone(state, val: boolean) {
      state.hasPhone = val;
    },
    hasAge(state, val: boolean) {
      state.hasAge = val;
    },
    keyword(state, val: string) {
      state.keyword = val;
    },
    initial(state, people: Person[]) {
      state.people = people.sort((a, b) => a.key - b.key);
    },
    error(state, error = '') {
      state.error = error;
    },
  },
  actions: {
    count({ commit }, val: number) {
      commit('error');
      commit('count', val);
    },
    hasPhone({ commit }, val: number) {
      commit('error');
      commit('hasPhone', val);
    },
    hasAge({ commit }, val: number) {
      commit('error');
      commit('hasAge', val);
    },
    keyword({ commit }, val: string) {
      commit('error');
      commit('keyword', val);
    },
    exportPeople({ commit, state }) {
      commit('error');
      const filename = remote.dialog.showSaveDialogSync(
        remote.getCurrentWindow(),
        {
          filters: [{ extensions: ['json'], name: 'people' }],
          defaultPath: 'people.json',
        }
      );
      try {
        let people: Person[] = JSON.parse(JSON.stringify(state.people));
        if (!state.hasPhone) {
          people = people.map((person) => {
            person.value.phone = undefined;
            return person;
          });
        }
        if (!state.hasAge) {
          people = people.map((person) => {
            person.value.age = undefined;
            return person;
          });
        }
        if (filename) {
          writeFileSync(filename, JSON.stringify(people), 'utf8');
        }
      } catch (error) {
        commit('error', error.message);
      }
    },
    initial({ commit, state }) {
      commit('error');
      try {
        const people = getPeople(state.count);
        state.hasPhone = true;
        state.hasAge = true;
        state.keyword = '';
        commit('initial', people);
      } catch (error) {
        commit('error', error.message);
      }
    },
  },
  getters: {
    people: (state) => state.people,
    count: (state) => state.count,
    hasPhone: (state) => state.hasPhone,
    hasAge: (state) => state.hasAge,
    keyword: (state) => state.keyword,
    error: (state) => state.error,
  },
  modules: {},
});

function getPeople(count: number) {
  if (!count || count < 1) count = 1;
  if (count > 10000) count = 10000;
  const people = [];
  const names = getRandomNames(count);
  const phones = getRandomPhones(count);
  const ages = getRandomAges(count);
  for (let i = 0; i < count; i++) {
    people.push({
      key: i + 1,
      value: {
        name: names[i].name,
        gender: names[i].gender,
        phone: phones ? phones[i] : undefined,
        age: ages ? ages[i] : undefined,
      },
    });
  }
  return people;
}

function getRandomNames(count: number) {
  const mNames = allNames.filter((PName) => PName.g == 'm');
  const names = [];
  for (let i = 0; i < count; i++) {
    const d = getRandomDigit(0, allNames.length - 1);
    const firstName = allNames[d].n;
    const gender = allNames[d].g == 'm' ? 'male' : 'female';
    const lastIndex = mNames.length - 1;
    const name =
      firstName +
      ' ' +
      mNames[getRandomDigit(0, lastIndex)].n +
      ' ' +
      mNames[getRandomDigit(0, lastIndex)].n +
      ' ' +
      mNames[getRandomDigit(0, lastIndex)].n;
    names.push({
      name,
      gender,
    });
  }
  return names;
}

function getRandomPhones(count: number) {
  const prePone = ['096', '099', '091', '092', '099', '098', '011', '012'];
  const phones = [];
  for (let i = 0; i < count; i++) {
    phones.push(
      prePone[getRandomDigit(0, 7)] +
        random()
          .toString()
          .substr(2, 7)
    );
  }
  return phones;
}

function getRandomAges(count: number) {
  const ages = [];
  for (let i = 0; i < count; i++) {
    ages.push(getRandomDigit(9, 109));
  }
  return ages;
}

function getRandomDigit(min: number, max: number) {
  return round(random() * (max - min)) + min;
}
