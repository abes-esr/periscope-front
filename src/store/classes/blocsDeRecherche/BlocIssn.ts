import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {Ensemble, OperatorProvider} from '@/store/interfaces/BlocInterfaces';

export class BlocIssn extends BlocAbstract {
   _type = 'CriterionIssn'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _issnListString: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
