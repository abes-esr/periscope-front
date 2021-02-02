import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionRcr} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes RCR.
 */

class CriterionRcr {
   private type = 'CriterionRcr'; //Valeur fixe définie par l'API
   private bloc_operator: string;
   private rcr: Array<string> = [];
   private rcr_operator: Array<string> = [];

   /**
    * Construit un objet CriterionRcr à partir d'un connecteur logique
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
    * Ajoute un code RCR
    * @param value Code RCR
    * @param operator Connecteur logique
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
    * Recupère les codes RCR
    */
   public get getRcr(): Array<string> {
      return this.rcr;
   }

   /**
    * Recupère les connecteurs logiques entre les codes RCR
    */
   public get getRcrOperator(): Array<string> {
      return this.rcr_operator;
   }
}
export default CriterionRcr;
