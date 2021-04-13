import {CheckboxesProvider, Ensemble} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

export class BlocPcpMetiers extends BlocAbstract {
   _internalBlocOperator = Ensemble.Et; // ET / Ou entre les PCP
   _selected: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés
   //Tableau des métiers, avec leur état coché non coché persistant
   _candidates: Array<CheckboxesProvider> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
