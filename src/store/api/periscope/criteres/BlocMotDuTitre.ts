import {BlocAbstract} from '@/store/api/periscope/criteres/BlocAbstract';
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';

export class BlocMotDuTitre extends BlocAbstract {
   _type = 'CriterionTitleWords'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _titleWordsEntered: Array<string> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
