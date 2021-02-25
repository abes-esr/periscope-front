import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocPpn extends BlocAbstract {
   _type = 'CriterionPpn'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _ppnEntered = '';
   _ppnListString: Array<string> = [];
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

   get internalBlocOperatorInString(): string {
      switch (this._internalBlocOperator) {
         case Ensemble.Et:
            return 'Et';
         case Ensemble.Ou:
            return 'Ou';
         case Ensemble.Sauf:
            return 'Sauf';
         default:
            return 'Non défini';
      }
   }

   get ppnEnteredInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      if (this._ppnEntered.length > 0) {
         arrayString.push(this._ppnEntered);
      }
      return arrayString;
   }
}
