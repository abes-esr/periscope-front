import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {CheckboxesProvider, Ensemble} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      blocPcpRegions: new BlocPcpRegions(Ensemble.Ou),
      blocPcpMetiers: new BlocPcpMetiers(Ensemble.Ou),
      //Etat du composant de test
      chainTyped: 0,
   },
   mutations: {
      //PcpRegions
      blocPcpRegionsExternalOperatorMutation(state, operator: number) {
         state.blocPcpRegions.internalBlocOperator = operator;
      },
      blocPcpRegionsInternalOperatorMutation(state, operator: number) {
         state.blocPcpRegions.externalBlocOperator = operator;
      },
      blocPcpRegionsArrayRegionsMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpRegions.arrayRegions = arraySent;
      },
      blocPcpRegionsArrayRegionsStringListMutation(state, arraySent: Array<CheckboxesProvider>) {
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpRegions._pcpStringArray.push(element.key) : ''));
      },

      //PcpMetiers
      blocPcpMetiersExternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers.internalBlocOperator = operator;
      },
      blocPcpMetiersInternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers.externalBlocOperator = operator;
      },
      blocPcpMetiersArrayRegionsMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpMetiers.arrayMetiers = arraySent;
      },
      blocPcpMetiersArrayMetiersStringListMutation(state, arraySent: Array<CheckboxesProvider>) {
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpMetiers._pcpStringArray.push(element.key) : ''));
      },

      //Bloc de Test
      addValueMutation(state, value: number) {
         state.chainTyped += value;
      },
   },
   actions: {
      //PcpRegions
      blocPcpRegionsExternalOperatorAction(context, operator: number) {
         context.commit('blocPcpRegionsExternalOperatorMutation', operator);
      },
      blocPcpRegionsInternalOperatorAction(context, operator: number) {
         context.commit('blocPcpRegionsInternalOperatorMutation', operator);
      },
      blocPcpRegionsArrayRegionsAction(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpRegionsArrayRegionsMutation', arraySent);
      },
      blocPcpRegionsArrayRegionsStringListAction(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpRegionsArrayRegionsStringListMutation', arraySent);
      },

      //PcpMetiers
      blocPcpMetiersExternalOperatorAction(context, operator: number) {
         context.commit('blocPcpMetiersExternalOperatorMutation', operator);
      },
      blocPcpMetiersInternalOperatorAction(context, operator: number) {
         context.commit('blocPcpMetiersInternalOperatorMutation', operator);
      },
      blocPcpMetiersArrayMetiersAction(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpMetiersArrayRegionsMutation', arraySent);
      },
      blocPcpMetiersArrayMetiersStringListAction(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpMetiersArrayMetiersStringListMutation', arraySent);
      },

      displayStore() {
         console.log(JSON.parse(JSON.stringify(this.state)));
      },

      //Bloc de Test
      addValueAction(context, value: number) {
         context.commit('addValueMutation', value);
      },
   },
   plugins: [createPersistedState()],
});
