import {Ensemble} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocRcr extends BlocAbstract {
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = []; //Tableau des RCR en chaîne

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
