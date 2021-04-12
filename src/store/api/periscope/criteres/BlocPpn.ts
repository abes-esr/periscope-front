import {BlocAbstract} from '@/store/api/periscope/criteres/BlocAbstract';
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';

export class BlocPpn extends BlocAbstract {
   _type = 'CriterionPpn'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _ppnListString: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
