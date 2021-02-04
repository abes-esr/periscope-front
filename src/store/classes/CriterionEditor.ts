import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionEditor} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs éditeurs.
 */

class CriterionEditor {
   private type = 'CriterionEditor'; //Valeur fixe définie par l'API
   private bloc_operator: string;
   private editors: Array<string> = [];
   private editors_operator: Array<string> = [];

   /**
    * Construit un objet CriterionEditor à partir d'un connecteur logique
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
    * Ajoute un éditeur
    * @param value editeur
    * @param operator Connecteur logique
    */
   @Mutation
   public addEditor(value: string,operator: Ensemble): void {
      this.editors.push(value);
      if (operator == 0) {
         this.editors_operator.push('ET');
      } else if (operator == 1) {
         this.editors_operator.push('OU');
      } else if (operator == 2) {
         this.editors_operator.push('SAUF');
      }
   }

   /**
    * Recupère les éditeurs
    */
   public get getEditors(): Array<string> {
      return this.editors;
   }

   /**
    * Recupère les connecteurs logiques entre les éditeurs
    */
   public get getEditorsOperator(): Array<string> {
      return this.editors_operator;
   }
}
export default CriterionEditor;
