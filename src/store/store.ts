import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';
import {BlocRcr} from '@/store/classes/blocsDeRecherche/BlocRcr';
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
import {Composants} from './classes/composants/Composants';
import router from '@/router/index.ts';
import {BlocTri} from '@/store/classes/blocsDeRecherche/BlocTri';
import {Pagination} from '@/store/classes/resultatsDeRecherche/Pagination';
import {BlocRequeteEnregistree} from '@/store/classes/blocsDeRecherche/BlocRequeteEnregistree';

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
      blocRequeteDirecte: new BlocRequeteEnregistree(),
      //Resultats de recherche
      lotNotices: new LotNotices(),
      //Composants
      composants: new Composants(),
      //Méthodes pour construire JSON à envoyer au back-end
      jsonTraitements: new JsonTraitements(),
      //Bloc de tri multiples
      blocTri: new BlocTri(),
      pagination: new Pagination(),
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
      blocRcrRcrListStringMutation(state, arraySent: Array<string>) {
         state.blocRcr._rcrListString = arraySent;
      },

      //Bloc de recherche Ppn
      blocPpnExternalOperatorMutation(state, operator: number) {
         state.blocPpn._externalBlocOperator = operator;
      },
      blocPpnInternalOperatorMutation(state, operator: number) {
         console.log(operator);
         state.blocPpn._internalBlocOperator = operator;
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
      blocIssnListStringMutation(state, arraySent: Array<string>) {
         state.blocIssn._issnListString = arraySent;
      },

      //Bloc de recherche Mots du titre
      blocMotsDuTitreTitleWordsEnteredMutation(state, stringEntered: string) {
         state.blocMotsDuTitre._titleWordsEntered = [];
         if (stringEntered === '') {
            state.blocMotsDuTitre._titleWordsEntered = [];
         } else {
            stringEntered.split(' ').forEach((element: string) => {
               state.blocMotsDuTitre._titleWordsEntered.push(String(element));
            });
         }
      },
      blocMotsDuTitreExternalOperatorMutation(state, operator: number) {
         state.blocMotsDuTitre._externalBlocOperator = operator;
      },
      blocMotsDuTitreInternalOperatorMutation(state, operator: number) {
         state.blocMotsDuTitre._internalBlocOperator = operator;
      },

      //Bloc de recherche Editeur
      blocEditeurExternalOperatorMutation(state, externalOperator: number) {
         state.blocEditeur._externalBlocOperator = externalOperator;
      },
      blocEditeurInternalOperatorMutation(state, externalOperator: number) {
         state.blocEditeur._internalBlocOperator = externalOperator;
      },
      blocEditeurEditorEnteredMutation(state, arraySent: Array<string>) {
         state.blocEditeur._editorsEntered = arraySent;
      },

      //Bloc de recherche Langue
      blocLangueExternalOperatorMutation(state, externalOperator: number) {
         state.blocLangue._externalBlocOperator = externalOperator;
      },
      blocLangueInternalOperatorMutation(state, externalOperator: number) {
         state.blocLangue._internalBlocOperator = externalOperator;
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
      blocPaysInternalOperatorMutation(state, externalOperator: number) {
         state.blocPays._internalBlocOperator = externalOperator;
      },
      blocPaysPaysEnteredMutation(state, arraySent: Array<ListProvider>) {
         state.blocPays._paysEntered = [];
         arraySent.forEach((element) => {
            state.blocPays._paysEntered.push(element.id);
         });
      },

      //Bloc de requete directe
      blocRequeteDirecteMutation(state, element: string) {
         state.blocRequeteDirecte._directRequest = element;
      },
      blocRequeteDirecteAddRequestToHistory(state, element: string) {
         state.blocRequeteDirecte._historyOfAllRequests.push(element);
      },

      //Reinitialisation de l'ensemble des blocs de recherche
      resetAllBlocsMutation(state) {
         state.blocPcpRegions._externalBlocOperator = Ensemble.Ou;
         state.blocPcpRegions._internalBlocOperator = Ensemble.Et;
         state.blocPcpRegions._pcpStringArray = [];
         state.blocPcpRegions._arrayRegions.forEach((element) => (element.value = false));
         state.blocPcpMetiers._externalBlocOperator = Ensemble.Ou;
         state.blocPcpMetiers._internalBlocOperator = Ensemble.Et;
         state.blocPcpMetiers._pcpStringArray = [];
         state.blocPcpMetiers._arrayMetiers.forEach((element) => (element.value = false));
         state.blocRcr._externalBlocOperator = Ensemble.Ou;
         state.blocRcr._internalBlocOperator = Ensemble.Et;
         state.blocRcr._rcrListString = [];
         state.blocPpn._externalBlocOperator = Ensemble.Ou;
         state.blocPpn._internalBlocOperator = Ensemble.Et;
         state.blocPpn._ppnListString = [];
         state.blocIssn._externalBlocOperator = Ensemble.Ou;
         state.blocIssn._internalBlocOperator = Ensemble.Et;
         state.blocIssn._issnListString = [];
         state.blocMotsDuTitre._externalBlocOperator = Ensemble.Ou;
         state.blocMotsDuTitre._internalBlocOperator = Ensemble.Et;
         state.blocMotsDuTitre._titleWordsEntered = [];
         state.blocEditeur._externalBlocOperator = Ensemble.Ou;
         state.blocEditeur._internalBlocOperator = Ensemble.Et;
         state.blocEditeur._editorsEntered = [];
         state.blocPays._externalBlocOperator = Ensemble.Ou;
         state.blocPays._internalBlocOperator = Ensemble.Et;
         state.blocPays._paysEntered = [];
         state.blocLangue._externalBlocOperator = Ensemble.Ou;
         state.blocLangue._internalBlocOperator = Ensemble.Et;
         state.blocLangue._languesEntered = [];
         state.blocRequeteDirecte._directRequest = '';
      },

      //Construction de l'objet JSON contenant les critères de recherche à envoyer dans les requêtes
      jsonSearchRequestConstructionMutation(state) {
         state.jsonTraitements._jsonSearchRequest = JsonTraitements.constructJsonGlobalRequest(
            state.blocPcpRegions,
            state.blocPcpMetiers,
            state.blocRcr,
            state.blocPpn,
            state.blocIssn,
            state.blocMotsDuTitre,
            state.blocEditeur,
            state.blocLangue,
            state.blocPays,
            state.blocRequeteDirecte,
            state.blocTri
         );
      },

      //Récupération des notices par critères et effacement des notices précédentes dans le store
      async addNoticesMutation(state, route: string) {
         console.log('PAGE:' + state.pagination._nextPageToAsk + '|SIZE:' + state.pagination._sizeWanted + '|REQUEST:' + JSON.stringify(state.jsonTraitements._jsonSearchRequest));
         //On place dans l'historique la requête qui va être envoyée au back-end
         state.blocRequeteDirecte._historyOfAllRequests.push(JSON.stringify(state.jsonTraitements._jsonSearchRequest).replace(/\\/g, ''));
         //On envoie la requête au back-end
         const lotNoticesReceived = await AxiosTraitements.findNoticeByCriteriaByPageAndSize(JSON.stringify(state.jsonTraitements._jsonSearchRequest), state.pagination._nextPageToAsk, state.pagination._sizeWanted);
         //Si une erreur avec le ws est jetée, on affiche un message d'erreur
         if (lotNoticesReceived.length === 1) {
            state.composants._snackBarText = JSON.stringify(lotNoticesReceived[0]);
            state.composants._snackBarDisplay = true;
         } else {
            //Modifie la pagination pour les résultats suivants
            state.pagination._nextPageToAsk += 1;
            //Contient les notices brutes
            lotNoticesReceived.forEach((obj) => state.lotNotices._lotNotices.push(new Notice(obj)));
            //Contient les notices avec un formatage des données
            state.lotNotices._lotNotices.forEach((element) => {
               state.lotNotices._resultArrayContentNotices.push({
                  ppn: element.ppn,
                  continiousType: element.continiousType,
                  issn: element.issn,
                  keyTitle: element.keyTitle,
                  editor: element.editor,
                  startDate: element.startDate,
                  endDate: element.endDate,
                  pcpList: element.pcpList,
                  rcrLength: element.rcrList.length,
                  titleComplement: element.titleComplement,
                  keyTitleQualifer: element.keyTitleQualifer,
                  rcrList: element.rcrList,
               });
            });

            //Si il s'agit d'un rechargement de la page en cours (tableau)
            if (route === 'current') {
               await router.go(0);
               //Si il s'agit d'une redirection sur le tableau de résultat
            } else {
               await router.push(route);
            }
         }
      },

      //Changement du nombre d'éléments souhaité par page
      changeNumberOfElementsParPageMutation(state, nbElement: number) {
         state.pagination._sizeWanted = nbElement;
      },

      //Effacement des notices stockées dans le store et réinitialisation de la pagination
      resetNoticesAndPaginationMutation(state) {
         state.lotNotices._lotNotices = [];
         state.lotNotices._resultArrayContentNotices = [];
         state.pagination._nextPageToAsk = 0;
         state.pagination._totalSize = 0;
      },

      //Effacement des notices stockées dans le store sans changement de pagination
      resetNoticesMutation(state) {
         state.lotNotices._lotNotices = [];
         state.lotNotices._resultArrayContentNotices = [];
      },

      previousPageDecrementPaginationMutation(state) {
         state.pagination._nextPageToAsk = state.pagination._nextPageToAsk - 2;
         if (state.pagination._nextPageToAsk < 0) {
            state.pagination._nextPageToAsk = 0;
         }
      },

      //Actions liées aux composants
      //Changement d'étape dans le stepper
      changeStepMutation(state, stepSent: number) {
         state.composants._stepperCurrentValue = stepSent;
      },

      //Fermeture de la snackbar
      closeSnackBarMutation(state, value: boolean) {
         state.composants._snackBarDisplay = value;
      },

      //Mouvements des blocs de recherche
      moveUpElementPanelMutation(state, element: string) {
         Composants.panelMovement(element, state.composants._panel, 'UP');
         router.go(0);
      },
      moveDownElementPanelMutation(state, element: string) {
         Composants.panelMovement(element, state.composants._panel, 'DOWN');
         router.go(0);
      },
      switchElementPanelBooleanAtTrueMutation(state, element: string) {
         Composants.panelSwitchBooleanAtTrue(element, state.composants._panel);
         router.go(0);
      },
      switchElementPanelBooleanAtFalseMutation(state, element: string) {
         Composants.panelSwitchBooleanAtFalse(element, state.composants._panel);
         router.go(0);
      },

      //Tri multiples sur le tableau de résultats
      blocTriMutation(state, element: Array<string>) {
         BlocTri.updateArray(state.blocTri, element);
      },

      //Modification de la pagination
      newNumberOfNoticesAskedForNewCallMutation(state, element: number) {
         state.pagination._sizeWanted = element;
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
      blocIssnListStringAction(context, arraySent: Array<string>) {
         context.commit('blocIssnListStringMutation', arraySent);
      },

      //Bloc de recherche mots du titre
      blocMotsDuTitreTitleWordsEnteredAction(context, stringEntered: string) {
         context.commit('blocMotsDuTitreTitleWordsEnteredMutation', stringEntered);
      },
      blocMotsDuTitreExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocMotsDuTitreExternalOperatorMutation', externalOperator);
      },
      blocMotsDuTitreInternalOperatorAction(context, internalOperator: number) {
         context.commit('blocMotsDuTitreInternalOperatorMutation', internalOperator);
      },

      //Bloc de recherche editeur
      blocEditeurExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocEditeurExternalOperatorMutation', externalOperator);
      },
      blocEditeurInternalOperatorAction(context, internalOperator: number) {
         context.commit('blocEditeurInternalOperatorMutation', internalOperator);
      },
      blocEditeurEditorEnteredAction(context, arraySent: Array<string>) {
         context.commit('blocEditeurEditorEnteredMutation', arraySent);
      },

      //Bloc de recherche Langue
      blocLangueExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocLangueExternalOperatorMutation', externalOperator);
      },
      blocLangueInternalOperatorAction(context, internalOperator: number) {
         context.commit('blocLangueInternalOperatorMutation', internalOperator);
      },
      blocLangueLanguesEnteredAction(context, arraySent: Array<ListProvider>) {
         context.commit('blocLangueLanguesEnteredMutation', arraySent);
      },

      //Bloc de recherche Pays
      blocPaysExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocPaysExternalOperatorMutation', externalOperator);
      },
      blocPaysInternalOperatorAction(context, internalOperator: number) {
         context.commit('blocPaysInternalOperatorMutationOperatorMutation', internalOperator);
      },
      blocPaysPaysEnteredAction(context, arraySent: Array<ListProvider>) {
         context.commit('blocPaysPaysEnteredMutation', arraySent);
      },

      //Bloc de requete directe
      blocRequeteDirecteAction(context, element: string) {
         context.commit('blocRequeteDirecteMutation', element);
      },

      //Reinitialisation ensemble des blocs de recherche
      resetAllBlocsAction(context) {
         context.commit('resetAllBlocsMutation');
      },

      //Construction du Json à envoyer aux requêtes de recherche
      constructJsonAction(context) {
         context.commit('jsonSearchRequestConstructionMutation');
      },

      //Appel au back-end pour recupération de notices
      getNoticesAction(context, route: string) {
         context.commit('addNoticesMutation', route);
      },

      //Changement du nombre d'éléments souhaités par page
      changeNumberOfElementsParPageAction(context, nbElements: number) {
         context.commit('changeNumberOfElementsParPageMutation', nbElements);
      },

      //Effacement des notices stockées dans le store et réinitialisation de la pagination
      resetNoticesAndPaginationAction(context) {
         context.commit('resetNoticesAndPaginationMutation');
      },

      resetNoticesAction(context) {
         context.commit('resetNoticesMutation');
      },

      previousPageDecrementPaginationAction(context) {
         context.commit('previousPageDecrementPaginationMutation');
      },

      //Afficher le state global en console
      displayStore() {
         console.log(JSON.parse(JSON.stringify(this.state)));
      },

      //Actions liées au composants
      //Stepper changement de step
      changeStepAction(context, stepSent: number) {
         context.commit('changeStepMutation', stepSent);
      },

      closeSnackBarAction(context, value: boolean) {
         context.commit('closeSnackBarMutation', value);
      },

      //Affichage des différents panneaux de recherche
      displayElementPanelAction(context, value: boolean) {
         context.commit('displayElementPanelMutation', value);
      },
      moveUpElementPanelAction(context, value: string) {
         context.commit('moveUpElementPanelMutation', value);
      },
      moveDownElementPanelAction(context, value: string) {
         context.commit('moveDownElementPanelMutation', value);
      },
      switchElementPanelBooleanAtTrueAction(context, value: string) {
         context.commit('switchElementPanelBooleanAtTrueMutation', value);
      },
      switchElementPanelBooleanAtFalseMutation(context, value: string) {
         context.commit('switchElementPanelBooleanAtFalseMutation', value);
      },

      //Tri multiple sur le tableau de résultats
      blocTriAction(context, value: Array<string>) {
         context.commit('blocTriMutation', value);
      },

      //Modification de la pagination
      newNumberOfNoticesAskedForNewCallAction(context, value: number) {
         context.commit('newNumberOfNoticesAskedForNewCallMutation', value);
      },
   },
   getters: {
      isFirstElement: (state) => (text: string) => {
         return Composants.isFirstElement(text, state.composants._panel);
      },
      getArrayRegions: (state) => {
         console.log(state.blocPcpRegions._arrayRegions);
         return state.blocPcpRegions._arrayRegions;
      },
      orderSortArrayResultLabelElements: (state) => {
         return BlocTri.getLabelElements(state.blocTri);
      },
      orderSortArrayResultBooleanElements: (state) => {
         return BlocTri.getBooleanElements(state.blocTri);
      },
      getRequestLaunchedToBackEnd: (state) => {
         return 'request launched => PAGE:' + (state.pagination._nextPageToAsk - 1) + '|SIZE:' + state.pagination._sizeWanted + '|REQUEST:' + JSON.stringify(state.jsonTraitements._jsonSearchRequest);
      },
      getCurrentPositionNoticesStartedDisplayed: (state) => {
         return (state.pagination._nextPageToAsk - 1) * state.pagination._sizeWanted + 1;
      },
      getCurrentPositionNoticesEndedDisplayed: (state) => {
         return state.pagination._nextPageToAsk * state.pagination._sizeWanted;
      },
      getCurrentArrayPcpRegionsElementsChecked: (state) => {
         const arrayReturned: Array<string> = [];
         state.blocPcpRegions._arrayRegions.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },
      getCurrentArrayPcpMetiersElementsChecked: (state) => {
         const arrayReturned: Array<string> = [];
         state.blocPcpMetiers._arrayMetiers.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },
   },
   plugins: [createPersistedState()],
});
