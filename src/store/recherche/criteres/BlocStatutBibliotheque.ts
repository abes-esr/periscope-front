import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {BlocStatutsBiblio, EnumStatuts, Operator} from '@/store/recherche/BlocDefinition';

export class BlocStatutBibliotheque extends BlocAbstract {
   _internalBlocOperator = Operator.Et;
   _candidates: Array<BlocStatutsBiblio> = [];
   _selected: EnumStatuts | boolean;

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
      this._selected = false;
   }
}
