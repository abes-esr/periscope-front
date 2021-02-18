import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import User from '@/store/classes/user';
import RequeteDeRecherche from '@/store/classes/RequeteDeRecherche';
import ResultatDeRecherche from "@/store/classes/ResultatDeRecherche";

Vue.use(Vuex);
const store = new Vuex.Store({
   modules: {
      User,
      RequeteDeRecherche,
      ResultatDeRecherche
   },
   plugins: [createPersistedState()]
});
export default store;
