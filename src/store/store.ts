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
      //Composants
      composants: new Composants(),
      //Méthodes pour construire JSON à envoyer au back-end
      jsonTraitements: new JsonTraitements(),
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

      //Bloc de recherche Editeur
      blocEditeurExternalOperatorMutation(state, externalOperator: number) {
         state.blocEditeur._externalBlocOperator = externalOperator;
      },
      blocEditeurEditorEnteredMutation(state, arraySent: Array<string>) {
         state.blocEditeur._editorsEntered = arraySent;
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
      },

      //Construction de l'objet JSON contenant les critères de recherche à envoyer dans les requêtes
      jsonSearchRequestConstructionMutation(state) {
         state.jsonTraitements._jsonSearchRequest = JsonTraitements.constructJsonGlobalRequest(state.blocPcpRegions, state.blocPcpMetiers, state.blocRcr, state.blocPpn, state.blocIssn, state.blocMotsDuTitre, state.blocEditeur, state.blocLangue, state.blocPays);
      },

      //Récupération des notices par critères et effacement des notices précédentes dans le store
      async pushNoticesAndErasePreviousNoticesMutation(state) {
         state.lotNotices._lotNotices = [];
         state.lotNotices._resultArrayContentNotices = [];
         const lotNoticesReceived = await AxiosTraitements.findNoticeByCriteria(state.jsonTraitements._jsonSearchRequest);

         if (lotNoticesReceived.length === 1) {
            state.composants._snackBarText = JSON.stringify(lotNoticesReceived[0]);
            state.composants._snackBarDisplay = true;
         } else {
            lotNoticesReceived.forEach((obj) => state.lotNotices._lotNotices.push(new Notice(obj)));
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

            await router.push('Resultats');
         }
      },

      //Récupération des notices par critères et ajout aux notices précédentes dans le store
      async pushNoticesAndAddToPreviousNotices(state) {
         const lotNoticesReceived = await AxiosTraitements.findNoticeByCriteria(state.jsonTraitements._jsonSearchRequest);
         if (lotNoticesReceived.length === 1) {
            state.composants._snackBarText = JSON.stringify(lotNoticesReceived[0]);
            state.composants._snackBarDisplay = true;
         } else {
            lotNoticesReceived.forEach((obj) => state.lotNotices._lotNotices.push(new Notice(obj)));
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

            await router.push('Resultats');
         }
      },

      //Effacement des notices stockées dans le store
      eraseAllNotices(state) {
         state.lotNotices._lotNotices = [];
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

      //Bloc de recherche editeur
      blocEditeurExternalOperatorAction(context, externalOperator: number) {
         context.commit('blocEditeurExternalOperatorMutation', externalOperator);
      },
      blocEditeurEditorEnteredAction(context, arraySent: Array<string>) {
         context.commit('blocEditeurEditorEnteredMutation', arraySent);
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

      //Reinitialisation ensemble des blocs de recherche
      resetAllBlocsAction(context) {
         context.commit('resetAllBlocsMutation');
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
   },
   getters: {
      isFirstElement: (state) => (text: string) => {
         return Composants.isFirstElement(text, state.composants._panel);
      }
   },
   plugins: [createPersistedState()],
});
