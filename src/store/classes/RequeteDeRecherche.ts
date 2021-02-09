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
import { Getter } from "vuex-class";

@Module({namespaced: true})
class RequeteDeRecherche extends VuexModule {
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

   /*Objet en JSON*/
   private globalSearchRequestInJson = '';

   /* Résultats de la recherche */
   private notices: Array<Notice> = [];

   private solrChainRegions = '';

   /*Setters*/

   //Bloc plan de conservation régions
   @Mutation
   public setArrayRegions(arraySent: Array<CheckboxesProvider>): void {
      this.blocPcpRegions.arrayRegions = arraySent;
   }
   @Mutation
   public setBlocPcpRegionsStringList(arraySent: Array<CheckboxesProvider>): void {
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
   public updateBlocRegions(arraySent: Array<CheckboxesProvider>): void {
      this.context.commit('setArrayRegions', arraySent);
      this.context.commit('setBlocPcpRegionsStringList', arraySent);
      this.context.commit('setBlocPcpRegionsInternalOperator', Ensemble.Ou);
      this.context.commit('setBlocPcpRegionsExternalOperator', Ensemble.Et);
   }

   //Bloc plan de conservation métiers
   @Mutation
   public setArrayMetiers(arraySent: Array<CheckboxesProvider>): void {
      this.blocPcpMetiers.arrayMetiers = arraySent;
   }
   @Mutation
   public setBlocPcpMetiersStringList(arraySent: Array<CheckboxesProvider>): void {
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
   public updateBlocMetiers(arraySent: Array<CheckboxesProvider>): void {
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
   @Action
   public updateBlocRcrInternalOperatorSelected(internalOperator: number): void {
      this.context.commit('setBlocRcrInternalOperator', internalOperator);
   }

   @Mutation
   public setBlocRcrExternalOperator(operator: number): void {
      this.blocRcr.externalBlocOperator = operator;
   }
   @Action
   public updateBlocRcrExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocRcrExternalOperator', externalOperator);
      console.log(JSON.stringify(this.blocRcr));
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

   //Bloc Ppn
   @Mutation
   public setBlocPpnExternalOperator(externalOpertaor: number): void {
      this.blocPpn.externalBlocOperator = externalOpertaor;
   }
   @Action
   public updateBlocPpnExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocPpnExternalOperator', externalOperator);
   }

   @Mutation
   public setBlocPpn(ppn: string): void {
      this.blocPpn.ppnEntered = ppn;
   }
   @Action
   public updateBlocPpn(ppn: string): void {
      this.context.commit('setBlocPpn', ppn);
   }

   //Bloc Issn
   @Mutation
   public setBlocIssnExternalOperator(externalOperator: number): void {
      this.blocIssn.externalBlocOperator = externalOperator;
   }
   @Action
   public updateBlocIssnExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocIssnExternalOperator', externalOperator);
   }

   @Mutation
   public setBlocIssn(issn: string): void {
      this.blocIssn.issnEntered = issn;
   }
   @Action
   public updateBlocIssn(issn: string): void {
      this.context.commit('setBlocIssn', issn);
   }

   //Bloc Mots du titre
   @Mutation
   public setBlocTitre(totalString: string): void {
      this.blocMotDuTitre.titleWordsStringArrayClean();
      totalString.split(' ').forEach((element) => {
         const elementInString = String(element);
         this.blocMotDuTitre.titleWordsEntered.push(elementInString);
      });
   }
   @Action
   public updateBlocTitre(totalString: string): void {
      this.context.commit('setBlocTitre', totalString);
   }

   //Bloc editeur
   @Mutation
   public setBlocEditeurExternalOperatorSelected(externalOperator: number): void {
      this.blocEditeur.externalBlocOperator = externalOperator;
   }
   @Action
   public updateBlocEditeurExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocEditeurExternalOperatorSelected', externalOperator);
   }

   @Mutation
   public setBlocEditeur(totalString: string): void {
      this.blocEditeur.editeurStringArrayClean();
      totalString.split(' ').forEach((element) => {
         const elementInString = String(element);
         this.blocEditeur.editorEntered.push(elementInString);
      });
   }
   @Action
   public updateBlocEditeur(totalString: string): void {
      this.context.commit('setBlocEditeur', totalString);
   }

   //Bloc langue
   @Mutation
   public setBlocLangueExternalOperatorSelected(externalOperator: number): void {
      this.blocLangue.externalBlocOperator = externalOperator;
   }
   @Action
   public updateBlocLangueExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocLangueExternalOperatorSelected', externalOperator);
   }
   @Mutation
   public setBlocLangue(arraySent: Array<ListProvider>): void {
      this.blocLangue.langueStringArrayClean();
      arraySent.forEach((element) => {
         this.blocLangue.langueEntered.push(element);
      });
   }
   @Action
   public updateBlocLangue(arraySent: Array<ListProvider>): void {
      this.context.commit('setBlocLangue', arraySent);
   }

   //Bloc Pays
   @Mutation
   public setBlocPaysExternalOperatorSelected(externalOperator: number): void {
      this.blocPays.externalBlocOperator = externalOperator;
   }
   @Action
   public updateBlocPaysExternalOperatorSelected(externalOperator: number): void {
      this.context.commit('setBlocPaysExternalOperatorSelected', externalOperator);
   }

   @Mutation
   public setBlocPays(arraySent: Array<ListProvider>): void {
      this.blocPays.paysStringArrayClean();
      arraySent.forEach((element) => {
         this.blocPays.paysEntered.push(element);
      });
   }
   @Action
   public updateBlocPays(arraySent: Array<ListProvider>): void {
      this.context.commit('setBlocPays', arraySent);
   }

   get blocPaysListeEntered(): Array<ListProvider> {
      return this.blocPays.paysEntered;
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
            JSON.stringify(this.blocPcpRegions.pcpStringArray) +
            '\n\n' +
            JSON.stringify(this.blocPcpMetiers.arrayMetiers) +
            '\n\n' +
            JSON.stringify(this.blocPcpMetiers.pcpStringArray) +
            '\n\n' +
            JSON.stringify(this.blocRcr.externalBlocOperator) +
            '\n\n' +
            JSON.stringify(this.blocRcr.internalBlocOperator) +
            '\n\n' +
            JSON.stringify(this.blocRcr.rcrListString) +
            '\n\n' +
            JSON.stringify('ppn ext operator' + this.blocPpn.externalBlocOperator) +
            '\n\n' +
            JSON.stringify('ppn' + this.blocPpn.ppnEntered) +
            '\n\n' +
            JSON.stringify('issn' + this.blocIssn.issnEntered) +
            '\n\n' +
            JSON.stringify('issnextop' + this.blocIssn.externalBlocOperator) +
            '\n\n' +
            JSON.stringify('mot du titre internal operator' + this.blocMotDuTitre.internalBlocOperator) +
            '\n\n' +
            JSON.stringify('mot titre' + this.blocMotDuTitre.titleWordsEntered) +
            '\n\n' +
            JSON.stringify('editeurOperator' + this.blocEditeur.externalBlocOperator) +
            '\n\n' +
            JSON.stringify('editeur internal Operator' + this.blocEditeur.internalBlocOperator) +
            '\n\n' +
            JSON.stringify('editeurs entrés' + this.blocEditeur.editorEntered) +
            '\n\n' +
            JSON.stringify('langue ext operator' + this.blocLangue.externalBlocOperator) +
            '\n\n' +
            JSON.stringify('langues entrées' + this.blocLangue.langueEntered) +
            '\n\n' +
            JSON.stringify('langue ext operator' + this.blocLangue.externalBlocOperator) +
            '\n\n' +
            JSON.stringify('pays entrés' + this.blocPays.paysEntered) +
            '\n\n' +
            JSON.stringify('pays ext operator' + this.blocPays.externalBlocOperator)
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

   /*@Mutation
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

   private tutorials: any[] = [];*/
}
export default RequeteDeRecherche;
