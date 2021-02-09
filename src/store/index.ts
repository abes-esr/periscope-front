import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/store/classes/user';
import RequeteDeRecherche from '@/store/classes/RequeteDeRecherche';

Vue.use(Vuex);
const store = new Vuex.Store({
   modules: {
      User,
      RequeteDeRecherche,
   },
});
export default store;
