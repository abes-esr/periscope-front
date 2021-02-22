import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import RequeteDeRecherche from '@/store/classes/RequeteDeRecherche.ts';
import ResultatDeRecherche from '@/store/classes/ResultatDeRecherche.ts';

Vue.use(Vuex);
Vue.config.silent = true; //Disable vue warn (this2), put false to see warnings

const store = new Vuex.Store({
   modules: {
      requeteRecherche: RequeteDeRecherche,
      resultatRecherche: ResultatDeRecherche,
   },
   plugins: [createPersistedState()],
});
export default store;
