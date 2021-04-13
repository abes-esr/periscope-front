import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {CheckboxesProvider, Ensemble, ListProvider} from '@/store/recherche/BlocInterfaces';
import {SearchRequest} from '@/store/api/periscope/SearchRequest';
import {PeriscopeApi} from '@/store/api/periscope/PeriscopeApi';
import {LotNotices} from '@/store/resultat/LotNotices';
import Notice from '@/store/entity/Notice';
import {Composants} from './recherche/Composants';
import router from '@/router/index.ts';
import {Pagination} from '@/store/resultat/Pagination';
import {BlocRequeteEnregistree} from '@/store/recherche/BlocRequeteEnregistree';
import {Logger} from '@/store/utils/Logger';
import {RouterError} from '@/store/exception/RouterError';
import {HttpRequestError} from '@/store/exception/HttpRequestError';
import {BlocTri} from '@/store/recherche/criteres/BlocTri';
import {BlocMotDuTitre} from '@/store/recherche/criteres/BlocMotDuTitre';
import {BlocIssn} from '@/store/recherche/criteres/BlocIssn';
import {BlocPpn} from '@/store/recherche/criteres/BlocPpn';
import {BlocEditeur} from '@/store/recherche/criteres/BlocEditeur';
import {BlocLangue} from '@/store/recherche/criteres/BlocLangue';
import {BlocPays} from '@/store/recherche/criteres/BlocPays';
import {BlocRcr} from '@/store/recherche/criteres/BlocRcr';
import {BlocPcpMetiers} from '@/store/recherche/criteres/BlocPcpMetiers';
import {BlocPcpRegions} from '@/store/recherche/criteres/BlocPcpRegions';

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
      jsonTraitements: new SearchRequest(),
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
      blocPcpRegionsCandidatesMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpRegions._candidates = arraySent;
      },
      blocPcpRegionsSelectedMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpRegions._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpRegions._selected.push(element.key) : ''));
      },

      //Bloc de recherche PcpMetiers
      blocPcpMetiersExternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers._externalBlocOperator = operator;
      },
      blocPcpMetiersInternalOperatorMutation(state, operator: number) {
         state.blocPcpMetiers._internalBlocOperator = operator;
      },
      blocPcpMetiersCandidatesMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpMetiers._candidates = arraySent;
      },
      blocPcpMetiersSelectedMutation(state, arraySent: Array<CheckboxesProvider>) {
         state.blocPcpMetiers._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpMetiers._selected.push(element.key) : ''));
      },

      //Bloc de recherche Rcr
      blocRcrExternalOperatorMutation(state, operator: number) {
         state.blocRcr._externalBlocOperator = operator;
      },
      blocRcrInternalOperatorMutation(state, operator: number) {
         state.blocRcr._internalBlocOperator = operator;
      },
      blocRcrSelectedMutation(state, arraySent: Array<string>) {
         state.blocRcr._selected = arraySent;
      },

      //Bloc de recherche Ppn
      blocPpnExternalOperatorMutation(state, operator: number) {
         state.blocPpn._externalBlocOperator = operator;
      },
      blocPpnInternalOperatorMutation(state, operator: number) {
         state.blocPpn._internalBlocOperator = operator;
      },
      blocPpnSelectedMutation(state, arraySent: Array<string>) {
         state.blocPpn._selected = arraySent;
      },

      //Bloc de recherche Issn
      blocIssnExternalOperatorMutation(state, operator: number) {
         state.blocIssn._externalBlocOperator = operator;
      },
      blocIssnInternalOperatorMutation(state, operator: number) {
         state.blocIssn._internalBlocOperator = operator;
      },
      blocIssnSelectedMutation(state, arraySent: Array<string>) {
         state.blocIssn._selected = arraySent;
      },

      //Bloc de recherche Mots du titre
      blocMotsDuTitreSelectedMutation(state, stringEntered: string) {
         state.blocMotsDuTitre._selected = [];
         if (stringEntered === '') {
            state.blocMotsDuTitre._selected = [];
         } else {
            stringEntered.split(' ').forEach((element: string) => {
               state.blocMotsDuTitre._selected.push(String(element));
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
      blocEditeurSelectedMutation(state, arraySent: Array<string>) {
         state.blocEditeur._selected = arraySent;
      },

      //Bloc de recherche Langue
      blocLangueExternalOperatorMutation(state, externalOperator: number) {
         state.blocLangue._externalBlocOperator = externalOperator;
      },
      blocLangueInternalOperatorMutation(state, externalOperator: number) {
         state.blocLangue._internalBlocOperator = externalOperator;
      },
      blocLangueCandidatesMutation(state, arraySent: Array<ListProvider>) {
         state.blocLangue._candidates = arraySent;
      },
      blocLangueSelectedMutation(state, arraySent: Array<ListProvider>) {
         state.blocLangue._selected = [];
         arraySent.forEach((element) => {
            state.blocLangue._selected.push(element.id);
         });
      },

      //Bloc de recherche Pays
      blocPaysExternalOperatorMutation(state, externalOperator: number) {
         state.blocPays._externalBlocOperator = externalOperator;
      },
      blocPaysInternalOperatorMutation(state, externalOperator: number) {
         state.blocPays._internalBlocOperator = externalOperator;
      },
      blocPaysCandidatesMutation(state, arraySent: Array<ListProvider>) {
         state.blocPays._candidates = arraySent;
      },
      blocPaysSelectedMutation(state, arraySent: Array<ListProvider>) {
         state.blocPays._selected = [];
         arraySent.forEach((element) => {
            state.blocPays._selected.push(element.id);
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
         state.blocPcpRegions._selected = [];
         state.blocPcpRegions._candidates.forEach((element) => (element.value = false));
         state.blocPcpMetiers._externalBlocOperator = Ensemble.Ou;
         state.blocPcpMetiers._internalBlocOperator = Ensemble.Et;
         state.blocPcpMetiers._selected = [];
         state.blocPcpMetiers._candidates.forEach((element) => (element.value = false));
         state.blocRcr._externalBlocOperator = Ensemble.Ou;
         state.blocRcr._internalBlocOperator = Ensemble.Et;
         state.blocRcr._selected = [];
         state.blocPpn._externalBlocOperator = Ensemble.Ou;
         state.blocPpn._internalBlocOperator = Ensemble.Et;
         state.blocPpn._selected = [];
         state.blocIssn._externalBlocOperator = Ensemble.Ou;
         state.blocIssn._internalBlocOperator = Ensemble.Et;
         state.blocIssn._selected = [];
         state.blocMotsDuTitre._externalBlocOperator = Ensemble.Ou;
         state.blocMotsDuTitre._internalBlocOperator = Ensemble.Et;
         state.blocMotsDuTitre._selected = [];
         state.blocEditeur._externalBlocOperator = Ensemble.Ou;
         state.blocEditeur._internalBlocOperator = Ensemble.Et;
         state.blocEditeur._selected = [];
         state.blocPays._externalBlocOperator = Ensemble.Ou;
         state.blocPays._internalBlocOperator = Ensemble.Et;
         state.blocPays._selected = [];
         state.blocLangue._externalBlocOperator = Ensemble.Ou;
         state.blocLangue._internalBlocOperator = Ensemble.Et;
         state.blocLangue._selected = [];
         state.blocRequeteDirecte._directRequest = '';
      },

      //Construction de l'objet JSON contenant les critères de recherche à envoyer dans les requêtes
      jsonSearchRequestConstructionMutation(state) {
         state.jsonTraitements._jsonSearchRequest = SearchRequest.constructJsonGlobalRequest(state.blocPcpRegions, state.blocPcpMetiers, state.blocRcr, state.blocPpn, state.blocIssn, state.blocMotsDuTitre, state.blocEditeur, state.blocLangue, state.blocPays, state.blocRequeteDirecte, state.blocTri);
      },

      //Récupération des notices par critères et effacement des notices précédentes dans le store
      async addNoticesMutation(state, route: string) {
         Logger.debug('PAGE:' + state.pagination._nextPageToAsk + '|SIZE:' + state.pagination._sizeWanted + '|REQUEST:' + JSON.stringify(state.jsonTraitements._jsonSearchRequest));
         //On place dans l'historique la requête qui va être envoyée au back-end
         state.blocRequeteDirecte._historyOfAllRequests.push(JSON.stringify(state.jsonTraitements._jsonSearchRequest).replace(/\\/g, ''));
         //On envoie la requête au back-end
         try {
            const lotNoticesReceived = await PeriscopeApi.findNoticeByCriteriaByPageAndSize(state.jsonTraitements._jsonSearchRequest, state.pagination._nextPageToAsk, state.pagination._sizeWanted);
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

            if (route === 'current') {
               //Si il s'agit d'un rechargement de la page en cours (tableau)
               await router.go(0);
            } else {
               //Si il s'agit d'une redirection sur le tableau de résultat
               await router.push(route).catch((err) => {
                  throw new RouterError(err);
               });
            }
         } catch (err: HttpRequestError) {
            //Si une erreur avec le ws est jetée, on affiche un message d'erreur
            Logger.error(err.message + ' : ' + err.debugMessage, err.constructor.name);
            state.composants._snackBarText = err.message + ' : ' + err.debugMessage;
            state.composants._snackBarDisplay = true;
            window.alert(err.message + ' : ' + err.debugMessage);
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
      updateSelectedExternalPcpRegionsOperator(context, operator: number) {
         context.commit('blocPcpRegionsExternalOperatorMutation', operator);
      },
      updateSelectedInternalPcpRegionsOperator(context, operator: number) {
         context.commit('blocPcpRegionsInternalOperatorMutation', operator);
      },
      updateCandidatesPcpRegions(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpRegionsCandidatesMutation', arraySent);
      },
      updateSelectedPcpRegions(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpRegionsSelectedMutation', arraySent);
      },

      //Bloc de recherche PcpMetiers
      updateSelectedExternalPcpMetiersOperator(context, operator: number) {
         context.commit('blocPcpMetiersExternalOperatorMutation', operator);
      },
      updateSelectedInternalPcpMetiersOperator(context, operator: number) {
         context.commit('blocPcpMetiersInternalOperatorMutation', operator);
      },
      updateCandidatesPcpMetiers(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpMetiersCandidatesMutation', arraySent);
      },
      updateSelectedPcpMetiers(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('blocPcpMetiersSelectedMutation', arraySent);
      },

      //Bloc de recherche Rcr
      updateSelectedExternalRcrOperator(context, operator: number) {
         context.commit('blocRcrExternalOperatorMutation', operator);
      },
      updateSelectedInternalRcrOperator(context, operator: number) {
         context.commit('blocRcrInternalOperatorMutation', operator);
      },
      updateSelectedRcr(context, arraySent: Array<string>) {
         context.commit('blocRcrSelectedMutation', arraySent);
      },

      //Bloc de recherche Ppn
      updateSelectedExternalPpnOperator(context, operator: number) {
         context.commit('blocPpnExternalOperatorMutation', operator);
      },
      updateSelectedInternalPpnOperator(context, operator: number) {
         context.commit('blocPpnInternalOperatorMutation', operator);
      },
      updateSelectedPpn(context, arraySent: Array<string>) {
         context.commit('blocPpnSelectedMutation', arraySent);
      },

      //Bloc de recherche Issn
      updateSelectedExternalIssnOperator(context, operator: number) {
         context.commit('blocIssnExternalOperatorMutation', operator);
      },
      updateSelectedInternalIssnOperator(context, operator: number) {
         context.commit('blocIssnInternalOperatorMutation', operator);
      },
      updateSelectedIssn(context, arraySent: Array<string>) {
         context.commit('blocIssnSelectedMutation', arraySent);
      },

      //Bloc de recherche mots du titre
      updateSelectedMotsDuTitre(context, stringEntered: string) {
         context.commit('blocMotsDuTitreSelectedMutation', stringEntered);
      },
      updateSelectedExternalMotsDuTitreOperator(context, externalOperator: number) {
         context.commit('blocMotsDuTitreExternalOperatorMutation', externalOperator);
      },
      updateSelectedInternalMotsDuTitreOperator(context, internalOperator: number) {
         context.commit('blocMotsDuTitreInternalOperatorMutation', internalOperator);
      },

      //Bloc de recherche editeur
      updateSelectedExternalEditeurOperator(context, externalOperator: number) {
         context.commit('blocEditeurExternalOperatorMutation', externalOperator);
      },
      updateSelectedInternalEditeurOperator(context, internalOperator: number) {
         context.commit('blocEditeurInternalOperatorMutation', internalOperator);
      },
      updateSelectedEditeur(context, arraySent: Array<string>) {
         context.commit('blocEditeurSelectedMutation', arraySent);
      },

      //Bloc de recherche Langue
      updateSelectedExternalLangueOperator(context, externalOperator: number) {
         context.commit('blocLangueExternalOperatorMutation', externalOperator);
      },
      updateSelectedInternalLangueOperator(context, internalOperator: number) {
         context.commit('blocLangueInternalOperatorMutation', internalOperator);
      },
      updateSelectedLangue(context, arraySent: Array<ListProvider>) {
         context.commit('blocLangueSelectedMutation', arraySent);
      },

      //Bloc de recherche Pays
      updateSelectedExternalPaysOperator(context, externalOperator: number) {
         context.commit('blocPaysExternalOperatorMutation', externalOperator);
      },
      updateSelectedInternalPaysOperator(context, internalOperator: number) {
         context.commit('blocPaysInternalOperatorMutationOperatorMutation', internalOperator);
      },
      updateSelectedPays(context, arraySent: Array<ListProvider>) {
         context.commit('blocPaysSelectedMutation', arraySent);
      },

      //Bloc de requete directe
      updateSelectedRequeteDirecte(context, element: string) {
         context.commit('blocRequeteDirecteMutation', element);
      },

      //Reinitialisation ensemble des blocs de recherche
      resetAllSelectedValue(context) {
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
         Logger.debug(JSON.stringify(this.state));
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

      //Reinitialisation ensemble des blocs de recherche
      loadCandidatesValue(context) {
         let array: any = [
            {id: 0, key: 'PCAM', text: 'Arts-et-Métiers', value: false},
            {id: 1, key: 'PCAS', text: 'Arts du spectacle', value: false},
            {id: 2, key: 'PCAnt', text: "Sciences de l'Antiquité et Archéologie", value: false},
            {id: 3, key: 'PCChimie', text: 'Chimie', value: false},
            {id: 4, key: 'PCDroit', text: 'Droit', value: false},
            {id: 5, key: 'PCEBCO', text: 'Europe balkanique, centrale et orientale', value: false},
            {id: 6, key: 'PCGer', text: 'Langues, littératures, civilisation germaniques', value: false},
            {id: 7, key: 'PCGéo', text: 'Géographie', value: false},
            {id: 8, key: 'PCIta', text: 'Etudes italiennes', value: false},
            {id: 9, key: 'PCMedieval', text: 'Médiéval', value: false},
            {id: 10, key: 'PCNum', text: 'Sciences du Numérique', value: false},
            {id: 11, key: 'PCMath', text: 'Mathématiques RNBM', value: false},
            {id: 12, key: 'PCMed', text: 'Médecine', value: false},
            {id: 13, key: 'PCPsy', text: 'Psychologie, Psychanalyse', value: false},
            {id: 14, key: 'PCSTAPS', text: 'STAPS', value: false},
            {id: 15, key: 'PCPhilo', text: 'Philosophie', value: false},
            {id: 16, key: 'PCPhy', text: 'Physique', value: false},
            //TODO 'PCLCen':['Lettres et Sciences Humaines Centre Val de Loire', 'geo' ], -> trouver correspondance
            //TODO 'PCEco':['Economie et gestion', ''] idem
         ];
         context.commit('blocPcpMetiersCandidatesMutation', array);

         array = [
            {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
            {id: 1, key: 'PCAuv', text: 'Auvergne', value: false},
            {id: 2, key: 'PCBo', text: 'Bourgogne', value: false},
            {id: 3, key: 'PCBre', text: 'Bretagne', value: false},
            {id: 4, key: 'PCCA', text: 'Champagne-Ardenne', value: false},
            {id: 5, key: 'PCCAPI', text: 'Champagne-Ardenne Picardie', value: false},
            {id: 6, key: 'PCCor', text: 'Corse', value: false},
            {id: 7, key: 'PCFC', text: 'Franche-Comté', value: false},
            {id: 8, key: 'PCLR', text: 'Languedoc-Roussillon', value: false},
            {id: 9, key: 'PCLim', text: 'Limousin', value: false},
            {id: 10, key: 'PCLor', text: 'Lorraine', value: false},
            {id: 11, key: 'PCMP', text: 'Midi-Pyrénées', value: false},
            {id: 12, key: 'PCNPDC', text: 'Nord-Pas-de-Calais', value: false},
            {id: 13, key: 'PCPACA', text: 'PACA', value: false},
            {id: 14, key: 'PCPCh', text: 'Poitou-Charentes', value: false},
            {id: 15, key: 'PCPL', text: 'Pays de Loire', value: false},
            {id: 16, key: 'PCPic', text: 'Picardie', value: false},
            {id: 17, key: 'PCRA', text: 'Rhône-Alpes', value: false},
            {id: 18, key: 'PCSAM', text: 'Sciences Aix-Marseille', value: false},
            {id: 19, key: 'PCScvdl', text: 'Sciences Centre Val de Loire', value: false},
            {id: 20, key: 'PCUdp', text: 'Université de Poitiers', value: false},
            {id: 21, key: 'PCUdr', text: 'Université de Rouen', value: false},
         ];
         context.commit('blocPcpRegionsCandidatesMutation', array);

         array = [
            {id: 'abk', text: 'Abkhaz'},
            {id: 'ace', text: 'Achinese'},
            {id: 'ach', text: 'Acoli'},
            {id: 'ada', text: 'Adan'},
            {id: 'ady', text: 'Adyghe'},
            {id: 'aar', text: 'Afar'},
            {id: 'afh', text: 'Afrihili'},
            {id: 'afr', text: 'Afrikaans'},
            {id: 'afa', text: 'Afro-asiatiques (diverses)'},
            {id: 'ain', text: 'Ainou'},
            {id: 'aka', text: 'Akan'},
            {id: 'akk', text: 'Akkadien'},
            {id: 'alb', text: 'Albanais'},
            {id: 'ale', text: 'Aleoute'},
            {id: 'alg', text: 'Algonquin'},
            {id: 'ger', text: 'Allemand'},
            {id: 'nds', text: 'allemand (bas) ou saxon (bas)'},
            {id: 'gmh', text: 'Allemand (moyen haut)'},
            {id: 'goh', text: 'Allemand (vieux haut)'},
            {id: 'tut', text: 'Altaiques (autres langues)'},
            {id: 'amh', text: 'Amharique'},
            {id: 'eng', text: 'Anglais'},
            {id: 'enm', text: 'Anglais (moyen)'},
            {id: 'ang', text: 'Anglo-saxon'},
            {id: 'apa', text: 'Apache'},
            {id: 'ara', text: 'Arabe'},
            {id: 'arg', text: 'aragonais'},
            {id: 'arc', text: 'Arameen'},
            {id: 'arp', text: 'Arapaho'},
            {id: 'arn', text: 'Araucan'},
            {id: 'arw', text: 'Arawak'},
            {id: 'arm', text: 'Armenien'},
            {id: 'art', text: 'Artificielles (diverses)'},
            {id: 'asm', text: 'Assamais'},
            {id: 'ast', text: 'Asturien ou Bable'},
            {id: 'ath', text: 'Athapascan'},
            {id: 'aus', text: 'Australian languages'},
            {id: 'ava', text: 'Avar'},
            {id: 'ave', text: 'Avestique'},
            {id: 'awa', text: 'Awadhi'},
            {id: 'aym', text: 'Aymara'},
            {id: 'aze', text: 'Azeri'},
            {id: 'bak', text: 'Bachkir'},
            {id: 'ban', text: 'Balinais'},
            {id: 'bal', text: 'Baloutchi'},
            {id: 'bat', text: 'Baltique'},
            {id: 'bam', text: 'Bambara'},
            {id: 'bai', text: 'Bamileke (diverses)'},
            {id: 'bad', text: 'Banda'},
            {id: 'bnt', text: 'Bantou langues (autre)'},
            {id: 'bas', text: 'Basa'},
            {id: 'baq', text: 'Basque'},
            {id: 'btk', text: 'Batak'},
            {id: 'bej', text: 'Bedja'},
            {id: 'bem', text: 'Bemba'},
            {id: 'ben', text: 'Bengali'},
            {id: 'ber', text: 'Berbere'},
            {id: 'bho', text: 'Bhojpuri'},
            {id: 'bis', text: 'Bislama'},
            {id: 'bel', text: 'Bielorusse'},
            {id: 'bih', text: 'Bihari'},
            {id: 'bik', text: 'Bikol'},
            {id: 'byn', text: 'bilen ou blin'},
            {id: 'bin', text: 'Bini'},
            {id: 'bur', text: 'Birman'},
            {id: 'bla', text: "Blackfoot(= pied noir d'amerique"},
            {id: 'bos', text: 'Bosnian'},
            {id: 'bua', text: 'Buriat'},
            {id: 'bra', text: 'Braj'},
            {id: 'bre', text: 'Breton'},
            {id: 'bug', text: 'Bugi'},
            {id: 'bul', text: 'Bulgare'},
            {id: 'cad', text: 'Caddo'},
            {id: 'car', text: 'Caribe'},
            {id: 'cat', text: 'Catalan'},
            {id: 'cau', text: 'Caucasiennes (diverses)'},
            {id: 'ceb', text: 'Cebuano'},
            {id: 'cel', text: 'Celtiques (langues)'},
            {id: 'cmc', text: 'Chamic langues'},
            {id: 'cha', text: 'Chamorro'},
            {id: 'shn', text: 'chan'},
            {id: 'chr', text: 'Cherokee'},
            {id: 'chy', text: 'Cheyenne'},
            {id: 'chb', text: 'Chibcha'},
            {id: 'chi', text: 'Chinois'},
            {id: 'chn', text: 'Chinook'},
            {id: 'chp', text: 'Chipewyan'},
            {id: 'cho', text: 'Choctaw'},
            {id: 'chk', text: 'chuuk'},
            {id: 'cop', text: 'Copte'},
            {id: 'kor', text: 'Coreen'},
            {id: 'cor', text: 'Cornique'},
            {id: 'cos', text: 'Corse'},
            {id: 'cus', text: 'Couchitique'},
            {id: 'cre', text: 'Cree'},
            {id: 'cpe', text: 'Creoles et pidgins (anglais)'},
            {id: 'crp', text: 'Creoles et pidgins (diverses)'},
            {id: 'cpf', text: 'Creoles et pidgins (francais)'},
            {id: 'cpp', text: 'Creoles et pidgins (portugais)'},
            {id: 'scr', text: 'croate'},
            {id: 'dak', text: 'Dakota'},
            {id: 'dan', text: 'Danois'},
            {id: 'dar', text: 'dargwa'},
            {id: 'day', text: 'Dayak'},
            {id: 'del', text: 'Delaware'},
            {id: 'din', text: 'Dinka'},
            {id: 'dyu', text: 'dioula'},
            {id: 'mis', text: 'Diverses'},
            {id: 'chg', text: 'djaghatai'},
            {id: 'doi', text: 'Dogri'},
            {id: 'dgr', text: 'Dogrib'},
            {id: 'dua', text: 'Douala'},
            {id: 'dra', text: 'Dravidien'},
            {id: 'dzo', text: 'Dzongka'},
            {id: 'sco', text: 'Ecossais'},
            {id: 'efi', text: 'Efik'},
            {id: 'egy', text: 'Egyptien'},
            {id: 'eka', text: 'Ekajuk'},
            {id: 'elx', text: 'Elamite'},
            {id: 'myv', text: 'erza'},
            {id: 'den', text: 'esclave (athapascan)'},
            {id: 'spa', text: 'Espagnol'},
            {id: 'epo', text: 'Esperanto'},
            {id: 'est', text: 'Estonien'},
            {id: 'ewe', text: 'Ewe'},
            {id: 'ewo', text: 'Ewondo'},
            {id: 'fan', text: 'Fang'},
            {id: 'fat', text: 'Fanti'},
            {id: 'fao', text: 'Feroien'},
            {id: 'fij', text: 'Fidjien'},
            {id: 'fil', text: 'filipino ou pilipino'},
            {id: 'fiu', text: 'Finno-ougrien'},
            {id: 'fin', text: 'Finnois'},
            {id: 'fon', text: 'Fon'},
            {id: 'fre', text: 'Francais'},
            {id: 'fro', text: 'Francais (ancien)'},
            {id: 'frm', text: 'Francais (moyen)'},
            {id: 'fur', text: 'Friulian'},
            {id: 'fry', text: 'Frison'},
            {id: 'gaa', text: 'Ga'},
            {id: 'gla', text: 'Gaelique'},
            {id: 'glg', text: 'Galicien'},
            {id: 'orm', text: 'Galla'},
            {id: 'wel', text: 'Gallois'},
            {id: 'lug', text: 'ganda'},
            {id: 'gay', text: 'Gayo'},
            {id: 'gba', text: 'Gbaya'},
            {id: 'geo', text: 'Georgien'},
            {id: 'gem', text: 'Germaniques (diverses)'},
            {id: 'gon', text: 'Gond'},
            {id: 'gor', text: 'Gorontalo'},
            {id: 'got', text: 'Gothique'},
            {id: 'guj', text: 'Gujarati'},
            {id: 'grb', text: 'Grebo'},
            {id: 'grc', text: 'Grec ancien'},
            {id: 'gre', text: 'Grec moderne'},
            {id: 'kal', text: 'groenlandais'},
            {id: 'grn', text: 'Guarani'},
            {id: 'gez', text: 'guèze'},
            {id: 'gwi', text: "Gwich'in"},
            {id: 'hai', text: 'Haida'},
            {id: 'hat', text: 'haitien ou creole haitien'},
            {id: 'hau', text: 'Haoussa'},
            {id: 'haw', text: 'Hawaien'},
            {id: 'heb', text: 'Hebreu'},
            {id: 'her', text: 'Herero'},
            {id: 'hil', text: 'Hiligaynon'},
            {id: 'him', text: 'Himachali'},
            {id: 'hin', text: 'Hindi'},
            {id: 'hmo', text: 'Hiri Motu'},
            {id: 'hit', text: 'Hittite'},
            {id: 'hmn', text: 'Hmong'},
            {id: 'hun', text: 'Hongrois'},
            {id: 'hup', text: 'Hupa'},
            {id: 'sah', text: 'iakoute'},
            {id: 'iba', text: 'Iban'},
            {id: 'ido', text: 'Ido'},
            {id: 'ibo', text: 'Igbo'},
            {id: 'ijo', text: 'Ijo'},
            {id: 'ilo', text: 'Ilocano'},
            {id: 'und', text: 'Inconnue'},
            {id: 'cai', text: 'Indiennes (langues Amerique Centrale)'},
            {id: 'nai', text: "indiennes d'Amerique du Nord (autres langues)"},
            {id: 'sai', text: 'Indiennes (langues Amerique du sud)'},
            {id: 'inc', text: 'Indo-aryen (groupe)'},
            {id: 'ine', text: 'Indo-europeen (groupe)'},
            {id: 'ind', text: 'Indonesien'},
            {id: 'inh', text: 'Ingouche'},
            {id: 'ina', text: 'Interlingua'},
            {id: 'ile', text: 'Interlingue'},
            {id: 'iku', text: 'Inuktitut'},
            {id: 'ipk', text: 'Inupiaq'},
            {id: 'ira', text: 'Iraniennes (diverses)'},
            {id: 'gle', text: 'Irlandais'},
            {id: 'sga', text: 'Irlandais ancien (---1100)'},
            {id: 'mga', text: 'Irlandais moyen (ca. 1100-1500)'},
            {id: 'iro', text: 'Iroquois'},
            {id: 'ice', text: 'Islandais'},
            {id: 'ita', text: 'Italien'},
            {id: 'jpn', text: 'Japonais'},
            {id: 'jav', text: 'Javanais'},
            {id: 'jrb', text: 'Judeo-arabe'},
            {id: 'lad', text: 'judéo-espagnol'},
            {id: 'jpr', text: 'Judeo-persan'},
            {id: 'kbd', text: 'kabardien'},
            {id: 'kab', text: 'Kabyle'},
            {id: 'kac', text: 'Kachin'},
            {id: 'csb', text: 'kachoube'},
            {id: 'xal', text: 'kalmouk'},
            {id: 'kam', text: 'Kamba'},
            {id: 'kan', text: 'Kanara'},
            {id: 'kau', text: 'Kanouri'},
            {id: 'kaa', text: 'Karakalpak'},
            {id: 'krc', text: 'karatchai balkar'},
            {id: 'kar', text: 'Karen'},
            {id: 'kas', text: 'Kasmiri'},
            {id: 'kaw', text: 'Kawi'},
            {id: 'kaz', text: 'Kazakh'},
            {id: 'kha', text: 'Khasi'},
            {id: 'khm', text: 'Khmer'},
            {id: 'khi', text: 'Khoin (langues)'},
            {id: 'kho', text: 'Khotanais'},
            {id: 'kik', text: 'Kikuyu'},
            {id: 'kmb', text: 'Kimbundu'},
            {id: 'kir', text: 'Kirghiz'},
            {id: 'gil', text: 'kiribati'},
            {id: 'tlh', text: 'klingon'},
            {id: 'kom', text: 'Komi'},
            {id: 'kon', text: 'Kongo'},
            {id: 'kok', text: 'Konkani'},
            {id: 'kos', text: 'Kusaie'},
            {id: 'kum', text: 'Kumyk'},
            {id: 'kpe', text: 'Kpele'},
            {id: 'kro', text: 'Kru'},
            {id: 'kur', text: 'Kurde'},
            {id: 'kru', text: 'Kurukh'},
            {id: 'kut', text: 'Kutenai'},
            {id: 'kua', text: 'Kuanyama'},
            {id: 'lah', text: 'Lahnda'},
            {id: 'lam', text: 'Lamba'},
            {id: 'sgn', text: 'Langage gestuel'},
            {id: 'lao', text: 'Lao'},
            {id: 'lat', text: 'Latin'},
            {id: 'lav', text: 'Lette'},
            {id: 'lez', text: 'Lezgian'},
            {id: 'lim', text: 'limbourgeois'},
            {id: 'lin', text: 'Lingala'},
            {id: 'lit', text: 'Lituanien'},
            {id: 'lin', text: 'Lingala'},
            {id: 'lit', text: 'Lituanien'},
            {id: 'jbo', text: 'lojban'},
            {id: 'loz', text: 'Lozi'},
            {id: 'lub', text: 'Louba'},
            {id: 'lua', text: 'Luba-Lulua'},
            {id: 'lui', text: 'Luiseno'},
            {id: 'lun', text: 'Lunda'},
            {id: 'luo', text: 'Luo (Kenya et Tanzanie)'},
            {id: 'lus', text: 'Lushai'},
            {id: 'ltz', text: 'luxembourgeois'},
            {id: 'mac', text: 'Macedonien'},
            {id: 'mad', text: 'Madourais'},
            {id: 'mag', text: 'Magahi'},
            {id: 'mai', text: 'Maithili'},
            {id: 'mak', text: 'Makasar'},
            {id: 'may', text: 'Malais'},
            {id: 'mal', text: 'Malayalam'},
            {id: 'map', text: 'Malayo-polynesien'},
            {id: 'div', text: 'maldivien'},
            {id: 'mlg', text: 'Malgache'},
            {id: 'mlt', text: 'Maltais'},
            {id: 'mdr', text: 'Mandar'},
            {id: 'mnc', text: 'Manchu'},
            {id: 'man', text: 'Mande'},
            {id: 'mni', text: 'Manipuri'},
            {id: 'glv', text: 'Manx new'},
            {id: 'mno', text: 'Manobo'},
            {id: 'mao', text: 'Maori'},
            {id: 'mar', text: 'Marathi'},
            {id: 'chm', text: 'Mari'},
            {id: 'mah', text: 'Marshall'},
            {id: 'mwr', text: 'Marvari'},
            {id: 'mas', text: 'Masai'},
            {id: 'myn', text: 'Maya'},
            {id: 'men', text: 'Mende'},
            {id: 'mic', text: 'Micmac'},
            {id: 'min', text: 'Minangkabao'},
            {id: 'mwl', text: 'mirandais'},
            {id: 'moh', text: 'Mohawk'},
            {id: 'mdf', text: 'moksa'},
            {id: 'mol', text: 'Moldave'},
            {id: 'mkh', text: 'Mon Khmer (diverses)'},
            {id: 'lol', text: 'Mongo'},
            {id: 'mon', text: 'Mongol'},
            {id: 'mos', text: 'Mossi'},
            {id: 'mun', text: 'Mounda'},
            {id: 'mul', text: 'Multilingue'},
            {id: 'mus', text: 'Muskogee'},
            {id: 'nah', text: 'Nahuatl'},
            {id: 'nap', text: 'napolitain'},
            {id: 'nau', text: 'Nauru'},
            {id: 'nav', text: 'Navaho'},
            {id: 'nde', text: 'Ndebele (Zimbabwe)'},
            {id: 'nbl', text: 'Ndebele (Afrique du Sud)'},
            {id: 'ndo', text: 'Ndongo'},
            {id: 'dut', text: 'Neerlandais'},
            {id: 'dum', text: 'Neerlandais (moyen)'},
            {id: 'nep', text: 'Nepalais'},
            {id: 'new', text: 'Newari'},
            {id: 'nwc', text: 'newari classique'},
            {id: 'nia', text: 'Nias'},
            {id: 'nic', text: 'Nigero-congolais'},
            {id: 'ssa', text: 'Nilo-saharien (groupe)'},
            {id: 'niu', text: 'Niuean'},
            {id: 'nog', text: 'nogai ou nogay'},
            {id: 'non', text: 'Norrois vieux'},
            {id: 'nor', text: 'Norvegien'},
            {id: 'nob', text: 'Norvegien Bokmal'},
            {id: 'nno', text: 'Norvegien Nynorsk'},
            {id: 'nub', text: 'Nubien'},
            {id: 'nym', text: 'Nyamwezi'},
            {id: 'nya', text: 'Nyanja'},
            {id: 'nyn', text: 'Nyankole'},
            {id: 'nyo', text: 'Nyoro'},
            {id: 'nzi', text: 'Nzima'},
            {id: 'oci', text: 'Occitan'},
            {id: 'oji', text: 'Ojibwa'},
            {id: 'ori', text: 'Oriya'},
            {id: 'osa', text: 'Osage'},
            {id: 'oss', text: 'Ossete'},
            {id: 'oto', text: 'Otomang'},
            {id: 'udm', text: 'oudmourte'},
            {id: 'uga', text: 'Ougaritique'},
            {id: 'uig', text: 'Ouigour'},
            {id: 'urd', text: 'ourdu'},
            {id: 'uzb', text: 'Ouzbek'},
            {id: 'pus', text: 'Pachto'},
            {id: 'pal', text: 'Pahlavi'},
            {id: 'pau', text: 'Palauan'},
            {id: 'pli', text: 'Pali'},
            {id: 'pam', text: 'Pampanga'},
            {id: 'pag', text: 'Pangasinan'},
            {id: 'pap', text: 'Papiamento'},
            {id: 'paa', text: 'Papou'},
            {id: 'pan', text: 'Penjabi'},
            {id: 'per', text: 'Persan moderne'},
            {id: 'peo', text: 'Perse ancien (600-400 av. J.C.)'},
            {id: 'ful', text: 'peul'},
            {id: 'phn', text: 'Phoenician'},
            {id: 'phi', text: 'Pilipino langues (autre)'},
            {id: 'pon', text: 'Pohnpei'},
            {id: 'pol', text: 'Polonais'},
            {id: 'por', text: 'Portugais'},
            {id: 'pra', text: 'Prakrit'},
            {id: 'pro', text: 'Provencal (avant 1500)'},
            {id: 'que', text: 'Quechua'},
            {id: 'raj', text: 'Rajasthani'},
            {id: 'rap', text: 'Rapanui'},
            {id: 'rar', text: 'Rarotonga'},
            {id: 'roh', text: 'Rhetoroman (groupe)'},
            {id: 'roa', text: 'Romanes (diverses)'},
            {id: 'rum', text: 'Roumain'},
            {id: 'run', text: 'Rundi'},
            {id: 'rus', text: 'Russe'},
            {id: 'kin', text: 'rwanda'},
            {id: 'sal', text: 'Salish (famille)'},
            {id: 'sam', text: 'Samaritain'},
            {id: 'smi', text: 'Sami'},
            {id: 'smi', text: 'ex lapon'},
            {id: 'smn', text: "Sami d'Inari"},
            {id: 'smj', text: 'Sami de Lule'},
            {id: 'sme', text: 'Sami du Nord'},
            {id: 'sma', text: 'Sami du Sud'},
            {id: 'sms', text: 'Sami Skolt'},
            {id: 'smo', text: 'Samoa'},
            {id: 'sad', text: 'Sandawe'},
            {id: 'sag', text: 'Sango'},
            {id: 'san', text: 'Sanskrit'},
            {id: 'sat', text: 'Santali'},
            {id: 'srd', text: 'Sardinian'},
            {id: 'sas', text: 'Sasak'},
            {id: 'sel', text: 'Selkoup'},
            {id: 'sem', text: 'Semitiques (diverses)'},
            {id: 'scc', text: 'Serbe'},
            {id: 'srr', text: 'Serere'},
            {id: 'sna', text: 'Shona'},
            {id: 'scn', text: 'sicilien'},
            {id: 'sid', text: 'Sidamo'},
            {id: 'snd', text: 'Sindhi'},
            {id: 'sin', text: 'Singhalais'},
            {id: 'sit', text: 'Sino-tibetaines (langues)'},
            {id: 'sio', text: 'Siou (famille)'},
            {id: 'sla', text: 'Slaves (diverses)'},
            {id: 'chu', text: "Slavon d'eglise"},
            {id: 'slo', text: 'Slovaque'},
            {id: 'slv', text: 'Slovene'},
            {id: 'sog', text: 'Sogdien'},
            {id: 'som', text: 'Somali'},
            {id: 'son', text: 'Songhai'},
            {id: 'snk', text: 'Soninke'},
            {id: 'dsb', text: 'sorabe (bas)'},
            {id: 'hsb', text: 'sorabe (haut)'},
            {id: 'wen', text: 'sorabes (langues)'},
            {id: 'sot', text: 'Sotho du Sud'},
            {id: 'nso', text: 'Sotho du Nord'},
            {id: 'sun', text: 'Soundanais'},
            {id: 'sus', text: 'Soussou'},
            {id: 'swe', text: 'Suedois'},
            {id: 'suk', text: 'Sukuma'},
            {id: 'sux', text: 'Sumerien'},
            {id: 'swa', text: 'Swahili'},
            {id: 'ssw', text: 'Swazi'},
            {id: 'syr', text: 'Syriaque'},
            {id: 'tgk', text: 'Tadjik'},
            {id: 'tgl', text: 'Tagalog'},
            {id: 'tah', text: 'Tahitien'},
            {id: 'tmh', text: 'Tamashek'},
            {id: 'tam', text: 'Tamoul'},
            {id: 'tat', text: 'Tatar'},
            {id: 'crh', text: 'tatar de Crime'},
            {id: 'cze', text: 'Tcheque'},
            {id: 'che', text: 'Tchetchene'},
            {id: 'chv', text: 'Tchouvache'},
            {id: 'tel', text: 'Telugu'},
            {id: 'tem', text: 'Temne'},
            {id: 'ter', text: 'Tereno'},
            {id: 'tet', text: 'Tetum'},
            {id: 'tha', text: 'Thai'},
            {id: 'tai', text: 'Thai langues (autre)'},
            {id: 'tib', text: 'Tibetain'},
            {id: 'tig', text: 'Tigre'},
            {id: 'tir', text: 'Tigrina'},
            {id: 'tiv', text: 'Tiv'},
            {id: 'tli', text: 'Tlingit'},
            {id: 'tpi', text: 'Tok Pisin'},
            {id: 'tkl', text: 'Tokelau'},
            {id: 'tog', text: 'Tonga'},
            {id: 'ton', text: 'Tonga (polynesien)'},
            {id: 'tyv', text: 'Touva'},
            {id: 'rom', text: 'tsigane'},
            {id: 'tsi', text: 'Tsimshian'},
            {id: 'tso', text: 'Tsonga'},
            {id: 'tsn', text: 'Tswana'},
            {id: 'tum', text: 'Tumbuka'},
            {id: 'tup', text: 'Tupi (langues)'},
            {id: 'tur', text: 'Turc'},
            {id: 'ota', text: 'Turc ottoman (ecriture arabe)'},
            {id: 'tuk', text: 'Turkmene'},
            {id: 'tvl', text: 'Tuvalu'},
            {id: 'twi', text: 'Twi'},
            {id: 'ukr', text: 'Ukrainien'},
            {id: 'umb', text: 'Umbuntu'},
            {id: 'vai', text: 'Vai'},
            {id: 'ven', text: 'Venda'},
            {id: 'vie', text: 'Vietnamien'},
            {id: 'vol', text: 'Volapuk'},
            {id: 'vot', text: 'Vote'},
            {id: 'wak', text: 'Wakash (groupe)'},
            {id: 'wal', text: 'Walamo'},
            {id: 'wln', text: 'Wallon'},
            {id: 'war', text: 'Waray'},
            {id: 'was', text: 'Washo'},
            {id: 'wol', text: 'Wolof'},
            {id: 'xho', text: "X'hosa"},
            {id: 'sah', text: 'Yakut'},
            {id: 'yao', text: 'Yao'},
            {id: 'yap', text: 'Yap'},
            {id: 'iii', text: 'yi de Sichuan'},
            {id: 'yid', text: 'Yiddish'},
            {id: 'yor', text: 'Yoruba'},
            {id: 'ypk', text: 'Yupik langages'},
            {id: 'znd', text: 'Zande'},
            {id: 'zap', text: 'Zapoteque'},
            {id: 'zen', text: 'Zenaga'},
            {id: 'zha', text: 'Zhuang'},
            {id: 'zul', text: 'Zoulou'},
            {id: 'zun', text: 'Zuni'},
         ];
         context.commit('blocLangueCandidatesMutation', array);

         array = [
            {id: 'AF', text: 'Afghanistan'},
            {id: 'ZA', text: 'Afrique du Sud'},
            {id: 'AX', text: 'Aland Iles'},
            {id: 'AL', text: 'Albanie'},
            {id: 'DZ', text: 'Algérie'},
            {id: 'DE', text: 'Allemagne'},
            {id: 'DD', text: "Allemagne de l'Est"},
            {id: 'AD', text: 'Andorre'},
            {id: 'AO', text: 'Angola'},
            {id: 'AI', text: 'Anguilla'},
            {id: 'AQ', text: 'Antarctique'},
            {id: 'AG', text: 'Antigua et Barbuda'},
            {id: 'AN', text: 'Antilles néerlandaises'},
            {id: 'SA', text: 'Arabie Saoudite'},
            {id: 'AR', text: 'Argentine'},
            {id: 'AM', text: 'Arménie'},
            {id: 'AW', text: 'Aruba'},
            {id: 'AU', text: 'Australie'},
            {id: 'AT', text: 'Autriche'},
            {id: 'AZ', text: 'Azerbaïdjan'},
            {id: 'BS', text: 'Bahamas'},
            {id: 'BH', text: 'Bahrein'},
            {id: 'BD', text: 'Bangladesh'},
            {id: 'BB', text: 'Barbade'},
            {id: 'BY', text: 'Bélarus'},
            {id: 'BE', text: 'Belgique'},
            {id: 'BZ', text: 'Bélize'},
            {id: 'BJ', text: 'Bénin'},
            {id: 'BM', text: 'Bermudes'},
            {id: 'BT', text: 'Bhoutan'},
            {id: 'BO', text: 'Bolivie'},
            {id: 'BA', text: 'Bosnie-Herzégovine'},
            {id: 'BW', text: 'Botswana'},
            {id: 'BV', text: 'Bouvet (Ile)'},
            {id: 'BR', text: 'Brésil'},
            {id: 'BN', text: 'Brunei Darussalam'},
            {id: 'BG', text: 'Bulgarie'},
            {id: 'BF', text: 'Burkina Faso'},
            {id: 'BI', text: 'Burundi'},
            {id: 'KY', text: 'Caïmanes (Iles)'},
            {id: 'KH', text: 'Cambodge'},
            {id: 'CM', text: 'Cameroun'},
            {id: 'CA', text: 'Canada'},
            {id: 'CT', text: 'Canton et Enderbury (Iles)'},
            {id: 'CV', text: 'Cap-Vert'},
            {id: 'CF', text: 'Centrafricaine (République)'},
            {id: 'CL', text: 'Chili'},
            {id: 'CN', text: 'Chine'},
            {id: 'CX', text: 'Christmas (Ile)'},
            {id: 'CY', text: 'Chypre'},
            {id: 'CC', text: 'Cocos (Keeling)(Iles)'},
            {id: 'CO', text: 'Colombie'},
            {id: 'KM', text: 'Comores'},
            {id: 'CG', text: 'Congo'},
            {id: 'CD', text: 'la République démocratique du Congo'},
            {id: 'CK', text: 'Cook (Iles)'},
            {id: 'KR', text: 'République de Corée'},
            {id: 'KP', text: 'République populaire démocratique de Corée'},
            {id: 'CR', text: 'Costa Rica'},
            {id: 'CI', text: "Côte d'Ivoire"},
            {id: 'HR', text: 'Croatie'},
            {id: 'CU', text: 'Cuba'},
            {id: 'DK', text: 'Danemark'},
            {id: 'DJ', text: 'Djibouti'},
            {id: 'DO', text: 'République Dominicaine'},
            {id: 'DM', text: 'Dominique'},
            {id: 'EG', text: 'Egypte'},
            {id: 'SV', text: 'El Salvador'},
            {id: 'AE', text: 'Emirats arabes unis'},
            {id: 'EC', text: 'Equateur'},
            {id: 'ER', text: 'Erythrée'},
            {id: 'ES', text: 'Espagne'},
            {id: 'EE', text: 'Estonie'},
            {id: 'US', text: 'Etats-Unis'},
            {id: 'ET', text: 'Ethiopie'},
            {id: 'FK', text: 'Falkland (Iles) (Malvinas)'},
            {id: 'FO', text: 'Feroe (Iles)'},
            {id: 'FJ', text: 'Fidji'},
            {id: 'FI', text: 'Finlande'},
            {id: 'FR', text: 'France'},
            {id: 'GA', text: 'Gabon'},
            {id: 'GM', text: 'Gambie'},
            {id: 'GE', text: 'Géorgie'},
            {id: 'GS', text: 'Géorgie du sud et les Iles Sandwich du Sud'},
            {id: 'GH', text: 'Ghana'},
            {id: 'GI', text: 'Gibraltar'},
            {id: 'GR', text: 'Grèce'},
            {id: 'GD', text: 'Grenade'},
            {id: 'GL', text: 'Groenland'},
            {id: 'GP', text: 'Guadeloupe'},
            {id: 'GU', text: 'Guam'},
            {id: 'GT', text: 'Guatemala'},
            {id: 'GG', text: 'Guernesey'},
            {id: 'GN', text: 'Guinée'},
            {id: 'GW', text: 'Guinée-Bissau'},
            {id: 'GQ', text: 'Guinée équatoriale'},
            {id: 'GY', text: 'Guyana'},
            {id: 'GF', text: 'Guyane française'},
            {id: 'HT', text: 'Haïti'},
            {id: 'HM', text: 'Heard (Ile) et McDonald (Iles)'},
            {id: 'HN', text: 'Honduras'},
            {id: 'HK', text: 'Hong-Kong'},
            {id: 'HU', text: 'Hongrie'},
            {id: 'IM', text: 'Ile de Man'},
            {id: 'UM', text: 'Iles mineures éloignées des Etats-Unis'},
            {id: 'VG', text: 'Iles vierges britanniques'},
            {id: 'VI', text: 'Iles vierges des Etats-Unis'},
            {id: 'XX', text: 'pays inconnu'},
            {id: 'IN', text: 'Inde'},
            {id: 'ID', text: 'Indonésie'},
            {id: 'IR', text: "République islamique d'Iran"},
            {id: 'IQ', text: 'Iraq'},
            {id: 'IE', text: 'Irlande'},
            {id: 'IS', text: 'Islande'},
            {id: 'IL', text: 'Israël'},
            {id: 'IT', text: 'Italie'},
            {id: 'JM', text: 'Jamaïque'},
            {id: 'JP', text: 'Japon'},
            {id: 'JE', text: 'Jersey'},
            {id: 'JO', text: 'Jordanie'},
            {id: 'KZ', text: 'Kazakhstan'},
            {id: 'KE', text: 'Kenya'},
            {id: 'KG', text: 'Kirghizistan'},
            {id: 'KI', text: 'Kiribati'},
            {id: 'KW', text: 'Koweït'},
            {id: 'LA', text: 'République démocratique populaire du Laos'},
            {id: 'LS', text: 'Lesotho'},
            {id: 'LV', text: 'Lettonie'},
            {id: 'LB', text: 'Liban'},
            {id: 'LR', text: 'Libéria'},
            {id: 'LY', text: 'Libyenne ou Jamahiriya arabe'},
            {id: 'LI', text: 'Liechtenstein'},
            {id: 'LT', text: 'Lituanie'},
            {id: 'LU', text: 'Luxembourg'},
            {id: 'MO', text: 'Macao'},
            {id: 'MK', text: "l'ex-République yougoslave de Macédoine"},
            {id: 'MG', text: 'Madagascar'},
            {id: 'MY', text: 'Malaisie'},
            {id: 'MW', text: 'Malawi'},
            {id: 'MV', text: 'Maldives'},
            {id: 'ML', text: 'Mali'},
            {id: 'MT', text: 'Malte'},
            {id: 'MP', text: 'Mariannes du nord (Iles)'},
            {id: 'MA', text: 'Maroc'},
            {id: 'MH', text: 'Marshall (Iles)'},
            {id: 'MQ', text: 'Martinique'},
            {id: 'MU', text: 'Maurice'},
            {id: 'MR', text: 'Mauritanie'},
            {id: 'YT', text: 'Mayotte'},
            {id: 'MX', text: 'Mexique'},
            {id: 'FM', text: 'Etats fédérés de Micronésie'},
            {id: 'MD', text: 'République de Moldova'},
            {id: 'MC', text: 'Monaco'},
            {id: 'MN', text: 'Mongolie'},
            {id: 'ME', text: 'Monténégro'},
            {id: 'MS', text: 'Montserrat'},
            {id: 'MZ', text: 'Mozambique'},
            {id: 'ZZ', text: 'pays multiples'},
            {id: 'MM', text: 'Myanmar'},
            {id: 'NA', text: 'Namibie'},
            {id: 'NR', text: 'Nauru'},
            {id: 'NP', text: 'Népal'},
            {id: 'NI', text: 'Nicaragua'},
            {id: 'NE', text: 'Niger'},
            {id: 'NG', text: 'Nigéria'},
            {id: 'NU', text: 'Niué'},
            {id: 'NF', text: 'Norfolk (Ile)'},
            {id: 'NO', text: 'Norvège'},
            {id: 'NC', text: 'Nouvelle-Calédonie'},
            {id: 'NZ', text: 'Nouvelle-Zélande'},
            {id: 'IO', text: "Territoire britannique de l'Océan indien"},
            {id: 'OM', text: 'Oman'},
            {id: 'UG', text: 'Ouganda'},
            {id: 'UZ', text: 'Ouzbékistan'},
            {id: 'PK', text: 'Pakistan'},
            {id: 'PW', text: 'Palaos'},
            {id: 'PS', text: 'Territoire Palestinien occupé'},
            {id: 'PA', text: 'Panama'},
            {id: 'PG', text: 'Papouasie-Nouvelle-Guinée'},
            {id: 'PY', text: 'Paraguay'},
            {id: 'NL', text: 'Pays-Bas'},
            {id: 'PE', text: 'Pérou'},
            {id: 'PH', text: 'Philippines'},
            {id: 'PN', text: 'Pitcairn'},
            {id: 'PL', text: 'Pologne'},
            {id: 'PF', text: 'Polynésie française'},
            {id: 'PR', text: 'Porto Rico'},
            {id: 'PT', text: 'Portugal'},
            {id: 'QA', text: 'Qatar'},
            {id: 'RE', text: 'Réunion'},
            {id: 'RO', text: 'Roumanie'},
            {id: 'GB', text: 'Royaume-Uni'},
            {id: 'RU', text: 'Fédération de Russie'},
            {id: 'RW', text: 'Rwanda'},
            {id: 'EH', text: 'Sahara occidental'},
            {id: 'SH', text: 'Sainte-Hélène'},
            {id: 'LC', text: 'Sainte-Lucie'},
            {id: 'KN', text: 'Saint-Kitts-et-Nevis'},
            {id: 'SM', text: 'Saint-Marin'},
            {id: 'PM', text: 'Saint-Pierre-et-Miquelon'},
            {id: 'VA', text: 'Saint-Siège, Etat de la Cité du Vatican'},
            {id: 'VC', text: 'Saint-Vincent-et-les-Grenadines'},
            {id: 'SB', text: 'Salomon (Iles)'},
            {id: 'WS', text: 'Samoa'},
            {id: 'AS', text: 'Samoa américaines'},
            {id: 'ST', text: 'Sao Tomé-et-Principe'},
            {id: 'SN', text: 'Sénégal'},
            {id: 'RS', text: 'Serbie'},
            {id: 'SC', text: 'Seychelles'},
            {id: 'SL', text: 'Sierra Leone'},
            {id: 'SG', text: 'Singapour'},
            {id: 'SK', text: 'Slovaquie'},
            {id: 'SI', text: 'Slovénie'},
            {id: 'SO', text: 'Somalie'},
            {id: 'SD', text: 'Soudan'},
            {id: 'LK', text: 'Sri Lanka'},
            {id: 'SE', text: 'Suède'},
            {id: 'CH', text: 'Suisse'},
            {id: 'SR', text: 'Suriname'},
            {id: 'SJ', text: 'Svalbard et Ile Jan Mayen'},
            {id: 'SZ', text: 'Swaziland'},
            {id: 'SY', text: 'République arabe Syrienne'},
            {id: 'TJ', text: 'Tadjikistan'},
            {id: 'TW', text: 'Taïwan, Province de Chine'},
            {id: 'TZ', text: 'République unie de Tanzanie'},
            {id: 'TD', text: 'Tchad'},
            {id: 'CS', text: 'Tchècoslovaquie'},
            {id: 'CZ', text: 'République Tchèque'},
            {id: 'TF', text: 'Terres australes et antarctiques françaises'},
            {id: 'TH', text: 'Thaïlande'},
            {id: 'TL', text: 'Timor-Leste'},
            {id: 'TG', text: 'Togo'},
            {id: 'TK', text: 'Tokelau'},
            {id: 'TO', text: 'Tonga'},
            {id: 'TT', text: 'Trinité-et-Tobago'},
            {id: 'TN', text: 'Tunisie'},
            {id: 'TM', text: 'Turkménistan'},
            {id: 'TC', text: 'Turks et Caïques (Iles)'},
            {id: 'TR', text: 'Turquie'},
            {id: 'TV', text: 'Tuvalu'},
            {id: 'SU', text: 'U.S.S.R.'},
            {id: 'UA', text: 'Ukraine'},
            {id: 'UY', text: 'Uruguay'},
            {id: 'VU', text: 'Vanuatu'},
            {id: 'VE', text: 'Venezuela'},
            {id: 'VN', text: 'Viet-nam'},
            {id: 'VD', text: 'Viet-nam (Sud)'},
            {id: 'WF', text: 'Wallis et Futuna'},
            {id: 'YE', text: 'Yémen'},
            {id: 'YD', text: 'Yémen (Nord)'},
            {id: 'YU', text: 'Yougoslavie'},
            {id: 'ZR', text: 'Zaïre'},
            {id: 'ZM', text: 'Zambie'},
            {id: 'ZW', text: 'Zimbabwe'},
         ];
         context.commit('blocPaysCandidatesMutation', array);
      },
   },
   getters: {
      isFirstElement: (state) => (text: string) => {
         return Composants.isFirstElement(text, state.composants._panel);
      },
      getArrayRegions: (state) => {
         Logger.debug('Store Getters = ' + JSON.stringify(state.blocPcpRegions._candidates));
         return state.blocPcpRegions._candidates;
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
         state.blocPcpRegions._candidates.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },
      getCurrentArrayPcpMetiersElementsChecked: (state) => {
         Logger.debug('icici');
         const arrayReturned: Array<string> = [];
         /*state.blocPcpMetiers._arrayMetiers.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });*/
         return arrayReturned;
      },
   },
   plugins: [createPersistedState()],
});
