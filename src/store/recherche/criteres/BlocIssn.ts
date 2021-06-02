import {Operator} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche par numéro ISSN
 */
export class BlocIssn extends BlocAbstract {
   _internalBlocOperator = Operator.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
