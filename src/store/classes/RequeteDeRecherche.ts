import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import TutorialDataService from '@/axios/services/TutorialDataService';
import Notice from '@/store/classes/Notice';
import {BlocPcpRegions} from '@/store/classes/blocsDeRecherche/BlocPcpRegions';
import {BlocCountry} from '@/store/classes/blocsDeRecherche/BlocCountry';
import {BlocPcpMetiers} from '@/store/classes/blocsDeRecherche/BlocPcpMetiers';
import {BlocRcr} from '@/store/classes/blocsDeRecherche/BlocRcr';

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

interface EtOuSaufProvider {
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

interface RcrProvider {
   id: number;
   value: number;
}

export enum Ensemble {
   Ou,
   Et,
   Sauf,
}

@Module({namespaced: true})
class RequeteDeRecherche extends VuexModule {
   //tableau des métiers sélectionnés
   private globalOptionsRcrSelected: Ensemble = Ensemble.Et; //option et / ou / sauf sur bloc rcr
   private globalRcrHandler: Array<RcrProvider> = []; //tableau des rcr saisis
   private globalOptionsLotRcrSelected: Ensemble = Ensemble.Et; //pour le lot de rcr, option ou / et
   private optionsEtOuSaufParDefaut: Array<EtOuSaufProvider> = [
      {id: 0, key: 'optionPpnET', text: 'ET', value: Ensemble.Ou},
      {id: 1, key: 'optionPpnOU', text: 'OU', value: Ensemble.Et},
      {id: 2, key: 'optionPpnSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];
   private optionsEtOuParDefaut: Array<EtOuSaufProvider> = [
      {id: 0, key: 'optionLotRcrET', text: 'ET', value: Ensemble.Ou},
      {id: 1, key: 'optionLotRcrOU', text: 'OU', value: Ensemble.Et},
   ];
   private globalOptionsPpnSelected: Ensemble = Ensemble.Ou; //option et / ou / sauf sur bloc ppn
   private globalPpnTypedInNumber = 0; //ppn saisi dans le bloc ppn
   private globalIssnTypedInNumber = 0; //issn saisi dans le bloc ppn
   private globalTitleWordsTyped = ''; //mots du titre saisi dans le bloc ppn
   private globalOptionsEditorSelected: Ensemble = Ensemble.Ou; //et / ou / sauf pour l'editeur
   private globalEditorTyped = ''; //editeur saisi
   private globalOptionsLanguageSelected: Ensemble = Ensemble.Ou; // et/ ou/ sauf pour la langue
   private globalLanguageTyped = ''; // langue saisie
   private globalOptionsCountrySelected: Ensemble = Ensemble.Ou; // et / ou / sauf pour le pays
   private globalCountryTyped = ''; // pays saisi

   //Blocs de recherche
   private blocPcpRegions: BlocPcpRegions = new BlocPcpRegions();
   private blocPcpMetiers: BlocPcpMetiers = new BlocPcpMetiers();
   private blocRcr: BlocRcr = new BlocRcr();
   private blocCountry: BlocCountry = new BlocCountry();

   /*Objet en JSON*/
   private globalSearchRequestInJson = '';

   /* Résultats de la recherche */
   private notices: Array<Notice> = [];

   private solrChainRegions = '';

   /*Setters*/

   //Bloc plan de conservation régions
   @Mutation
   public setArrayRegions(arraySent: Array<Provider>): void {
      this.blocPcpRegions.arrayRegions = arraySent;
   }
   @Mutation
   public setBlocPcpRegionsStringList(arraySent: Array<Provider>): void {
      this.blocPcpRegions.pcpStringArrayClean();
      arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? this.blocPcpRegions.pcpStringArray.push(element.key) : ''));
   }
   @Mutation
   public setBlocPcpRegionsInternalOperator(operator: number): void {
      this.blocPcpRegions.internalBlocOperator = operator;
   }
   @Mutation
   public setBlocPcpRegionsExternalOperator(operator: number): void {
      this.blocPcpRegions.externalBlocOperator = operator;
   }
   @Action({rawError: true})
   public updateBlocRegions(arraySent: Array<Provider>): void {
      this.context.commit('setArrayRegions', arraySent);
      this.context.commit('setBlocPcpRegionsStringList', arraySent);
      this.context.commit('setBlocPcpRegionsInternalOperator', Ensemble.Ou);
      this.context.commit('setBlocPcpRegionsExternalOperator', Ensemble.Et);
   }

   //Bloc plan de conservation métiers
   @Mutation
   public setArrayMetiers(arraySent: Array<Provider>): void {
      this.blocPcpMetiers.arrayMetiers = arraySent;
   }
   @Mutation
   public setBlocPcpMetiersStringList(arraySent: Array<Provider>): void {
      this.blocPcpMetiers.pcpStringArrayClean();
      arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? this.blocPcpMetiers.pcpStringArray.push(element.key) : ''));
   }
   @Mutation
   public setBlocPcpMetiersInternalOperator(operator: number): void {
      this.blocPcpMetiers.internalBlocOperator = operator;
   }
   @Mutation
   public setBlocPcpMetiersExternalOperator(operator: number): void {
      this.blocPcpMetiers.externalBlocOperator = operator;
   }
   @Action({rawError: true})
   public updateBlocMetiers(arraySent: Array<Provider>): void {
      this.context.commit('setArrayMetiers', arraySent);
      this.context.commit('setBlocPcpMetiersStringList', arraySent);
      this.context.commit('setBlocPcpMetiersInternalOperator', Ensemble.Ou);
      this.context.commit('setBlocPcpMetiersExternalOperator', Ensemble.Et);
   }

   //Bloc Rcr
   @Mutation
   public setBlocRcrInternalOperator(operator: number): void {
      this.blocRcr.internalBlocOperator = operator;
   }
   @Mutation
   public setBlocRcrExternalOperator(operator: number): void {
      this.blocRcr.externalBlocOperator = operator;
   }
   @Mutation
   public setBlocRcrRcrHandler(arraySent: Array<RcrProvider>): void {
      this.blocRcr.rcrHandler = arraySent;
   }
   @Mutation
   public setBlocRcrRcrListString(arraySent: Array<RcrProvider>): void {
      this.blocRcr.rcrStringArrayClean();
      arraySent.forEach((element) => {
         const elementInString = String(element);
         this.blocRcr.rcrListString.push(elementInString);
      });
   }
   @Action
   public updateBlocRcr(arraySent: Array<RcrProvider>): void {
      this.context.commit('setBlocRcrRcrHandler', arraySent);
      this.context.commit('setBlocRcrRcrListString', arraySent);
   }
   @Action
   public updateInternalOperatorSelected(internalOperator: number): void {
      this.context.commit('setBlocRcrInternalOperator', internalOperator);
   }
   @Action
   public updateExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocRcrExternalOperator', externalOperator);
      console.log(JSON.stringify(this.blocRcr));
   }

   //Setters du bloc ppn
   @Mutation
   public setGlobalOptionsPpnSelected(elementSent: Ensemble): void {
      this.globalOptionsPpnSelected = elementSent;
   }
   @Action
   public updateGlobalOptionsPpnSelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsPpnSelected', elementSent);
   }

   @Mutation
   public setGlobalPpnTypedInNumber(elementSent: number): void {
      this.globalPpnTypedInNumber = elementSent;
   }
   @Action
   public updateGlobalPpnTypedInNumber(elementSent: number): void {
      this.context.commit('setGlobalPpnTypedInNumber', elementSent);
   }

   @Mutation
   public setGlobalIssnTypedInNumber(elementSent: number): void {
      this.globalIssnTypedInNumber = elementSent;
   }
   @Action
   public updateGlobalIssnTypedInNumber(elementSent: number): void {
      this.context.commit('setGlobalIssnTypedInNumber', elementSent);
   }

   @Mutation
   public setGlobalTitleWordsTyped(elementSent: string): void {
      this.globalTitleWordsTyped = elementSent;
   }
   @Action
   public updateGlobalTitleWordsTyped(elementSent: string): void {
      this.context.commit('setGlobalTitleWordsTyped', elementSent);
   }

   @Mutation
   public setGlobalOptionsEditorSelected(elementSent: Ensemble): void {
      this.globalOptionsEditorSelected = elementSent;
   }
   @Action
   public updateGlobalOptionsEditorSelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsEditorSelected', elementSent);
   }

   @Mutation
   public setGlobalEditorTyped(elementSent: string): void {
      this.globalEditorTyped = elementSent;
   }
   @Action
   public updateGlobalEditorTyped(elementSent: string): void {
      this.context.commit('setGlobalEditorTyped', elementSent);
   }

   @Mutation
   public setGlobalOptionsLanguageSelected(elementSent: Ensemble): void {
      this.globalOptionsLanguageSelected = elementSent;
   }
   @Action
   public updateGlobalOptionsLanguageSelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsLanguageSelected', elementSent);
   }

   @Mutation
   public setGlobalLanguageTyped(elementSent: string): void {
      this.globalLanguageTyped = elementSent;
   }
   @Action
   public updateGlobalLanguageTyped(elementSent: string): void {
      this.context.commit('setGlobalLanguageTyped', elementSent);
   }

   @Mutation
   public setGlobalOptionsCountrySelected(elementSent: Ensemble): void {
      this.globalOptionsCountrySelected = elementSent;
   }
   @Action
   public updateGlobalOptionsCountrySelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsCountrySelected', elementSent);
   }

   @Mutation
   public setGlobalCountryTyped(elementSent: string): void {
      this.globalCountryTyped = elementSent;
   }
   @Action
   public updateGlobalCountryTyped(elementSent: string): void {
      this.context.commit('setGlobalCountryTyped', elementSent);
   }

   @Mutation
   public setJsonGlobalString(): void {
      this.globalSearchRequestInJson = JSON.stringify(this);
   }

   /*Getters*/

   /*
   NOTE: Be careful, getters in vuex are not reactive, (except for primitive types ?).
   Loaded just once when the component is created.
   To access a data reactively, use this syntax
   syntax:  this.$store.state.{CLASSNAME}.{MEMBER_OF_CLASS}
   example: this.$store.state.RequeteDeRecherche.globalRegions
   to put in the component which you want access at the data.

   Exemple of vue getter (doesn't work actually)

   get getGlobalRegionsValue(): Array<Provider> {
      return this.globalRegions;
   }
    */

   /*Methods*/
   @Action
   public displayFinalRequest(): void {
      window.alert(
         JSON.stringify(this.blocPcpRegions.arrayRegions) +
            '\n\n' +
            JSON.stringify(this.blocPcpMetiers.arrayMetiers) +
            '\n\n' +
            JSON.stringify(this.globalOptionsRcrSelected) +
            '\n\n' +
            JSON.stringify(this.globalRcrHandler) +
            '\n\n' +
            JSON.stringify(this.globalOptionsLotRcrSelected) +
            '\n\n' +
            JSON.stringify(this.globalOptionsPpnSelected) +
            '\n\n' +
            JSON.stringify(this.globalPpnTypedInNumber) +
            '\n\n' +
            JSON.stringify(this.globalIssnTypedInNumber) +
            '\n\n' +
            JSON.stringify(this.globalTitleWordsTyped) +
            '\n\n' +
            JSON.stringify(this.globalOptionsEditorSelected) +
            '\n\n' +
            JSON.stringify(this.globalEditorTyped) +
            '\n\n' +
            JSON.stringify(this.globalOptionsLanguageSelected) +
            '\n\n' +
            JSON.stringify(this.globalLanguageTyped) +
            '\n\n' +
            JSON.stringify(this.globalOptionsCountrySelected) +
            '\n\n' +
            JSON.stringify(this.globalCountryTyped) +
            '\n\n'
      );
   }

   /*
   @Action({rawError: true})
   public findNoticesByCriteria(): void {
      const criteria: Array<any> = [];

      // Critère PCP
      const criterionPcp = new CriterionPcp();
      this.globalRegions.forEach((element) => (element.value ? criterionPcp.addPcp(element.key) : ''));
      this.globalRegions.forEach(function (pcp) {
         if (pcp.value) {
            criterionPcp.addPcp(pcp.key);
         }
      });
      this.globalMetiers.forEach(function (pcp) {
         if (pcp.value) {
            criterionPcp.addPcp(pcp.key);
         }
      });

      if (criterionPcp.getPcp.length > 0) {
         criteria.push(criterionPcp);
      }

      // Critère RCR


      const criterionRcr = new CriterionRcr(this.getGlobalOptionsRcrSelectedValue);
      const myOption = this.getGlobalOptionsLotRcrSelected;
      this.getRcrHandler.forEach(function (rcr) {
         //console.log(rcr.value);
         criterionRcr.addRcr(String(rcr.value), myOption);
      });
      if (criterionRcr.getRcr.length > 0) {
         criteria.push(criterionRcr);
      }

      // Critère PPN
      if (this.globalPpnTypedInNumber) {
         const criterionPpn = new CriterionPpn(this.globalOptionsPpnSelected);
         criterionPpn.addPpn(String(this.globalPpnTypedInNumber));
         criteria.push(criterionPpn);
      }

      // Critère ISSN
      if (this.globalIssnTypedInNumber) {
         const criterionIssn = new CriterionIssn(this.globalOptionsPpnSelected);
         criterionIssn.addIssn(String(this.globalIssnTypedInNumber));
         criteria.push(criterionIssn);
      }

      // Critère Mots du titre
      if (this.globalTitleWordsTyped) {
         const criterionTitleWords = new CriterionTitleWords(Ensemble.Union);
         criterionTitleWords.addTitleWord(String(this.globalTitleWordsTyped), Ensemble.Union);
         criteria.push(criterionTitleWords);
      }

      // Critère éditeur
      if (this.globalEditorTyped) {
         const criterionEditor = new CriterionEditor(this.globalOptionsEditorSelected);
         criterionEditor.addEditor(String(this.globalEditorTyped), Ensemble.Union);
         criteria.push(criterionEditor);
      }

      // Critère Langue de publication
      if (this.globalLanguageTyped) {
         const criterionLanguage = new CriterionLanguage(this.globalOptionsLanguageSelected);
         criterionLanguage.addLanguage(String(this.globalLanguageTyped), Ensemble.Union);
         criteria.push(criterionLanguage);
      }

      // Critère pays
      if (this.globalCountryTyped) {
         const criterionCountry = new CriterionCountry(this.globalOptionsCountrySelected);
         criterionCountry.addCountry(String(this.globalCountryTyped), Ensemble.Union);
         criteria.push(criterionCountry);
      }

      // On appelle l'API Periscope
      // Note: Promise.all permet d'appeller plusieurs fonctions qui encapsule des appels Axios
      Promise.all([PeriscopeDataService.findNoticesByCriteria(0, 25, JSON.stringify(criteria))])
         .then((response) => {
            if (response[0].status == 200) {
               this.context.commit('setNotices', response[0].data);
               window.alert(JSON.stringify(this.notices));
            } else {
               window.alert("Erreur avec l'API Periscope : status " + response[0].status);
            }
         })
         .catch((err) => {
            //console.log('Axios err: ', err);
            window.alert("Erreur avec l'API Periscope :" + err);
         });
   }
    */

   @Mutation
   public setNotices(results: any[]): void {
      this.notices = []; // On vide le tableau des notices
      // On cast les objets générique en Notice
      results.forEach((obj) => this.notices.push(new Notice(obj)));
   }

   //Test API
   @Mutation
   public setTest(elementSent: any[]): void {
      this.tutorials = elementSent;
   }

   private tutorials: any[] = [];
}
export default RequeteDeRecherche;
