import {CheckboxItem, Operator} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche par PCPP thématiques
 */
export class BlocPcpMetiers extends BlocAbstract {
   _internalBlocOperator = Operator.Et;
   _selected: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés
   _candidates: Array<CheckboxItem> = []; //Tableau des métiers disponibles

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
