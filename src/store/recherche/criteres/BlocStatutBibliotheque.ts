import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ListItem, Operator} from '@/store/recherche/BlocDefinition';

export class BlocStatutBibliotheque extends BlocAbstract {
   _internalBlocOperator = Operator.Et;
   _candidates: Array<ListItem> = [];
   _selected: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
