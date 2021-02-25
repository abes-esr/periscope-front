import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocIssn extends BlocAbstract {
   _type = 'CriterionIssn'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _issnEntered = '';
   _internalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];
   _externalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   get issnEnteredInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      if (this._issnEntered.length > 0) {
         arrayString.push(this._issnEntered);
      }
      return arrayString;
   }
}
