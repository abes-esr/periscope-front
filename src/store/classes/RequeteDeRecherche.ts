import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Notice from '@/store/classes/Notice';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {BlocPays} from '@/store/classes/blocsDeRecherche/BlocPays';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';
import {BlocRcr, RcrProvider} from '@/store/classes/blocsDeRecherche/BlocRcr';
import {BlocPpn} from '@/store/classes/blocsDeRecherche/BlocPpn';
import {BlocEditeur} from '@/store/classes/blocsDeRecherche/BlocEditeur';
import {BlocLangue} from '@/store/classes/blocsDeRecherche/BlocLangue';
import {BlocIssn} from '@/store/classes/blocsDeRecherche/BlocIssn';
import {BlocMotDuTitre} from '@/store/classes/blocsDeRecherche/BlocMotDuTitre';
import {CheckboxesProvider, Ensemble, ListProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {JsonEditeurProvider, JsonGlobalSearchRequest, JsonIssnBlocProvider, JsonLanguesProvider, JsonMotsDuTitreProvider, JsonPaysProvider, JsonPcpBlocProvider, JsonPpnBlocProvider, JsonRcrBlocProvider} from '@/store/classes/interfaces/JsonInterfaces';
import PeriscopeDataService from '@/axios/services/PeriscopeDataService';

@Module
export default class RequeteDeRecherche extends VuexModule {
   //Blocs de recherche
   private blocPcpRegions: BlocPcpRegions = new BlocPcpRegions(Ensemble.Ou);
   private blocPcpMetiers: BlocPcpMetiers = new BlocPcpMetiers(Ensemble.Ou);
   private blocRcr: BlocRcr = new BlocRcr(Ensemble.Ou);
   private blocPpn: BlocPpn = new BlocPpn(Ensemble.Ou);
   private blocEditeur: BlocEditeur = new BlocEditeur(Ensemble.Ou);
   private blocPays: BlocPays = new BlocPays(Ensemble.Ou);
   private blocLangue: BlocLangue = new BlocLangue(Ensemble.Ou);
   private blocIssn: BlocIssn = new BlocIssn(Ensemble.Ou);
   private blocMotDuTitre: BlocMotDuTitre = new BlocMotDuTitre(Ensemble.Ou);

   /* Résultats de la recherche */
   private notices: Array<Notice> = [];

   /*Setters*/

   //Bloc plan de conservation régions
   @Mutation
   setBlocPcpRegionsArrayRegions(arraySent: Array<CheckboxesProvider>) {
      console.log(this);
      this.blocPcpRegions.arrayRegions = arraySent;
   }
   @Mutation
   setBlocPcpRegionsStringList(arraySent: Array<CheckboxesProvider>) {
      arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? this.blocPcpRegions.pcpStringArray.push(element.key) : ''));
   }
   @Mutation
   setBlocPcpRegionsInternalOperator(operator: number) {
      this.blocPcpRegions.internalBlocOperator = operator;
   }
   @Mutation
   setBlocPcpRegionsExternalOperator(operator: number) {
      this.blocPcpRegions.externalBlocOperator = operator;
   }

   //Bloc plan de conservation métiers
   @Mutation
   setBlocPcpMetiersArrayMetiers(arraySent: Array<CheckboxesProvider>) {
      this.blocPcpMetiers.arrayMetiers = arraySent;
   }
   @Mutation
   setBlocPcpMetiersStringList(arraySent: Array<CheckboxesProvider>) {
      this.blocPcpMetiers.pcpStringArray = [];
      arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? this.blocPcpMetiers.pcpStringArray.push(element.key) : ''));
   }
   @Mutation
   setBlocPcpMetiersInternalOperator(operator: number) {
      this.blocPcpMetiers.internalBlocOperator = operator;
   }
   @Mutation
   setBlocPcpMetiersExternalOperator(operator: number) {
      this.blocPcpMetiers.externalBlocOperator = operator;
   }

   //Bloc Rcr
   @Mutation
   setBlocRcrExternalOperator(externalOperator: number) {
      this.blocRcr.externalBlocOperator = externalOperator;
   }
   @Mutation
   setBlocRcrInternalOperator(internalOperator: number) {
      this.blocRcr.internalBlocOperator = internalOperator;
   }
   @Mutation
   setBlocRcrRcrHandler(arraySent: Array<RcrProvider>) {
      this.blocRcr.rcrHandler = arraySent;
   }
   @Mutation
   setBlocRcrRcrListString(arraySent: Array<string>) {
      this.blocRcr.rcrListString = arraySent;
   }

   //Bloc Ppn
   @Mutation
   setBlocPpnExternalOperator(externalOperator: number) {
      this.blocPpn.externalBlocOperator = externalOperator;
   }

   @Mutation
   setBlocPpnInternalOperator(internalOperator: number) {
      this.blocPpn.internalBlocOperator = internalOperator;
   }

   @Mutation
   setBlocPpn(ppn: string) {
      this.blocPpn.ppnEntered = ppn;
   }

   @Mutation
   setBlocPpnListString(arraySent: Array<string>) {
      this.blocPpn.ppnStringArrayClean();
      this.blocPpn.ppnListString = arraySent;
   }

   //Bloc Issn
   @Mutation
   setBlocIssnExternalOperator(externalOperator: number) {
      this.blocIssn.externalBlocOperator = externalOperator;
   }

   @Mutation
   setBlocIssn(issn: string) {
      this.blocIssn.issnEntered = issn;
   }

   //Bloc Mots du titre
   @Mutation
   setBlocTitre(totalString: string) {
      this.blocMotDuTitre.titleWordsStringArrayClean();
      totalString.split(' ').forEach((element) => {
         const elementInString = String(element);
         this.blocMotDuTitre.titleWordsEntered.push(elementInString);
      });
   }

   //Bloc editeur
   @Mutation
   setBlocEditeurExternalOperatorSelected(externalOperator: number) {
      this.blocEditeur.externalBlocOperator = externalOperator;
   }

   @Mutation
   setBlocEditeur(totalString: string) {
      this.blocEditeur.editeurStringArrayClean();
      totalString.split(' ').forEach((element) => {
         const elementInString = String(element);
         this.blocEditeur.editorEntered.push(elementInString);
      });
   }

   //Bloc langue
   @Mutation
   setBlocLangueExternalOperatorSelected(externalOperator: number) {
      this.blocLangue.externalBlocOperator = externalOperator;
   }

   @Mutation
   setBlocLangue(arraySent: Array<ListProvider>) {
      this.blocLangue.langueStringArrayClean();
      arraySent.forEach((element) => {
         this.blocLangue.langueEntered.push(element);
      });
   }

   //Bloc Pays
   @Mutation
   setBlocPaysExternalOperatorSelected(externalOperator: number) {
      this.blocPays.externalBlocOperator = externalOperator;
   }

   @Mutation
   setBlocPays(arraySent: Array<ListProvider>) {
      this.blocPays.paysStringArrayClean();
      arraySent.forEach((element) => {
         this.blocPays.paysEntered.push(element);
      });
   }

   /*Getters*/

   /*
   NOTE: Be careful, getters in vuex are not reactive, (except for primitive types ?).
   Loaded just once when the component is created.
   To access a data reactively, use this syntax (OLD SYNTAX)
   syntax:  this.$store.state.{CLASSNAME}.{MEMBER_OF_CLASS}
   example: this.$store.state.RequeteDeRecherche.globalRegions
   to put in the component which you want access at the data.

   To access a data reactively with no problems, use this syntax (NEW SYNTAX)
   In a component:
   STEP 1 in component class declare state
      @requeteDeRecherche.State
      private blocLangue!: BlocLangue;
   STEP 2 in component class create locate attribute which receive the data from store
      private langueEntered: Array<ListProvider>;
   STEP 3 to initialize the data in class (use this.langueEntered in v-model as example)
      this.langueEntered = this.blocLangue.langueEntered;
   STEP 4 to access the data in template
      <span>{{ this.blocLangue.externalBlocOperator }}</span>
      <span>{{ typeof this.blocLangue.externalBlocOperator }}</span>

   Exemple of old vue getter version (doesn't work actually)

   get getGlobalRegionsValue(): Array<Provider> {
      return this.globalRegions;
   }
    */

   /*Methods*/
   @Action({rawError: true})
   public findNoticesByCriteria(): void {
      //Construction du JSON à envoyer au back end
      const jsonToSentToBackEnd: Array<JsonGlobalSearchRequest> = this.context.getters['constructJsonGlobalRequest'];

      //console.log(JSON.stringify(jsonToSentToBackEnd));
      //console.log(JSON.parse(JSON.stringify(jsonToSentToBackEnd)));

      // On appelle l'API Periscope
      // Note: Promise.all permet d'appeller plusieurs fonctions qui encapsule des appels Axios
      Promise.all([PeriscopeDataService.findNoticesByCriteria(0, 25, JSON.stringify(jsonToSentToBackEnd))])
         .then((response) => {
            if (response[0].status == 200) {
               this.context.commit('setNotices', response[0].data);
            } else {
               window.alert("Erreur avec l'API Periscope : status " + response[0].status);
            }
         })
         .catch((err) => {
            //console.log('Axios err: ', err);
            window.alert("Erreur avec l'API Periscope :" + err);
         });
   }

   @Action({rawError: true})
   get constructJsonGlobalRequest(): Array<JsonGlobalSearchRequest> {
      //Les blocs ne sont rajoutés que si il contiennent des données
      const jsonToReturn: Array<JsonGlobalSearchRequest> = [];

      //Construction de la partie PCP Regions et Metiers en JSON
      if (this.blocPcpRegions.pcpStringArray.length !== 0 || this.blocPcpMetiers.pcpStringArray.length !== 0) {
         const pcpRegionsAndMetiersList: Array<string> = [];
         this.blocPcpRegions.pcpStringArray.forEach((element) => pcpRegionsAndMetiersList.push(element));
         this.blocPcpMetiers.pcpStringArray.forEach((element) => pcpRegionsAndMetiersList.push(element));
         const pcpRegionsAndMetiersInternalOperator: Array<string> = [];
         this.blocPcpRegions.arrayRegions.forEach((element) => (element.value ? pcpRegionsAndMetiersInternalOperator.push(this.blocPcpRegions.internalBlocOperatorInString) : ''));
         this.blocPcpMetiers.arrayMetiers.forEach((element) => (element.value ? pcpRegionsAndMetiersInternalOperator.push(this.blocPcpMetiers.internalBlocOperatorInString) : ''));

         const pcpBlocJson: JsonPcpBlocProvider = {
            type: this.blocPcpRegions.type,
            bloc_operator: this.blocPcpRegions.externalBlocOperatorInString,
            pcp: pcpRegionsAndMetiersList,
            pcp_operator: pcpRegionsAndMetiersInternalOperator,
         };

         jsonToReturn.push(pcpBlocJson);
      }

      //Construction de la partie Rcr en JSON
      if (this.blocRcr.rcrListString.length !== 0) {
         const rcrBlocJson: JsonRcrBlocProvider = {
            type: this.blocRcr.type,
            bloc_operator: this.blocRcr.externalBlocOperatorInString,
            rcr: this.blocRcr.rcrListString,
            rcr_operator: this.blocRcr.internalBlocOperatorInArrayString,
         };
         jsonToReturn.push(rcrBlocJson);
      }

      //Construction de la partie PPN en JSON
      if (this.blocPpn.ppnEnteredInArrayString.length !== 0) {
         const ppnBlocJson: JsonPpnBlocProvider = {
            type: this.blocPpn.type,
            bloc_operator: this.blocPpn.externalBlocOperatorInString,
            ppn: this.blocPpn.ppnEnteredInArrayString,
         };
         jsonToReturn.push(ppnBlocJson);
      }

      //Construction de la partie ISSN en JSON
      if (this.blocIssn.issnEnteredInArrayString.length !== 0) {
         const issnBlocJson: JsonIssnBlocProvider = {
            type: this.blocIssn.type,
            bloc_operator: this.blocIssn.externalBlocOperatorInString,
            issn: this.blocIssn.issnEnteredInArrayString,
         };
         jsonToReturn.push(issnBlocJson);
      }

      //Construction de la partie Mots du titre en JSON
      if (this.blocMotDuTitre.internalBlocOperatorInArrayString.length !== 0) {
         const titleWordsBlocJson: JsonMotsDuTitreProvider = {
            type: this.blocMotDuTitre.type,
            bloc_operator: this.blocMotDuTitre.externalBlocOperatorInString,
            titleWords: this.blocMotDuTitre.titleWordsEntered,
            titleWordsOperator: this.blocMotDuTitre.internalBlocOperatorInArrayString,
         };
         jsonToReturn.push(titleWordsBlocJson);
      }

      //Construction de la partie Editeur en JSON
      if (this.blocEditeur.internalBlocOperatorInArrayString.length !== 0) {
         const editorBlocJson: JsonEditeurProvider = {
            type: this.blocEditeur.type,
            bloc_operator: this.blocEditeur.externalBlocOperatorInString,
            editors: this.blocEditeur.editorEntered,
            editorsOperator: this.blocEditeur.internalBlocOperatorInArrayString,
         };
         jsonToReturn.push(editorBlocJson);
      }

      //Construction de la partie Pays en JSON
      if (this.blocPays.internalBlocOperatorInArrayString.length !== 0) {
         const paysBlocJson: JsonPaysProvider = {
            type: this.blocPays.type,
            bloc_operator: this.blocPays.externalBlocOperatorInString,
            countries: this.blocPays.paysEnteredInArrayString,
            countriesOperator: this.blocPays.internalBlocOperatorInArrayString,
         };
         jsonToReturn.push(paysBlocJson);
      }

      //Construction de la partie Langue en JSON
      if (this.blocLangue.internalBlocOperatorInArrayString.length !== 0) {
         const langueBlocJson: JsonLanguesProvider = {
            type: this.blocLangue.type,
            bloc_operator: this.blocLangue.externalBlocOperatorInString,
            language: this.blocLangue.paysEnteredInArrayString,
            languageOperators: this.blocLangue.internalBlocOperatorInArrayString,
         };
         jsonToReturn.push(langueBlocJson);
      }

      return jsonToReturn;
   }

   @Mutation
   public setNotices(results: any[]): void {
      this.notices = []; // On vide le tableau des notices
      // On cast les objets générique en Notice
      results.forEach((obj) => this.notices.push(new Notice(obj)));
   }
}
