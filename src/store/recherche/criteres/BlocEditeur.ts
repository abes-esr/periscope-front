import {Ensemble} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocEditeur extends BlocAbstract {
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
