import {Ensemble, ListProvider} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocPays extends BlocAbstract {
   _internalBlocOperator: Ensemble = Ensemble.Ou; //Operateur interne entre les pays
   _selected: Array<string> = [];
   _candidates: Array<ListProvider> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
