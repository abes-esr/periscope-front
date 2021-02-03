import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import TutorialDataService from '@/axios/services/TutorialDataService';
import CriterionPcp from "@/store/classes/CriterionPcp";
import CriterionRcr from "@/store/classes/CriterionRcr";
import PeriscopeDataService from "@/axios/services/PeriscopeDataService";
import Notice from '@/store/classes/Notice';
import CriterionPpn from "@/store/classes/CriterionPpn";
import CriterionTitleWords from "@/store/classes/CriterionTitleWords";
import CriterionEditor from "@/store/classes/CriterionEditor";

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
   Union,
   Intersection,
   Difference,
}

@Module({namespaced: true})
class RequeteDeRecherche extends VuexModule {
   private globalRegions: Array<Provider> = [
      {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
      {id: 1, key: 'Au', text: 'Auvergne', value: false},
      {id: 2, key: 'Bo', text: 'Bourgogne', value: false},
      {id: 3, key: 'Br', text: 'Bretagne', value: false},
      {id: 4, key: 'Ca', text: 'Champagne-Ardenne', value: false},
      {id: 5, key: 'Cap', text: 'Champagne-Ardenne Picardie', value: false},
      {id: 6, key: 'Co', text: 'Corse', value: false},
      {id: 7, key: 'Fc', text: 'Franche-Comté', value: false},
      {id: 8, key: 'Lr', text: 'Languedoc-Roussillon', value: false},
      {id: 9, key: 'PCLim', text: 'Limousin', value: false},
      {id: 10, key: 'Lo', text: 'Lorraine', value: false},
      {id: 11, key: 'Mp', text: 'Midi-Pyrénées', value: false},
      {id: 12, key: 'Npc', text: 'Nord-Pas-de-Calais', value: false},
      {id: 13, key: 'Pca', text: 'PACA', value: false},
      {id: 14, key: 'Pc', text: 'Poitou-Charentes', value: false},
      {id: 15, key: 'Pdl', text: 'Pays de Loire', value: false},
      {id: 16, key: 'Pi', text: 'Picardie', value: false},
      {id: 17, key: 'Ra', text: 'Rhône-Alpes', value: false},
      {id: 18, key: 'Sam', text: 'Sciences Aix-Marseille', value: false},
      {id: 19, key: 'Scvdl', text: 'Sciences Centre Val de Loire', value: false},
      {id: 20, key: 'Udp', text: 'Université de Poitiers', value: false},
      {id: 21, key: 'Udr', text: 'Université de Rouen', value: false},
   ]; //tableau des régions sélectionnées
   private globalMetiers: Array<Provider> = [
      {id: 0, key: 'Aem', text: 'Arts-et-Métiers', value: false},
      {id: 1, key: 'Ads', text: 'Arts du spectacle', value: false},
      {id: 2, key: 'Saa', text: "Sciences de l'Antiquité et Archéologie", value: false},
      {id: 3, key: 'Ch', text: 'Chimie', value: false},
      {id: 4, key: 'Dr', text: 'Droit', value: false},
      {id: 5, key: 'Ebco', text: 'Europe balkanique, centrale et orientale', value: false},
      {id: 6, key: 'Llcg', text: 'Langues, littératures, civilisation germaniques', value: false},
      {id: 7, key: 'Ge', text: 'Géographie', value: false},
      {id: 8, key: 'Ei', text: 'Etudes italiennes', value: false},
      {id: 9, key: 'Me', text: 'Médiéval', value: false},
      {id: 10, key: 'Sdn', text: 'Sciences du Numériques', value: false},
      {id: 11, key: 'Mr', text: 'Mathématiques RNBM', value: false},
      {id: 12, key: 'Mede', text: 'Médecine', value: false},
      {id: 13, key: 'Pp', text: 'Psychologie, Psychanalyse', value: false},
      {id: 14, key: 'St', text: 'STAPS', value: false},
      {id: 15, key: 'Phi', text: 'Philosophie', value: false},
      {id: 16, key: 'Phy', text: 'Physique', value: false},
   ]; //tableau des métiers sélectionnés
   private globalOptionsRcrSelected: Ensemble = Ensemble.Intersection; //option et / ou / sauf sur bloc rcr
   private globalRcrHandler: Array<RcrProvider> = []; //tableau des rcr saisis
   private globalOptionsLotRcrSelected: Ensemble = Ensemble.Intersection; //pour le lot de rcr, option ou / et
   private optionsEtOuSaufParDefaut: Array<EtOuSaufProvider> = [
      {id: 0, key: 'optionPpnET', text: 'ET', value: Ensemble.Union},
      {id: 1, key: 'optionPpnOU', text: 'OU', value: Ensemble.Intersection},
      {id: 2, key: 'optionPpnSAUF', text: 'SAUF', value: Ensemble.Difference},
   ];
   private optionsEtOuParDefaut: Array<EtOuSaufProvider> = [
      {id: 0, key: 'optionLotRcrET', text: 'ET', value: Ensemble.Union},
      {id: 1, key: 'optionLotRcrOU', text: 'OU', value: Ensemble.Intersection},
   ];
   private globalOptionsPpnSelected: Ensemble = Ensemble.Union; //option et / ou / sauf sur bloc ppn
   private globalPpnTypedInNumber = 0; //ppn saisi dans le bloc ppn
   private globalIssnTypedInNumber = 0; //issn saisi dans le bloc ppn
   private globalTitleWordsTyped = ''; //mots du titre saisi dans le bloc ppn
   private globalOptionsEditorSelected: Ensemble = Ensemble.Union; //et / ou / sauf pour l'editeur
   private globalEditorTyped = ''; //editeur saisi
   private globalOptionsLanguageSelected: Ensemble = Ensemble.Union; // et/ ou/ sauf pour la langue
   private globalLanguageTyped = ''; // langue saisie
   private globalOptionsCountrySelected: Ensemble = Ensemble.Union; // et / ou / sauf pour le pays
   private globalCountryTyped = ''; // pays saisi

   /*Attributs Solr*/
   private globalRegionsSolr = '';

   /*Objet en JSON*/
   private globalSearchRequestInJson = '';

   /* Résultats de la recherche */
   private notices: Array<Notice> = [];

   /*Setters*/

   //Setters du plan de conservation
   @Mutation
   public setGlobalRegions(arraySent: Array<Provider>): void {
      this.globalRegions = arraySent;
   }
   @Mutation
   public setGlobalRegionsSolr(arraySent: Array<Provider>): void {
      this.globalRegionsSolr = '';
      let numberOfTrueValuesInArray = 0;
      arraySent.forEach((element) => {
         if (element.value) {
            numberOfTrueValuesInArray += 1;
         }
      });
      if (numberOfTrueValuesInArray === 1) {
         arraySent.forEach((element) => {
            if (element.value) {
               this.globalRegionsSolr = '930-z_s:' + element.key;
            }
         });
      } else {
         this.globalRegionsSolr += '(';
         arraySent.forEach((element) => {
            if (element.value) {
               this.globalRegionsSolr += '930-z_s:' + element.key + ' OR ';
            }
         });
         for (let i = 0; i < 4; i++) {
            this.globalRegionsSolr = this.globalRegionsSolr.slice(0, -1);
         }
         this.globalRegionsSolr += ')';
      }
   }
   @Action
   public updateGlobalRegions(arraySent: Array<Provider>): void {
      this.context.commit('setGlobalRegions', arraySent);
      this.context.commit('setGlobalRegionsSolr', arraySent);
      this.context.commit('setJsonGlobalString');
      console.log(this.globalSearchRequestInJson);
   }

   @Mutation
   public setGlobalMetiers(arraySent: Array<Provider>): void {
      this.globalMetiers = arraySent;
   }
   @Action
   public updateGlobalMetiers(arraySent: Array<Provider>): void {
      this.context.commit('setGlobalMetiers', arraySent);
   }

   //Setters du bloc rcr
   @Mutation
   public setGlobalOptionsRcrSelected(elementSent: Ensemble): void {
      this.globalOptionsRcrSelected = elementSent;
   }
   @Action
   public updateGlobalOptionsRcrSelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsRcrSelected', elementSent);
   }

   @Mutation
   public setGlobalRcrHandler(arraySent: Array<RcrProvider>): void {
      this.globalRcrHandler = arraySent;
   }
   @Action
   public updateGlobalRcrHandler(arraySent: Array<RcrProvider>): void {
      this.context.commit('setGlobalRcrHandler', arraySent);
   }

   @Mutation
   public setGlobalOptionsLotRcrSelected(elementSent: Ensemble): void {
      this.globalOptionsLotRcrSelected = elementSent;
   }
   @Action
   public updateGlobalOptionsLotRcrSelected(elementSent: Ensemble): void {
      this.context.commit('setGlobalOptionsLotRcrSelected', elementSent);
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
    */

   get getGlobalRegionsValue(): Array<Provider> {
      return this.globalRegions;
   }
   get getGlobalMetiersValue(): Array<Provider> {
      return this.globalMetiers;
   }
   get getGlobalOptionsRcrSelectedValue(): Ensemble {
      return this.globalOptionsRcrSelected;
   }
   get getRcrHandler(): Array<RcrProvider> {
      return this.globalRcrHandler;
   }
   get getGlobalOptionsLotRcrSelected(): Ensemble {
      return this.globalOptionsLotRcrSelected;
   }
   get getGlobalOptionsPpnSelected(): Ensemble {
      return this.globalOptionsPpnSelected;
   }
   get getGlobalPpnTypedInNumber(): number {
      return this.globalPpnTypedInNumber;
   }
   get getGlobalIssnTypedInNumber(): number {
      return this.globalIssnTypedInNumber;
   }
   get getGlobalTitleWordsTyped(): string {
      return this.globalTitleWordsTyped;
   }
   get getGlobalOptionsEditorSelected(): Ensemble {
      return this.globalOptionsEditorSelected;
   }
   get getGlobalEditorTyped(): string {
      return this.globalEditorTyped;
   }
   get getGlobalOptionsLanguageSelected(): Ensemble {
      return this.globalOptionsLanguageSelected;
   }
   get getGlobalLanguageTyped(): string {
      return this.globalLanguageTyped;
   }
   get getGlobalOptionsCountrySelected(): Ensemble {
      return this.globalOptionsCountrySelected;
   }
   get getGlobalCountryTyped(): string {
      return this.globalCountryTyped;
   }
   get getOptionsEtOuSaufParDefaut(): Array<EtOuSaufProvider> {
      return this.optionsEtOuSaufParDefaut;
   }
   get getOptionsEtOuParDefaut(): Array<EtOuSaufProvider> {
      return this.optionsEtOuParDefaut;
   }

   /*Methods*/
   @Action
   public displayFinalRequest(): void {
      window.alert(
         JSON.stringify(this.globalRegions) +
            '\n\n' +
            JSON.stringify(this.globalMetiers) +
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

   @Action({ rawError: true })
   public findNoticesByCriteria(): void {

      const criteria: Array<any> = [];

      // Critère PCP
      const criterionPcp = new CriterionPcp();
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

      if(criterionPcp.getPcp.length > 0) {
         criteria.push(criterionPcp);
      }


      // Critère RCR
      const criterionRcr = new CriterionRcr(this.getGlobalOptionsRcrSelectedValue);
      const myOption = this.getGlobalOptionsLotRcrSelected
      this.getRcrHandler.forEach(function (rcr) {
         console.log(rcr.value);
         criterionRcr.addRcr(String(rcr.value), myOption);
      });
      if(criterionRcr.getRcr.length > 0) {
         criteria.push(criterionRcr);
      }    

      // Critère PPN
      if (this.globalPpnTypedInNumber) {
         const criterionPpn = new CriterionPpn(this.globalOptionsPpnSelected);
         criterionPpn.addPpn(String(this.globalPpnTypedInNumber));
         criteria.push(criterionPpn);
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

      // On appelle l'API Periscope
      // Note: Promise.all permet d'appeller plusieurs fonctions qui encapsule des appels Axios
      Promise.all([PeriscopeDataService.findNoticesByCriteria(0,25,JSON.stringify(criteria))]).then((response) => {
         if (response[0].status == 200) {
            this.context.commit('setNotices', response[0].data);
            window.alert(JSON.stringify(this.notices));
         } else {
            window.alert("Erreur avec l'API Periscope : status "+response[0].status);
         }
      }).catch(err => {
         console.log("Axios err: ", err);
         window.alert("Erreur avec l'API Periscope :" + err);
      });
   }

   @Mutation
   public setNotices(results: any[]): void {
      this.notices = []; // On vide le tableau des notices
      // On cast les objets générique en Notice
      results.forEach(obj => this.notices.push(new Notice(obj)));
   }

   //Test API
   @Mutation
   public setTest(elementSent: any[]): void {
      this.tutorials = elementSent;
   }

   private tutorials: any[] = [];
   /*Services Usage*/
   @Action
   private getOneTest(): void {
      TutorialDataService.getTest()
         .then((response) => {
            this.context.commit('setTest', response.data);
            console.log(typeof response.data);
            console.log(response.data);
            for (const element in response.data) {
               console.log(typeof element);
               console.log(element);
            }
         })
         .catch((e) => {
            console.log(e);
         });
   }
}
export default RequeteDeRecherche;
