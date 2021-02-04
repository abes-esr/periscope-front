import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionCountry} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes pays.
 */

class CriterionCountry {
   private type = 'CriterionCountry'; //Valeur fixe définie par l'API
   private bloc_operator: string;
   private countries: Array<string> = [];
   private countries_operator: Array<string> = [];

   /**
    * Construit un objet CriterionCountry à partir d'un connecteur logique
    * @param operator Ensemble : connecteur logique du bloc
    */
   constructor(operator?: Ensemble) {
      //console.log(Ensemble.Union);
      if (operator) {
         if (operator == 0) {
            this.bloc_operator = 'ET';
         } else if (operator == 1) {
            this.bloc_operator = 'OU';
         } else if (operator == 2) {
            this.bloc_operator = 'SAUF';
         }
      } else {
         this.bloc_operator = 'ET'; //(1er bloc) Par défaut
      }
   }

   /**
    * Recupère le type de critère
    */
   public get getType(): string {
      return this.type;
   }

   /**
    * Recupère le connecteur logique du bloc
    */
   public get getBlocOperator(): string {
      return this.bloc_operator;
   }

   /**
    * Ajoute un code pays
    * @param value Code pays
    * @param operator Connecteur logique
    */
   @Mutation
   public addCountry(value: string,operator: Ensemble): void {
      this.countries.push(value);
      if (operator == 0) {
         this.countries_operator.push('ET');
      } else if (operator == 1) {
         this.countries_operator.push('OU');
      } else if (operator == 2) {
         this.countries_operator.push('SAUF');
      }
   }

   /**
    * Recupère les codes pays
    */
   public get getCountries(): Array<string> {
      return this.countries;
   }

   /**
    * Recupère les connecteurs logiques entre les codes pays
    */
   public get getCountriesOperator(): Array<string> {
      return this.countries_operator;
   }
}
export default CriterionCountry;
