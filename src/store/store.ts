import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';
import {BlocRcr, RcrProvider} from '@/store/classes/blocsDeRecherche/BlocRcr';
import {BlocPpn} from '@/store/classes/blocsDeRecherche/BlocPpn';
import {BlocIssn} from '@/store/classes/blocsDeRecherche/BlocIssn';
import {BlocMotDuTitre} from '@/store/classes/blocsDeRecherche/BlocMotDuTitre';
import {BlocEditeur} from '@/store/classes/blocsDeRecherche/BlocEditeur';
import {BlocLangue} from '@/store/classes/blocsDeRecherche/BlocLangue';
import {BlocPays} from '@/store/classes/blocsDeRecherche/BlocPays';
import {CheckboxesProvider, Ensemble, ListProvider} from '@/store/interfaces/BlocInterfaces';
import {JsonTraitements} from '@/store/classes/traitements/JsonTraitements';
import {AxiosTraitements} from '@/store/classes/appelsBackEnd/AxiosTraitements';
import {LotNotices} from '@/store/classes/resultatsDeRecherche/LotNotices';
import Notice from '@/store/classes/resultatsDeRecherche/Notice';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      //Requete de recherche
      blocPcpRegions: new BlocPcpRegions(Ensemble.Ou),
      blocPcpMetiers: new BlocPcpMetiers(Ensemble.Ou),
      blocRcr: new BlocRcr(Ensemble.Ou),
      blocPpn: new BlocPpn(Ensemble.Ou),
      blocIssn: new BlocIssn(Ensemble.Ou),
      blocMotsDuTitre: new BlocMotDuTitre(Ensemble.Ou),
      blocEditeur: new BlocEditeur(Ensemble.Ou),
      blocLangue: new BlocLangue(Ensemble.Ou),
      blocPays: new BlocPays(Ensemble.Ou),
      //Resultats de recherche
      lotNotices: new LotNotices(),
      //Objets JSON à envoyer au back-end
      jsonTraitements: new JsonTraitements(),
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
         state.blocPcpRegions._pcpStringArray = [];
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
         state.blocPcpMetiers._pcpStringArray = [];
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
      blocPpnPpnEnteredMutation(state, string) {
         state.blocPpn._ppnListString.push(string);
      },
      blocPpnListStringMutation(state, arraySent: Array<string>) {
         state.blocPpn._ppnListString = arraySent;
      },

      //Bloc de recherche Issn
      blocIssnExternalOperatorMutation(state, operator: number) {
         state.blocIssn._externalBlocOperator = operator;
      },
      blocIssnInternalOperatorMutation(state, operator: number) {
         state.blocIssn._internalBlocOperator = operator;
      },
      blocIssnIssnEnteredMutation(state, string) {
         state.blocIssn._issnListString.push(string);
      },

      //Bloc de recherche Mots du titre
      blocMotsDuTitreTitleWordsEnteredMutation(state, stringEntered: string) {
         state.blocMotsDuTitre._titleWordsEntered = [];
         stringEntered.split(' ').forEach((element: string) => {
            state.blocMotsDuTitre._titleWordsEntered.push(String(element));
         });
      },

      //Bloc de recherche Editeur
      blocEditeurExternalOperatorMutation(state, externalOperator: number) {
         state.blocEditeur._externalBlocOperator = externalOperator;
      },
      blocEditeurEditorEnteredMutation(state, stringEntered: string) {
         state.blocEditeur._editorsEntered = [];
         stringEntered.split(' ').forEach((element: string) => {
            state.blocEditeur._editorsEntered.push(String(element));
         });
      },

      //Bloc de recherche Langue
      blocLangueExternalOperatorMutation(state, externalOperator: number) {
         state.blocLangue._externalBlocOperator = externalOperator;
      },
      blocLangueLanguesEnteredMutation(state, arraySent: Array<ListProvider>) {
         state.blocLangue._languesEntered = [];
         arraySent.forEach((element) => {
            state.blocLangue._languesEntered.push(element.id);
         });
      },

      //Bloc de recherche Pays
      blocPaysExternalOperatorMutation(state, externalOperator: number) {
         state.blocPays._externalBlocOperator = externalOperator;
      },
      blocPaysPaysEnteredMutation(state, arraySent: Array<ListProvider>) {
         state.blocPays._paysEntered = [];
         arraySent.forEach((element) => {
            state.blocPays._paysEntered.push(element.id);
         });
      },

      //Construction de l'objet JSON contenant les critères de recherche à envoyer dans les requêtes
      jsonSearchRequestConstructionMutation(state) {
         state.jsonTraitements._jsonSearchRequest = JsonTraitements.constructJsonGlobalRequest(state.blocPcpRegions, state.blocPcpMetiers, state.blocRcr, state.blocPpn, state.blocIssn, state.blocMotsDuTitre, state.blocEditeur, state.blocLangue, state.blocPays);
      },

      //Récupération des notices par critères et effacement des notices précédentes dans le store
      async pushNoticesAndErasePreviousNoticesMutation(state) {
         state.lotNotices._lotNotices = [];
         const lotNoticesReceived = await AxiosTraitements.findNoticeByCriteria(state.jsonTraitements._jsonSearchRequest);
         lotNoticesReceived.forEach((obj) => state.lotNotices._lotNotices.push(new Notice(obj)));
      },

      //Récupération des notices par critères et ajout aux notices précédentes dans le store
      async pushNoticesAndAddToPreviousNotices(state) {
         const lotNoticesReceived = await AxiosTraitements.findNoticeByCriteria(state.jsonTraitements._jsonSearchRequest);
         lotNoticesReceived.forEach((obj) => state.lotNotices._lotNotices.push(new Notice(obj)));
      },

      //Effacement des notices stockées dans le store
      eraseAllNotices(state) {
         state.lotNotices._lotNotices = [];
      },

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

      //Bloc de recherche Ppn
      blocPpnExternalOperatorAction(context, operator: number) {
         context.commit('blocPpnExternalOperatorMutation', operator);
      },
      blocPpnInternalOperatorAction(context, operator: number) {
         context.commit('blocPpnInternalOperatorMutation', operator);
      },
      blocPpnPpnEnteredAction(context, string) {
         context.commit('blocPpnPpnEnteredMutation', string);
      },
      blocPpnListStringAction(context, arraySent: Array<string>) {
         context.commit('blocPpnListStringMutation', arraySent);
      },

      //Bloc de recherche Issn
      blocIssnExternalOperatorAction(context, operator: number) {
         context.commit('blocIssnExternalOperatorMutation', operator);
      },
      blocIssnInternalOperatorAction(context, operator: number) {
         context.commit('blocIssnInternalOperatorMutation', operator);
      },
      blocIssnIssnEnteredAction(context, stringEntered: string) {
         context.commit('blocIssnIssnEnteredMutation', stringEntered);
      },

      //Bloc de recherche mots du titre
      blocMotsDuTitreTitleWordsEnteredAction(context, stringEntered: string) {
         context.commit('blocMotsDuTitreTitleWordsEnteredMutation', stringEntered);
      },

      //Bloc de recherche editeur
      blocEditeurExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocEditeurExternalOperatorMutation', externalOperator);
      },
      blocEditeurEditorEnteredAction(context, stringEntered: string) {
         context.commit('blocEditeurEditorEnteredMutation', stringEntered);
      },

      //Bloc de recherche Langue
      blocLangueExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocLangueExternalOperatorMutation', externalOperator);
      },
      blocLangueLanguesEnteredAction(context, arraySent: Array<ListProvider>) {
         context.commit('blocLangueLanguesEnteredMutation', arraySent);
      },

      //Bloc de recherche Pays
      blocPaysExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocPaysExternalOperatorMutation', externalOperator);
      },
      blocPaysPaysEnteredAction(context, arraySent: Array<ListProvider>) {
         context.commit('blocPaysPaysEnteredMutation', arraySent);
      },

      //Construction du Json à envoyer aux requêtes de recherche
      constructJsonAction(context) {
         context.commit('jsonSearchRequestConstructionMutation');
      },

      //Appel au back-end pour recupération de notices
      getNoticesAndErasePreviousNoticesAction(context) {
         context.commit('pushNoticesAndErasePreviousNoticesMutation');
      },

      //Afficher le state global en console
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
