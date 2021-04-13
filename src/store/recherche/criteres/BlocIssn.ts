import {Ensemble} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocIssn extends BlocAbstract {
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
