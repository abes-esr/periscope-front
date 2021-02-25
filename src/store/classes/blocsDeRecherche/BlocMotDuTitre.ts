import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocMotDuTitre extends BlocAbstract {
   _type = 'CriterionTitleWords'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   _titleWordsEntered: Array<string> = [];
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

   get internalBlocOperatorInArrayString(): Array<string> {
      const pcpInArrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this._titleWordsEntered.forEach(() => pcpInArrayString.push('OU'));
            break;
         case Ensemble.Et:
            this._titleWordsEntered.forEach(() => pcpInArrayString.push('ET'));
            break;
         case Ensemble.Sauf:
            this._titleWordsEntered.forEach(() => pcpInArrayString.push('SAUF'));
            break;
         default:
            this._titleWordsEntered.forEach(() => pcpInArrayString.push('UNDEFINED'));
            break;
      }
      return pcpInArrayString;
   }

   get titleWordsEnteredInString(): string {
      let stringBuild = '';
      this._titleWordsEntered.forEach((element) => (stringBuild += element + ' '));
      return stringBuild;
   }

   static test(a: number, b: number): number{
      return a + b;
   }
}
