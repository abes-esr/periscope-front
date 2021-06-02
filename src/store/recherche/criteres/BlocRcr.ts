import {Operator} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche par numéro RCR
 */
export class BlocRcr extends BlocAbstract {
   _internalBlocOperator = Operator.Ou;
   _selected: Array<string> = []; //Tableau des RCR en chaîne

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
