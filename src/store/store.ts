import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {CheckboxItem, ListItem, Operator} from '@/store/recherche/BlocDefinition';
import {SearchRequest} from '@/store/api/periscope/SearchRequest';
import {PeriscopeApiAxios} from '@/service/periscope/PeriscopeApiAxios';
import {LotNotices} from '@/store/resultat/LotNotices';
import Notice from '@/store/entity/Notice';
import {Composants} from './composant/Composants';
import {Pagination} from '@/store/resultat/Pagination';
import {BlocRequeteEnregistree} from '@/store/recherche/BlocRequeteEnregistree';
import {Logger} from '@/utils/Logger';
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
import {AvailableSwitch, DisplaySwitch, Movement, PanelAvailableSwitchProvider, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {OrderType, TriDefinition} from '@/store/recherche/TriDefinition';
import {APIHoldingsResponse, APISearchResponse, JsonGlobalSearchRequest} from '@/service/periscope/PeriscopeJsonDefinition';
import router from '@/router';
import {LotFacettes} from '@/store/resultat/LotFacettes';
import Facet from '@/store/entity/Facet';
import {LotHoldings} from '@/store/visualisation/LotHoldings';
import Holding from '@/store/entity/Holding';
import {FiltresFacettes} from '@/store/recherche/filtresFacettes/FiltresFacettes';
import {BlocPcpRcr} from '@/store/recherche/criteres/BlocPcpRcr';
import pcpMetiers from '@/store/composant/PcpMetiers';
import pcpRegions from '@/store/composant/PcpRegions';
import pays from '@/store/composant/Pays';
import langues from '@/store/composant/Langues';
import PcpLibProfileService from '@/service/PcpLibProfileService';

Vue.use(Vuex);

/**
 * Représente le store de l'application
 */
export default new Vuex.Store({
   state: {
      //Requete de recherche
      blocPcpRegions: new BlocPcpRegions(Operator.Ou),
      blocPcpMetiers: new BlocPcpMetiers(Operator.Ou),
      blocRcr: new BlocRcr(Operator.Ou),
      blocPpn: new BlocPpn(Operator.Ou),
      blocIssn: new BlocIssn(Operator.Ou),
      blocMotsDuTitre: new BlocMotDuTitre(Operator.Ou),
      blocEditeur: new BlocEditeur(Operator.Ou),
      blocLangue: new BlocLangue(Operator.Ou),
      blocPays: new BlocPays(Operator.Ou),
      blocPcpRcr: new BlocPcpRcr(Operator.Ou),
      blocRequeteDirecte: new BlocRequeteEnregistree(),
      //Resultats de recherche
      lotNotices: new LotNotices(),
      lotFacettes: new LotFacettes(),
      filtresFacettes: new FiltresFacettes(),
      // Visualisation
      lotHoldings: new LotHoldings(),
      //Composants
      composants: new Composants(),
      //Méthodes pour construire JSON à envoyer au back-end
      jsonTraitements: new SearchRequest(),
      //Bloc de tri multiples
      blocTri: new BlocTri(),
      //Arbre de RCR
      tree: new Array<string>(),
      pagination: new Pagination(),
   },
   mutations: {
      //Bloc de recherche PcpRegions
      mutationExternalPcpRegionsOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pcp Regions');
         state.blocPcpRegions._externalBlocOperator = operator;
      },
      resetExternalPcpRegionsOperator(state) {
         Logger.debug('Reset Operateur externe des Pcp Regions');
         state.blocPcpRegions._externalBlocOperator = Operator.Ou;
      },
      mutationInternalPcpRegionsOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pcp Regions');
         state.blocPcpRegions._internalBlocOperator = operator;
      },
      resetInternalPcpRegionsOperator(state) {
         Logger.debug('Reset Operateur interne des Pcp Regions');
         state.blocPcpRegions._internalBlocOperator = Operator.Et;
      },
      mutationPcpRegions(state, arraySent: Array<CheckboxItem>) {
         Logger.debug('Mutation des Pcp Regions');
         state.blocPcpRegions._candidates = arraySent;
         state.blocPcpRegions._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpRegions._selected.push(element.key) : ''));
      },
      loadCandidatesPcpRegions(state, force?: boolean) {
         if (force || state.blocPcpRegions._candidates.length == 0) {
            Logger.debug('Chargement des Pcp Regions');
            state.blocPcpRegions._candidates = [];
            pcpRegions.forEach((element, index) =>
               state.blocPcpRegions._candidates.push({
                  id: index,
                  key: element.key,
                  text: element.text,
                  value: false,
               }),
            );
         }
      },
      resetPcpRegions(state) {
         Logger.debug('Reset des Pcp Regions');
         state.blocPcpRegions._selected = [];
         state.blocPcpRegions._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche PcpMetiers
      mutationExternalPcpMetiersOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pcp Metiers');
         state.blocPcpMetiers._externalBlocOperator = operator;
      },
      resetExternalPcpMetiersOperator(state) {
         Logger.debug('Reset Operateur externe des Pcp Metiers');
         state.blocPcpMetiers._externalBlocOperator = Operator.Ou;
      },
      mutationInternalPcpMetiersOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pcp Metiers');
         state.blocPcpMetiers._internalBlocOperator = operator;
      },
      resetInternalPcpMetiersOperator(state) {
         Logger.debug('Reset Operateur interne des Pcp Metiers');
         state.blocPcpMetiers._internalBlocOperator = Operator.Et;
      },
      mutationPcpMetiers(state, arraySent: Array<CheckboxItem>) {
         Logger.debug('Mutation des Pcp Metiers');
         state.blocPcpMetiers._candidates = arraySent;
         state.blocPcpMetiers._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpMetiers._selected.push(element.key) : ''));
      },
      loadCandidatesPcpMetiers(state, force?: boolean) {
         if (force || state.blocPcpMetiers._candidates.length == 0) {
            Logger.debug('Chargement des Pcp Metiers');
            state.blocPcpMetiers._candidates = [];
            pcpMetiers.forEach((element, index) =>
               state.blocPcpMetiers._candidates.push({
                  id: index,
                  key: element.key,
                  text: element.text,
                  value: false,
               }),
            );
         }
      },
      resetPcpMetiers(state) {
         Logger.debug('Reset des Pcp Metiers');
         state.blocPcpMetiers._selected = [];
         state.blocPcpMetiers._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche Rcr
      mutationExternalRcrOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Rcr');
         state.blocRcr._externalBlocOperator = operator;
      },
      resetExternalRcrOperator(state) {
         Logger.debug('Reset Operateur externe des Rcr');
         state.blocRcr._externalBlocOperator = Operator.Ou;
      },
      mutationInternalRcrOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Rcr');
         state.blocRcr._internalBlocOperator = operator;
      },
      resetInternalRcrOperator(state) {
         Logger.debug('Reset Operateur interne des Rcr');
         state.blocRcr._internalBlocOperator = Operator.Et;
      },
      mutationRcr(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Rcr');
         state.blocRcr._selected = arraySent;
      },
      resetRcr(state) {
         Logger.debug('Reset des Rcr');
         state.blocRcr._selected = [];
      },

      //Bloc de recherche Ppn
      mutationExternalPpnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Ppn');
         state.blocPpn._externalBlocOperator = operator;
      },
      resetExternalPpnOperator(state) {
         Logger.debug('Reset Operateur externe des Ppn');
         state.blocPpn._externalBlocOperator = Operator.Ou;
      },
      mutationInternalPpnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Ppn');
         state.blocPpn._internalBlocOperator = operator;
      },
      resetInternalPpnOperator(state) {
         Logger.debug('Reset Operateur interne des Ppn');
         state.blocPpn._internalBlocOperator = Operator.Et;
      },
      mutationPpn(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Ppn');
         state.blocPpn._selected = arraySent;
      },
      resetPpn(state) {
         Logger.debug('Reset des Ppn');
         state.blocPpn._selected = [];
      },

      //Bloc de recherche Issn
      mutationExternalIssnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Issn');
         state.blocIssn._externalBlocOperator = operator;
      },
      resetExternalIssnOperator(state) {
         Logger.debug('Reset Operateur externe des Issn');
         state.blocIssn._externalBlocOperator = Operator.Ou;
      },
      mutationInternalIssnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Issn');
         state.blocIssn._internalBlocOperator = operator;
      },
      resetInternalIssnOperator(state) {
         Logger.debug('Reset Operateur interne des Issn');
         state.blocIssn._internalBlocOperator = Operator.Et;
      },
      mutationIssn(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Issn');
         state.blocIssn._selected = arraySent;
      },
      resetIssn(state) {
         Logger.debug('Reset des Issn');
         state.blocIssn._selected = [];
      },

      //Bloc de recherche Mots du titre
      mutationExternalMotsDuTitreOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Mots du titre');
         state.blocMotsDuTitre._externalBlocOperator = operator;
      },
      resetExternalMotsDuTitreOperator(state) {
         Logger.debug('Reset Operateur externe des Mots du titre');
         state.blocMotsDuTitre._externalBlocOperator = Operator.Ou;
      },
      mutationInternalMotsDuTitreOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Mots du titre');
         state.blocMotsDuTitre._internalBlocOperator = operator;
      },
      resetInternalMotsDuTitreOperator(state) {
         Logger.debug('Reset Operateur interne des Mots du titre');
         state.blocMotsDuTitre._internalBlocOperator = Operator.Et;
      },
      mutationMotsDuTitre(state, stringEntered: string) {
         Logger.debug('Mutation des Mots du titre');
         state.blocMotsDuTitre._selected = [];
         if (stringEntered === '') {
            state.blocMotsDuTitre._selected = [];
         } else {
            stringEntered.split(' ').forEach((element: string) => {
               state.blocMotsDuTitre._selected.push(String(element));
            });
         }
      },
      resetMotsDuTitre(state) {
         Logger.debug('Reset des Mots du titre');
         state.blocMotsDuTitre._selected = [];
      },

      //Bloc de recherche Editeur
      mutationExternalEditeurOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Editeurs');
         state.blocEditeur._externalBlocOperator = operator;
      },
      resetExternalEditeurOperator(state) {
         Logger.debug('Reset Operateur externe des Editeurs');
         state.blocEditeur._externalBlocOperator = Operator.Ou;
      },
      mutationInternalEditeurOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Editeurs');
         state.blocEditeur._internalBlocOperator = operator;
      },
      resetInternalEditeurOperator(state) {
         Logger.debug('Reset Operateur interne des Editeurs');
         state.blocEditeur._internalBlocOperator = Operator.Et;
      },
      mutationEditeur(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Editeurs');
         state.blocEditeur._selected = arraySent;
      },
      resetEditeur(state) {
         Logger.debug('Reset des Editeurs');
         state.blocEditeur._selected = [];
      },

      //Bloc de recherche Langue
      mutationExternalLangueOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Langues');
         state.blocLangue._externalBlocOperator = operator;
      },
      resetExternalLangueOperator(state) {
         Logger.debug('Reset Operateur externe des Langues');
         state.blocLangue._externalBlocOperator = Operator.Ou;
      },
      mutationInternalLangueOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Langues');
         state.blocLangue._internalBlocOperator = operator;
      },
      resetInternalLangueOperator(state) {
         Logger.debug('Reset Operateur interne des Langues');
         state.blocLangue._internalBlocOperator = Operator.Et;
      },
      mutationLangue(state, arraySent: Array<ListItem>) {
         Logger.debug('Mutation des Langues');
         state.blocLangue._candidates = arraySent;
         state.blocLangue._selected = [];
         arraySent.forEach((element: {value: boolean; id: string}) => (element.value ? state.blocLangue._selected.push(element.id) : ''));
      },
      loadCandidatesLangue(state, force?: boolean) {
         if (force || state.blocLangue._candidates.length == 0) {
            Logger.debug('Chargement des Langues');
            state.blocLangue._candidates = langues;
         }
      },
      resetLangue(state) {
         Logger.debug('Reset des Langues');
         state.blocLangue._selected = [];
         state.blocLangue._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche Pays
      mutationExternalPaysOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pays');
         state.blocPays._externalBlocOperator = operator;
      },
      resetExternalPaysOperator(state) {
         Logger.debug('Reset Operateur externe des Pays');
         state.blocPays._externalBlocOperator = Operator.Ou;
      },
      mutationInternalPaysOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pays');
         state.blocPays._internalBlocOperator = operator;
      },
      resetInternalPaysOperator(state) {
         Logger.debug('Reset Operateur interne des Pays');
         state.blocPays._internalBlocOperator = Operator.Et;
      },
      mutationPays(state, arraySent: Array<ListItem>) {
         Logger.debug('Mutation des Pays');
         state.blocPays._candidates = arraySent;
         state.blocPays._selected = [];
         arraySent.forEach((element: {value: boolean; id: string}) => (element.value ? state.blocPays._selected.push(element.id) : ''));
      },
      loadCandidatesPays(state, force?: boolean) {
         if (force || state.blocPays._candidates.length == 0) {
            Logger.debug('Chargement des Pays');
            state.blocPays._candidates = pays;
         }
      },
      resetPays(state) {
         Logger.debug('Reset des Pays');
         state.blocPays._selected = [];
         state.blocPays._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },
      //Bloc de Pcp Rcr
      mutationPcpRcrPcp(state, pcp: string) {
         Logger.debug('Mutation des Pcp : ' + pcp);
         state.blocPcpRcr._pcp = pcp;
      },
      mutationPcpRcrRcr(state, rcr: string) {
         Logger.debug('Mutation des Rcr : ' + rcr);
         state.blocPcpRcr._rcr = rcr;
      },
      loadCandidatesAllPcp(state, force?: boolean) {
         if (force || state.blocPcpRcr._pcpCandidates.length == 0) {
            Logger.debug('Chargement des Pcp Regions & Métiers');
            state.blocPcpRcr._pcpCandidates = [];
            pcpRegions.forEach((element) =>
               state.blocPcpRcr._pcpCandidates.push({
                  id: element.key,
                  text: element.text,
                  value: false,
               }),
            );
            pcpMetiers.forEach((element) =>
               state.blocPcpRcr._pcpCandidates.push({
                  id: element.key,
                  text: element.text,
                  value: false,
               }),
            );
         }
      },
      loadCandidatesRcr(state, force?: boolean) {
         if (force || state.blocPcpRcr._rcrCandidates.length == 0) {
            Logger.debug('Chargement des Rcr');
            state.blocPcpRcr._rcrCandidates = [];
            PcpLibProfileService.getRcrName().then((response) => {
               response.data.forEach((element: {rcr: string; label: string}) => {
                  state.blocPcpRcr._rcrCandidates.push({
                     id: element.rcr,
                     text: element.rcr + ' ' + element.label,
                     value: false,
                  });
               });
            });
         }
      },
      resetPcpRcr(state) {
         Logger.debug('Reset des Pcp et Rcr');
         state.blocPcpRcr._pcp = '';
         state.blocPcpRcr._rcr = '';
      },

      //Bloc de requete directe
      mutationRequeteDirecte(state, element: JsonGlobalSearchRequest) {
         Logger.debug('Mutation des requetes directes');
         state.blocRequeteDirecte._directRequest = element;
      },
      addRequeteDirecteToHistory(state, element: JsonGlobalSearchRequest) {
         Logger.debug("Ajout requete dans l'historique");
         state.blocRequeteDirecte._historyOfAllRequests.push(element);
      },
      resetRequeteDirecte(state) {
         Logger.debug('Reset des requetes directes');
         state.blocRequeteDirecte._directRequest = {criteres: [], tri: [], facettes: [], filtresFacettes: []};
      },
      resetRequeteHistory(state) {
         Logger.debug("Reset de l'historique");
         state.blocRequeteDirecte._historyOfAllRequests = [];
      },

      mutationSearchRequest(state) {
         Logger.debug('Construction de la requête JSON');
         state.jsonTraitements._jsonSearchRequest = SearchRequest.constructJsonGlobalRequest(
            state.composants._panel,
            state.blocPcpRegions,
            state.blocPcpMetiers,
            state.blocRcr,
            state.blocPpn,
            state.blocIssn,
            state.blocMotsDuTitre,
            state.blocEditeur,
            state.blocLangue,
            state.blocPays,
            state.blocPcpRcr,
            state.blocRequeteDirecte,
            state.blocTri,
            state.filtresFacettes,
         );
      },

      //Tri multiples sur le tableau de résultats
      mutationTri(state, value: Array<TriDefinition>) {
         Logger.debug('Mutation des tris');
         state.blocTri._array = value;
      },
      resetTri(state) {
         Logger.debug('Reset des tris');
         state.blocTri._array = [];
      },

      //Actions liées aux composants
      mutationStep(state, stepSent: number) {
         state.composants._stepperCurrentValue = stepSent;
      },
      mutationSnackBarDisplay(state, value: boolean) {
         state.composants._snackBarDisplay = value;
      },
      mutationPanelMovement(state, action: PanelMovementProvider) {
         Logger.debug('Mutation Panel Movement : ' + PanelType[action.panelId] + ' ' + Movement[action.value]);
         Composants.panelMovement(action.panelId, state.composants._panel, action.value);
      },
      mutationPanelDisplaySwitch(state, action: PanelDisplaySwitchProvider) {
         Logger.debug('Mutation Panel Display switch : ' + PanelType[action.panelId] + ' ' + DisplaySwitch[action.value]);
         Composants.switchPanelDisplay(action.panelId, state.composants._panel, action.value);
      },
      mutationPanelAvailableSwitch(state, action: PanelAvailableSwitchProvider) {
         Logger.debug('Mutation Panel Available switch : ' + PanelType[action.panelId] + ' ' + AvailableSwitch[action.value]);
         Composants.switchPanelAvailable(state.composants._panel, action.value, action.panelId === PanelType.PCPRCR);
      },
      resetSearchPanel(state, force?: boolean) {
         if (force || state.composants._panel.length == 0) {
            Logger.debug('Reset des panneaux de recherche');
            state.composants._panel = [
               {id: PanelType.PPN, position: 3, isDisplayed: false, isAvailable: true, label: 'PPN'},
               {id: PanelType.ISSN, position: 4, isDisplayed: false, isAvailable: true, label: 'ISSN'},
               {id: PanelType.RCR, position: 5, isDisplayed: false, isAvailable: true, label: 'RCR'},
               {id: PanelType.REGIONS, position: 2, isDisplayed: false, isAvailable: true, label: 'PCP Régions'},
               {id: PanelType.METIERS, position: 1, isDisplayed: false, isAvailable: true, label: 'PCP Métiers'},
               {id: PanelType.WORDS, position: 6, isDisplayed: false, isAvailable: true, label: 'Mots du Titre'},
               {id: PanelType.EDITOR, position: 7, isDisplayed: false, isAvailable: true, label: 'Editeur'},
               {id: PanelType.LANG, position: 8, isDisplayed: false, isAvailable: true, label: 'Langue'},
               {id: PanelType.COUNTRY, position: 9, isDisplayed: false, isAvailable: true, label: 'Pays'},
               {id: PanelType.PCPRCR, position: 10, isDisplayed: false, isAvailable: true, label: 'PCP & RCR (même exemplaire)'},
               {id: PanelType.HISTORY, position: 0, isDisplayed: false, isAvailable: true, label: 'Requête enregistrée'},
            ].sort((n1, n2) => {
               if (n1.position > n2.position) {
                  return 1;
               }

               if (n1.position < n2.position) {
                  return -1;
               }

               return 0;
            });
         }
      },

      //Modification de la pagination
      mutationPageSize(state, element: number) {
         Logger.debug('Mutation de la taille des pages');
         state.pagination._sizeWanted = element;
      },
      mutationCurrentPage(state, page: number) {
         Logger.debug('Mutation de la pagination');
         if (page <= -1) {
            state.pagination._currentPage = 0;
            state.pagination._previousPage = -1;
            state.pagination._nextPage = 1;
         } else {
            state.pagination._currentPage = page;
            state.pagination._previousPage = state.pagination._currentPage - 1;
            state.pagination._nextPage = state.pagination._currentPage + 1;
         }
      },
      mutationMaxPage(state, element: number) {
         Logger.debug('Mutation maximum page');
         state.pagination._maxPage = element;
      },
      resetPage(state) {
         Logger.debug('Reset de la pagination');
         state.pagination._currentPage = 0;
         state.pagination._previousPage = -1;
         state.pagination._nextPage = 1;
      },

      // Notices
      mutationNotices(state, lotNoticesReceived) {
         Logger.debug('Mutation des Notices');
         lotNoticesReceived.forEach((obj: any) => state.lotNotices._notices.push(new Notice(obj)));
      },
      mutationMaxNotice(state, element: number) {
         Logger.debug('Mutation maximum notice');
         state.lotNotices._maxNotice = element;
      },
      resetNotices(state) {
         Logger.debug('Reset des Notices');
         state.lotNotices._notices = [];
      },

      // Facettes
      mutationFacettes(state, values) {
         Logger.debug('Mutation des Facettes');
         values.forEach((obj: any) => state.lotFacettes._facettes.push(new Facet(obj)));
      },
      resetFacettes(state) {
         Logger.debug('Reset des Facettes');
         state.lotFacettes._facettes = [];
      },
      mutationExecutionTime(state, element: number) {
         Logger.debug('Mutation temps de requête');
         state.lotNotices._executionTime = element;
      },

      // Holdings
      mutationHoldings(state, values) {
         Logger.debug('Mutation des Etats de collection');
         values.forEach((obj: any) => state.lotHoldings._holdings.push(new Holding(obj)));
      },
      resetHoldings(state) {
         Logger.debug('Reset des Etats de collection');
         state.lotHoldings._holdings = [];
      },
      mutationCurrentPpn(state, value) {
         Logger.debug('Mutation du Ppn courant');
         state.lotHoldings._ppn = value;
      },
      resetCurrentPpn(state) {
         Logger.debug('Reset du Ppn courant');
         state.lotHoldings._ppn = 'unset';
      },
      mutationTypeSequence(state, value) {
         Logger.debug('Mutation du type de sequence');
         state.lotHoldings._typeSequence = value;
      },
      resetTypeSequence(state) {
         Logger.debug('Reset du type de sequence');
         state.lotHoldings._typeSequence = 'unset';
      },
      mutationCurrentRcr(state, value) {
         Logger.debug('Mutation des RCR courant');
         state.lotHoldings._rcrList = value;
      },
      resetCurrentRcr(state) {
         Logger.debug('Reset des RCR courant');
         state.lotHoldings._rcrList = [];
      },
      mutationCurrentFacets(state, value) {
         //TODO faire un refactor passer le tableau en objet, rendre genei
         Logger.debug('Mutation des facettes courantes');
         if (value[0] == 'document_type') {
            if (state.filtresFacettes._filters[0].valeurs.includes(value[1])) {
               const index = state.filtresFacettes._filters[0].valeurs.indexOf(value[1]);
               state.filtresFacettes._filters[0].valeurs.splice(index, 1); // 2nd parameter means remove one item only
            } else {
               state.filtresFacettes._filters[0].valeurs.push(value[1]);
            }
         } else if (value[0] == 'support_type') {
            if (state.filtresFacettes._filters[1].valeurs.includes(value[1])) {
               const index = state.filtresFacettes._filters[1].valeurs.indexOf(value[1]);
               state.filtresFacettes._filters[1].valeurs.splice(index, 1); // 2nd parameter means remove one item only
            } else {
               state.filtresFacettes._filters[1].valeurs.push(value[1]);
            }
         } else if (value[0] == 'country') {
            if (state.filtresFacettes._filters[2].valeurs.includes(value[1])) {
               const index = state.filtresFacettes._filters[2].valeurs.indexOf(value[1]);
               state.filtresFacettes._filters[2].valeurs.splice(index, 1); // 2nd parameter means remove one item only
            } else {
               state.filtresFacettes._filters[2].valeurs.push(value[1]);
            }
         } else if (value[0] == 'language') {
            if (state.filtresFacettes._filters[3].valeurs.includes(value[1])) {
               const index = state.filtresFacettes._filters[3].valeurs.indexOf(value[1]);
               state.filtresFacettes._filters[3].valeurs.splice(index, 1); // 2nd parameter means remove one item only
            } else {
               state.filtresFacettes._filters[3].valeurs.push(value[1]);
            }
         }
      },
      mutationTreeBlocEnParam(state, value) {
         Logger.debug("Mutation des RCR de l'arbre");
         value.forEach((el: string) => {
            state.tree.push(el);
         });
      },
      resetTree(state) {
         Logger.debug("Reset de l'arbre RCR");
         state.tree = [];
      },
   },
   actions: {
      //******************
      //       Reset
      //*******************
      resetBlocPcpRegions(context) {
         context.commit('resetExternalPcpRegionsOperator');
         context.commit('resetInternalPcpRegionsOperator');
         context.commit('resetPcpRegions');
      },
      resetBlocPcpMetiers(context) {
         context.commit('resetExternalPcpMetiersOperator');
         context.commit('resetInternalPcpMetiersOperator');
         context.commit('resetPcpMetiers');
      },
      resetBlocRcr(context) {
         context.commit('resetExternalRcrOperator');
         context.commit('resetInternalRcrOperator');
         context.commit('resetRcr');
      },
      resetBlocPpn(context) {
         context.commit('resetExternalPpnOperator');
         context.commit('resetInternalPpnOperator');
         context.commit('resetPpn');
      },
      resetBlocIssn(context) {
         context.commit('resetExternalIssnOperator');
         context.commit('resetInternalIssnOperator');
         context.commit('resetIssn');
      },
      resetBlocMotDuTitre(context) {
         context.commit('resetExternalMotsDuTitreOperator');
         context.commit('resetInternalMotsDuTitreOperator');
         context.commit('resetMotsDuTitre');
      },
      resetBlocEditeur(context) {
         context.commit('resetExternalEditeurOperator');
         context.commit('resetInternalEditeurOperator');
         context.commit('resetEditeur');
      },
      resetBlocLangue(context) {
         context.commit('resetExternalLangueOperator');
         context.commit('resetInternalLangueOperator');
         context.commit('resetLangue');
      },
      resetBlocPays(context) {
         context.commit('resetExternalPaysOperator');
         context.commit('resetInternalPaysOperator');
         context.commit('resetPays');
      },
      resetBlocPcpRcr(context) {
         context.commit('resetPcpRcr');
      },
      resetBlocRequeteDirecte(context) {
         context.commit('resetRequeteDirecte');
      },
      resetAllBlocs() {
         this.dispatch('resetBlocPcpRegions').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPcpMetiers').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocRcr').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPpn').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocIssn').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocMotDuTitre').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocEditeur').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocLangue').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPays').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPcpRcr').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocRequeteDirecte').catch((err) => {
            Logger.error(err);
         });
      },
      resetPage(context) {
         context.commit('resetPage');
      },
      resetNotices(context) {
         context.commit('resetNotices');
      },
      resetFacettes(context) {
         context.commit('resetFacettes');
      },
      resetSearchPanel(context, force?: boolean) {
         context.commit('resetSearchPanel', force);
      },
      resetTri(context) {
         context.commit('resetTri');
      },
      resetRequeteHistory(context) {
         context.commit('resetRequeteHistory');
      },
      resetTree(context) {
         context.commit('resetTree');
      },

      //******************
      //       Update
      //*******************
      updateSelectedExternalPcpRegionsOperator(context, operator: number) {
         context.commit('mutationExternalPcpRegionsOperator', operator);
      },
      updateSelectedInternalPcpRegionsOperator(context, operator: number) {
         context.commit('mutationInternalPcpRegionsOperator', operator);
      },
      updateCandidatesPcpRegions(context, arraySent: Array<CheckboxItem>) {
         context.commit('mutationPcpRegions', arraySent);
      },
      updateSelectedPcpRegions(context, arraySent: Array<string>) {
         context.commit('mutationPcpRegions', arraySent);
      },
      updateSelectedExternalPcpMetiersOperator(context, operator: number) {
         context.commit('mutationExternalPcpMetiersOperator', operator);
      },
      updateSelectedInternalPcpMetiersOperator(context, operator: number) {
         context.commit('mutationInternalPcpMetiersOperator', operator);
      },
      updateCandidatesPcpMetiers(context, arraySent: Array<CheckboxItem>) {
         context.commit('mutationPcpMetiers', arraySent);
      },
      updateSelectedPcpMetiers(context, arraySent: Array<CheckboxItem>) {
         context.commit('mutationPcpMetiers', arraySent);
      },
      updateSelectedExternalRcrOperator(context, operator: number) {
         context.commit('mutationExternalRcrOperator', operator);
      },
      updateSelectedInternalRcrOperator(context, operator: number) {
         context.commit('mutationInternalRcrOperator', operator);
      },
      updateSelectedRcr(context, arraySent: Array<string>) {
         context.commit('mutationRcr', arraySent);
      },
      updateSelectedExternalPpnOperator(context, operator: number) {
         context.commit('mutationExternalPpnOperator', operator);
      },
      updateSelectedInternalPpnOperator(context, operator: number) {
         context.commit('mutationInternalPpnOperator', operator);
      },
      updateSelectedPpn(context, arraySent: Array<string>) {
         context.commit('mutationPpn', arraySent);
      },
      updateSelectedExternalIssnOperator(context, operator: number) {
         context.commit('mutationExternalIssnOperator', operator);
      },
      updateSelectedInternalIssnOperator(context, operator: number) {
         context.commit('mutationInternalIssnOperator', operator);
      },
      updateSelectedIssn(context, arraySent: Array<string>) {
         context.commit('mutationIssn', arraySent);
      },
      updateSelectedMotsDuTitre(context, stringEntered: string) {
         context.commit('mutationMotsDuTitre', stringEntered);
      },
      updateSelectedExternalMotsDuTitreOperator(context, externalOperator: number) {
         context.commit('mutationExternalMotsDuTitreOperator', externalOperator);
      },
      updateSelectedInternalMotsDuTitreOperator(context, internalOperator: number) {
         context.commit('mutationInternalMotsDuTitreOperator', internalOperator);
      },
      updateSelectedExternalEditeurOperator(context, externalOperator: number) {
         context.commit('mutationExternalEditeurOperator', externalOperator);
      },
      updateSelectedInternalEditeurOperator(context, internalOperator: number) {
         context.commit('mutationInternalEditeurOperator', internalOperator);
      },
      updateSelectedEditeur(context, arraySent: Array<string>) {
         context.commit('mutationEditeur', arraySent);
      },
      updateSelectedExternalLangueOperator(context, externalOperator: number) {
         context.commit('mutationExternalLangueOperator', externalOperator);
      },
      updateSelectedInternalLangueOperator(context, internalOperator: number) {
         context.commit('mutationInternalLangueOperator', internalOperator);
      },
      updateSelectedLangue(context, arraySent: Array<ListItem>) {
         context.commit('mutationLangue', arraySent);
      },
      updateSelectedExternalPaysOperator(context, externalOperator: number) {
         context.commit('mutationExternalPaysOperator', externalOperator);
      },
      updateSelectedInternalPaysOperator(context, internalOperator: number) {
         context.commit('mutationInternalPaysOperator', internalOperator);
      },
      updateSelectedPays(context, arraySent: Array<ListItem>) {
         context.commit('mutationPays', arraySent);
      },
      updateSelectedPcpRcrPcp(context, pcp: string) {
         context.commit('mutationPcpRcrPcp', pcp);
      },
      updateSelectedPcpRcrRcr(context, rcr: string) {
         context.commit('mutationPcpRcrRcr', rcr);
      },
      updateSelectedRequeteDirecte(context, value: string): Promise<boolean> {
         return new Promise((resolve, reject) => {
            const returnMsg: string = SearchRequest.checkJsonIntegrity(value);

            if (returnMsg) {
               const json: JsonGlobalSearchRequest = JSON.parse(value);
               context.commit('mutationRequeteDirecte', json);

               if (json.tri) {
                  //Conversion des critères de tri dans le bloc de tri
                  const arrayTriStore: Array<TriDefinition> = [];
                  for (let i = 0; i < json.tri.length; i++) {
                     const tri: TriDefinition = {
                        sort: SearchRequest.convertLabeltoTri(json.tri[i].sort),
                        order: !json.tri[i].order ? OrderType.ASC : OrderType.DESC,
                     };
                     arrayTriStore.push(tri);
                  }
                  context.commit('mutationTri', arrayTriStore);
               }

               resolve(true);
            } else {
               reject(returnMsg);
            }
         });
      },
      addRequeteHistory(context, element: JsonGlobalSearchRequest) {
         context.commit('addRequeteDirecteToHistory', element);
      },
      updateSelectedTri(context, value: Array<string>) {
         context.commit('mutationTri', value);
      },
      updateCurrentPpn(context, value: string) {
         context.commit('mutationCurrentPpn', value);
      },
      updateTypeSequence(context, value: string) {
         context.commit('mutationTypeSequence', value);
      },
      updateCurrentRcr(context, value: Array<string>) {
         context.commit('mutationCurrentRcr', value);
      },
      updateCurrentFacets(context, value: Array<string>) {
         context.commit('mutationCurrentFacets', value);
      },

      //*******************
      //       Composants
      //*******************
      changeStepAction(context, stepSent: number) {
         context.commit('mutationStep', stepSent);
      },
      openInfoSnackBar(context, value: string) {
         context.state.composants._snackBarText = value;
         context.state.composants._snackBarDisplay = true;
         context.state.composants._snackBarSticky = false;
         context.state.composants._snackBarColor = 'info';
      },
      openStickyInfoSnackBar(context, value: string) {
         context.state.composants._snackBarText = value;
         context.state.composants._snackBarDisplay = true;
         context.state.composants._snackBarSticky = true;
         context.state.composants._snackBarColor = 'info';
      },
      openErrorSnackBar(context, value: string) {
         context.state.composants._snackBarText = value;
         context.state.composants._snackBarDisplay = true;
         context.state.composants._snackBarSticky = true;
         context.state.composants._snackBarColor = 'error';
      },
      updateSnackBarDisplay(context, value: boolean) {
         context.commit('mutationSnackBarDisplay', value);
      },
      moveElementPanel(context, value: PanelMovementProvider) {
         context.commit('mutationPanelMovement', value);
      },
      switchElementPanel(context, value: PanelDisplaySwitchProvider) {
         context.commit('mutationPanelDisplaySwitch', value);
      },
      switchElementAvailablePanel(context, value: PanelAvailableSwitchProvider) {
         context.commit('mutationPanelAvailableSwitch', value);
      },

      //*******************
      //       Page
      //*******************
      updatePageSize(context, nbElements: number) {
         context.commit('mutationPageSize', nbElements);
      },
      nextPage(context) {
         context.commit('mutationCurrentPage', context.state.pagination._nextPage);
      },
      previousPage(context) {
         context.commit('mutationCurrentPage', context.state.pagination._previousPage);
      },

      //******************
      //       API
      //*******************
      loadCandidatesValue(context, force?: boolean) {
         context.commit('loadCandidatesPcpMetiers', force);
         context.commit('loadCandidatesPcpRegions', force);
         context.commit('loadCandidatesAllPcp', force);
         context.commit('loadCandidatesRcr', force);
         context.commit('loadCandidatesLangue', force);
         context.commit('loadCandidatesPays', force);
      },
      constructJsonAction(context): Promise<boolean> {
         return new Promise((resolve, reject) => {
            try {
               context.commit('mutationSearchRequest');
               resolve(true);
            } catch (err: any) {
               reject(err.message);
            }
         });
      },
      callPeriscopeAPI(context): Promise<boolean> {
         Logger.debug('PAGE:' + context.state.pagination._currentPage + '|SIZE:' + context.state.pagination._sizeWanted + '|REQUEST:' + JSON.stringify(context.state.jsonTraitements._jsonSearchRequest));

         //On place dans l'historique la requête qui va être envoyée au back-end
         this.dispatch('addRequeteHistory', context.state.jsonTraitements._jsonSearchRequest).catch((err) => {
            Logger.error(err);
         });
         return new Promise((resolve, reject) => {
            //On envoie la requête au back-end
            const start = Date.now();
            PeriscopeApiAxios.findNoticeWithFacetsByCriteriaByPageAndSize(context.state.jsonTraitements._jsonSearchRequest, context.state.pagination._currentPage, context.state.pagination._sizeWanted)
               .then((res) => {
                  const response: APISearchResponse = (res as unknown) as APISearchResponse;
                  console.log(JSON.stringify(response.facettes));
                  context.commit('resetNotices');
                  context.commit('mutationNotices', response.notice);
                  context.commit('resetFacettes');
                  context.commit('mutationFacettes', response.facettes);
                  context.commit('mutationMaxPage', response.nbPages);
                  context.commit('mutationMaxNotice', response.nbNotices);
                  const millis = Date.now() - start;
                  context.commit('mutationExecutionTime', Math.floor(millis / 1000));

                  resolve(true);
               })
               .catch((err) => {
                  //Si une erreur avec le ws est jetée, on lève un message d'erreur
                  reject(err);
               });
         });
      },
      callPCP2RCRApi(context): Promise<boolean> {
         Logger.debug('Appel de PCP2RCR');
         return new Promise((resolve, reject) => {
            try {
               if (context.state.blocPcpRcr._pcp !== undefined) {
                  const rcrListResults: Array<string> = [];
                  PeriscopeApiAxios.findRcrByPcp(context.state.blocPcpRcr._pcp).then((result) => {
                     for (let i = 0; i < result.data.sudoc.length; i++) {
                        const level1 = result.data.sudoc[i];
                        for (let j = 0; j < level1.query.result.length; j++) {
                           const level2 = level1.query.result[j];
                           rcrListResults.push(level2.library.rcr);
                        }
                     }
                  });
                  resolve(true);
               } else {
                  //PeriscopeApiAxios.findRcrByPcp(context.state.blocPcpRegions._selected.concat(context.state.blocPcpMetiers._selected));
               }
            } catch (err: any) {
               reject(err.message);
            }
         });
      },
      feedTree(): Promise<boolean> {
         return new Promise((resolve, reject) => {
            try {
               this.dispatch('getRcrCriteria');
               this.dispatch('getPcpCriteria');
            } catch (err: any) {
               reject(err.message);
            }
         });
      },
      getRcrCriteria(context): Promise<boolean> {
         return new Promise((resolve, reject) => {
            try {
               if (context.state.blocRcr._selected.length != 0) {
                  context.commit('mutationTreeBlocEnParam', context.state.blocRcr._selected);
               } else {
                  context.commit('mutationTreeBlocEnParam', [context.state.blocPcpRcr._rcr]);
               }
               console.log(JSON.stringify(context.state.tree));
            } catch (err: any) {
               reject(err.message);
            }
         });
      },
      getPcpCriteria(context): Promise<boolean> {
         return new Promise((resolve, reject) => {
            this.dispatch('callPCP2RCRApi')
               .then(() => {
                  resolve(true);
               })
               .catch((err) => {
                  reject(err);
               });
         });
      },
      doSearch(): Promise<boolean> {
         return new Promise((resolve, reject) => {
            this.dispatch('constructJsonAction')
               .then(() => {
                  this.dispatch('resetPage').catch((err) => {
                     reject(err);
                  });
                  this.dispatch('callPeriscopeAPI')
                     .then(() => {
                        if (this.state.lotNotices._maxNotice === 1) {
                           this.dispatch('doVisualisationWithHoldingsV1');
                           this.dispatch('updateSnackBarDisplay', false);
                           resolve(true);
                        } else {
                           this.dispatch('updateSnackBarDisplay', false);
                           router
                              .push('/Resultat')
                              .then(() => {
                                 resolve(true);
                              })
                              .catch((err) => {
                                 if (err.name == 'NavigationDuplicated') {
                                    // On ignore cette erreur
                                    resolve(true);
                                 } else {
                                    reject(err);
                                 }
                              });
                        }
                     })
                     .catch((err) => {
                        reject(err);
                     });
               })
               .catch((err) => {
                  reject(err);
               });
         });
      },
      //Ne pas supprimer cette méthode, peut servir pour utiliser Holdings V2 pour périscope V3
      doVisualisationWithHoldingsV2(context): Promise<boolean> {
         return new Promise((resolve, reject) => {
            //On envoie la requête au back-end
            PeriscopeApiAxios.getHoldingsFromPpn(context.state.lotHoldings._ppn)
               .then((res) => {
                  const response: APIHoldingsResponse = (res as unknown) as APIHoldingsResponse;
                  context.commit('resetHoldings');
                  context.commit('mutationHoldings', response.holdings);
                  this.dispatch('updateSnackBarDisplay', false);
                  router
                     .push('/visualisation')
                     .then(() => {
                        resolve(true);
                     })
                     .catch((err) => {
                        if (err.name == 'NavigationDuplicated') {
                           // On ignore cette erreur
                           resolve(true);
                        } else {
                           reject(err);
                        }
                     });
               })
               .catch((err) => {
                  //Si une erreur avec le ws est jetée, on lève un message d'erreur
                  reject(err);
               });
         });
      },
      doVisualisationWithHoldingsV1(): Promise<boolean> {
         return new Promise((resolve, reject) => {
            router
               .push('/Visualisation')
               .then(() => {
                  resolve(true);
               })
               .catch((err) => {
                  if (err.name == 'NavigationDuplicated') {
                     // On ignore cette erreur
                     resolve(true);
                  } else {
                     reject(err);
                  }
               });
         });
      },
      resetSearchForm(context, force?: boolean) {
         this.dispatch('resetAllBlocs').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetSearchPanel', force).catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetTri').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetFacettes').catch((err) => {
            Logger.error(err);
         });
      },

      //******************
      //       Debug
      //*******************
      displayStore() {
         Logger.debug(JSON.stringify(this.state));
      },
   },
   getters: {
      getMaxNotices: (state) => {
         return state.lotNotices._maxNotice;
      },
      isSelectionEmpty: (state) => {
         return (
            state.blocPays._selected.length == 0 &&
            state.blocLangue._selected.length == 0 &&
            state.blocPcpRegions._selected.length == 0 &&
            state.blocEditeur._selected.length == 0 &&
            state.blocPcpMetiers._selected.length == 0 &&
            state.blocIssn._selected.length == 0 &&
            state.blocRcr._selected.length == 0 &&
            state.blocMotsDuTitre._selected.length == 0 &&
            state.blocPpn._selected.length == 0 &&
            (state.blocPcpRcr._pcp === '' || typeof state.blocPcpRcr._pcp === 'undefined' || state.blocPcpRcr._rcr === '' || typeof state.blocPcpRcr._rcr === 'undefined') &&
            state.blocRequeteDirecte._directRequest.criteres.length == 0
         );
      },
      isFirstDisplayedElement: (state) => (id: PanelType) => {
         return Composants.isFirstDisplayedElement(id, state.composants._panel);
      },
      isLastDisplayedElement: (state) => (id: PanelType) => {
         return Composants.isLastDisplayedElement(id, state.composants._panel);
      },
      isMoveUpAvailable: (state) => (id: PanelType) => {
         return Composants.isMoveUpAvailable(id, state.composants._panel);
      },
      isFirstPage: (state) => () => {
         if (state.pagination._currentPage == 0) {
            return true;
         } else {
            return false;
         }
         return false;
      },
      isLastPage: (state) => () => {
         if (state.pagination._currentPage == state.pagination._maxPage - 1 || state.pagination._maxPage == 0) {
            return true;
         } else {
            return false;
         }
         return false;
      },
      orderSortArrayResultLabelElements: (state) => {
         return BlocTri.getTriLabels(state.blocTri);
      },
      orderSortArrayResultBooleanElements: (state) => {
         return BlocTri.getTriOrderBooleans(state.blocTri);
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
         const arrayReturned: Array<string> = [];
         state.blocPcpMetiers._candidates.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },

      getLotHoldings: (state) => {
         return state.lotHoldings;
      },
   },
   plugins: [createPersistedState()],
});
