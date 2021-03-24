import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {Ensemble, OperatorProvider} from '@/store/interfaces/BlocInterfaces';

export class BlocEditeur extends BlocAbstract {
   _type = 'CriterionEditor'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _editorsEntered: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
