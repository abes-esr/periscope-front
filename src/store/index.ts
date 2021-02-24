import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {CheckboxesProvider, Ensemble} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';
import {BlocRcr, RcrProvider} from '@/store/classes/blocsDeRecherche/BlocRcr';
import { BlocPpn } from "@/store/classes/blocsDeRecherche/BlocPpn";

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      blocPcpRegions: new BlocPcpRegions(Ensemble.Ou),
      blocPcpMetiers: new BlocPcpMetiers(Ensemble.Ou),
      blocRcr: new BlocRcr(Ensemble.Ou),
      blocPpn: new BlocPpn(Ensemble.Ou),
      //Etat du composant de test
      chainTyped: 0,
   },
   mutations: {
      //Bloc de recherche PcpRegions
      blocPcpRegionsExternalOperatorMutation(state, operator: number) {
         state.blocPcpRegions._externalBlocOperator = operator;
      },
      blocPcpRegionsInternalOperatorMutation(state, operator: number) {
         state.blocPcpRegions._internalBlocOperator = operator;
      },
      blocPcpRegionsArrayRegionsMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpRegions._arrayRegions = arraySent;
      },
      blocPcpRegionsArrayRegionsStringListMutation(state, arraySent: Array<CheckboxesProvider>) {
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpRegions._pcpStringArray.push(element.key) : ''));
      },

      //Bloc de recherche PcpMetiers
      blocPcpMetiersExternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers._externalBlocOperator = operator;
      },
      blocPcpMetiersInternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers._internalBlocOperator = operator;
      },
      blocPcpMetiersArrayRegionsMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpMetiers._arrayMetiers = arraySent;
      },
      blocPcpMetiersArrayMetiersStringListMutation(state, arraySent: Array<CheckboxesProvider>) {
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpMetiers._pcpStringArray.push(element.key) : ''));
      },

      //Bloc de recherche Rcr
      blocRcrExternalOperatorMutation(state, operator: number) {
         state.blocRcr._externalBlocOperator = operator;
      },
      blocRcrInternalOperatorMutation(state, operator: number) {
         state.blocRcr._internalBlocOperator = operator;
      },
      blocRcrRcrHandlerMutation(state, arraySent: Array<RcrProvider>) {
         state.blocRcr._rcrHandler = arraySent;
      },
      blocRcrRcrListStringMutation(state, arraySent: Array<string>) {
         state.blocRcr._rcrListString = arraySent;
      },

      //Bloc de recherche Ppn
      blocPpnExternalOperatorMutation(state, operator: number) {
         state.blocPpn._externalBlocOperator = operator;
      },
      blocPpnInternalOperatorMutation(state, operator: number) {
         state.blocPpn._internalBlocOperator = operator;
      },
      //TODO continuer la migration du module requete de recherche

      //Bloc de Test
      addValueMutation(state, value: number) {
         state.chainTyped += value;
      },
   },
   actions: {
      //Bloc de recherche PcpRegions
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

      //Bloc de recherche PcpMetiers
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

      //Bloc de recherche Rcr
      blocRcrExternalOperatorAction(context, operator: number) {
         context.commit('blocRcrExternalOperatorMutation', operator);
      },
      blocRcrInternalOperatorAction(context, operator: number) {
         context.commit('blocRcrInternalOperatorMutation', operator);
      },
      blocRcrRcrHandlerAction(context, arraySent: Array<RcrProvider>) {
         context.commit('blocRcrRcrHandlerMutation', arraySent);
      },
      blocRcrRcrListStringAction(context, arraySent: Array<string>) {
         context.commit('blocRcrRcrListStringMutation', arraySent);
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
