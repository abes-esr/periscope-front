import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionPcp} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes PCP.
 */

class CriterionPcp {
   private type = 'CriterionPcp'; //Valeur fixe définie par l'API
   private bloc_operator: string;
   private pcp: Array<string> = [];
   private pcp_operator: Array<string> = [];

   /**
    * Construit un objet CriterionPcp à partir d'un connecteur logique
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
    * Ajoute un code PCP
    * @param value Code PCP
    */
   @Mutation
   public addPcp(value: string,operator?: Ensemble): void {
      this.pcp.push(value);
      if(operator) {
         if (operator == 0) {
            this.pcp_operator.push('ET');
         } else if (operator == 1) {
            this.pcp_operator.push('OU');
         } else if (operator == 2) {
            this.pcp_operator.push('SAUF');
         }
      }else {
         this.pcp_operator.push('OU'); //Par défaut
      }
   }

   /**
    * Recupère les codes PCP
    */
   public get getPcp(): Array<string> {
      return this.pcp;
   }

   /**
    * Recupère les connecteurs logiques entre les codes PCP
    */
   public get getPcpOperator(): Array<string> {
      return this.pcp_operator;
   }
}
export default CriterionPcp;
