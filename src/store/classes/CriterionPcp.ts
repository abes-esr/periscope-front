import {Module, Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionPcp} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes PCP.
*/
class CriterionPcp {
   private pcp: Array<string> = [];
   private ppn: Array<string> = [];
   private ppn_operator: Array<string> = [];
   private issn: Array<string> = [];
   private issn_operator: Array<string> = [];
   private rcr: Array<string> = [];
   private rcr_operator: Array<string> = [];
   private title_words: Array<string> = [];
   private title_words_operator: Array<string> = [];
   private editor: Array<string> = [];
   private editor_operator: Array<string> = [];
   private language: Array<string> = [];
   private language_operator: Array<string> = [];
   private country: Array<string> = [];
   private country_operator: Array<string> = [];

   /**
    * Ajoute un code PCP
    * @param value Code PCP
    */
   @Mutation
   public addPcp(value: string): void {
      this.pcp.push(value);
   }

   /**
    * Recupère les codes PCP
    */
   public get getPcp(): Array<string> {
      return this.pcp;
   }

   /**
    * Ajoute un numéro PPN avec son opérateur logique.
    * @param value Numéro PPN
    * @param operator Opérateur logique
    */
   @Mutation
   public addPpn(value: string,operator: Ensemble): void {
      this.ppn.push(value);
      //console.log(Ensemble.Union);
      if (operator == 0) {
         this.ppn_operator.push('ET');
      } else if (operator == 1) {
         this.ppn_operator.push('OU');
      } else if (operator == 2) {
         this.ppn_operator.push('SAUF');
      }
   }

   /**
    * Récupère les numéros PPN
    */
   public get getPpn(): Array<string> {
      return this.ppn;
   }

   /**
    * Récupère les opérateurs logiques entre les numéros PPN
    */
   get getPpnOperator(): Array<string> {
      return this.ppn_operator;
   }

   /**
    * Ajoute un numéro ISSN avec son opérateur logique.
    * @param value Numéro ISSN
    * @param operator Opérateur logique
    */
   @Mutation
   public addIssn(value: string,operator: Ensemble): void {
      this.issn.push(value);

      if (operator == 0) {
         this.issn_operator.push('ET');
      } else if (operator == 1) {
         this.issn_operator.push('OU');
      } else if (operator == 2) {
         this.issn_operator.push('SAUF');
      }
   }

   /**
    * Récupère les numéros ISSN
    */
   public get getIssn(): Array<string> {
      return this.issn;
   }

   /**
    * Récupère les opérateurs logiques entre les numéros ISSN
    */
   get getIssnOperator(): Array<string> {
      return this.issn_operator;
   }

   /**
    * Ajoute un code RCR avec son opérateur logique.
    * @param value Code RCR
    * @param operator Opérateur logique
    */
   @Mutation
   public addRcr(value: string,operator: Ensemble): void {
      this.rcr.push(value);

      if (operator == 0) {
         this.rcr_operator.push('ET');
      } else if (operator == 1) {
         this.rcr_operator.push('OU');
      } else if (operator == 2) {
         this.rcr_operator.push('SAUF');
      }
   }

   /**
    * Récupère les codes RCR
    */
   public get getRcr(): Array<string> {
      return this.rcr;
   }

   /**
    * Récupère les opérateurs logiques entre les codes RCR
    */
   get getRcrOperator(): Array<string> {
      return this.rcr_operator;
   }

   /**
    * Ajoute un mot du titre avec son opérateur logique.
    * @param value Mot du titre
    * @param operator Opérateur logique
    */
   @Mutation
   public addTitleWords(value: string,operator: Ensemble): void {
      this.title_words.push(value);

      if (operator == 0) {
         this.title_words_operator.push('ET');
      } else if (operator == 1) {
         this.title_words_operator.push('OU');
      } else if (operator == 2) {
         this.title_words_operator.push('SAUF');
      }
   }

   /**
    * Récupère les mots du titre
    */
   public get getTitleWords(): Array<string> {
      return this.title_words;
   }

   /**
    * Récupère les opérateurs logiques entre les mots du titre
    */
   get getTitleWordsOperator(): Array<string> {
      return this.title_words_operator;
   }

   /**
    * Ajoute un éditeur avec son opérateur logique.
    * @param value Nom de l'éditeur
    * @param operator Opérateur logique
    */
   @Mutation
   public addEditor(value: string,operator: Ensemble): void {
      this.editor.push(value);

      if (operator == 0) {
         this.editor_operator.push('ET');
      } else if (operator == 1) {
         this.editor_operator.push('OU');
      } else if (operator == 2) {
         this.editor_operator.push('SAUF');
      }
   }

   /**
    * Récupère les éditeurs
    */
   public get getEditor(): Array<string> {
      return this.editor;
   }

   /**
    * Récupère les opérateurs logiques entre les éditeurs
    */
   public get getEditorOperator(): Array<string> {
      return this.editor_operator;
   }

   /**
    * Ajoute un code de langue avec son opérateur logique.
    * @param value Code la langue
    * @param operator Opérateur logique
    */
   @Mutation
   public addLanguage(value: string,operator: Ensemble): void {
      this.language.push(value);

      if (operator == 0) {
         this.language_operator.push('ET');
      } else if (operator == 1) {
         this.language_operator.push('OU');
      } else if (operator == 2) {
         this.language_operator.push('SAUF');
      }
   }

   /**
    * Récupère les codes de langues
    */
   public get getLanguage(): Array<string> {
      return this.language;
   }

   /**
    * Récupère les opérateurs logiques entre les langues
    */
   public get getLanguageOperator(): Array<string> {
      return this.language_operator;
   }

   /**
    * Ajoute un code de pays avec son opérateur logique.
    * @param value Code du pays
    * @param operator Opérateur logique
    */
   @Mutation
   public addCountry(value: string,operator: Ensemble): void {
      this.country.push(value);

      if (operator == 0) {
         this.country_operator.push('ET');
      } else if (operator == 1) {
         this.country_operator.push('OU');
      } else if (operator == 2) {
         this.country_operator.push('SAUF');
      }
   }

   /**
    * Récupère les codes des pays
    */
   public get getCountry(): Array<string> {
      return this.country;
   }

   /**
    * Récupère les opérateurs logiques entre les pays
    */
   public get getCountryOperator(): Array<string> {
      return this.country_operator;
   }
}
export default CriterionPcp;
