import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocEditeur extends BlocAbstract {
   _type = 'CriterionEditor'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _editorsEntered: Array<string> = [];
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

   get editorEnteredEnteredInString(): string {
      let stringBuild = '';
      this._editorsEntered.forEach((element) => (stringBuild += element + ' '));
      return stringBuild;
   }

   get internalBlocOperatorInArrayString(): Array<string> {
      const pcpInArrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this._editorsEntered.forEach(() => pcpInArrayString.push('OU'));
            break;
         case Ensemble.Et:
            this._editorsEntered.forEach(() => pcpInArrayString.push('ET'));
            break;
         case Ensemble.Sauf:
            this._editorsEntered.forEach(() => pcpInArrayString.push('SAUF'));
            break;
         default:
            this._editorsEntered.forEach(() => pcpInArrayString.push('UNDEFINED'));
            break;
      }
      return pcpInArrayString;
   }
}
