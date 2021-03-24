import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {Ensemble, OperatorProvider} from '@/store/interfaces/BlocInterfaces';

export interface RcrProvider {
   id: number;
   value: number;
}

export class BlocRcr extends BlocAbstract {
   _type = 'CriterionRcr'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _rcrListString: Array<string> = []; //Tableau des RCR en chaîne

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
