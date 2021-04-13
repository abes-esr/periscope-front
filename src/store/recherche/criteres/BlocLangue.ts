import {Ensemble, ListProvider} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocLangue extends BlocAbstract {
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];
   _candidates: Array<ListProvider> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
