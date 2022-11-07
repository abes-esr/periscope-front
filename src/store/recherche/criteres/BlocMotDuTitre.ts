import {Operator} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche par mot du titre
 */
export class BlocMotDuTitre extends BlocAbstract {
   _internalBlocOperator = Operator.Et;
   _selected: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
