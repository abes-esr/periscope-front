import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocIssn extends BlocAbstract {
   private _type = 'CriterionIssn'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   private _issnEntered = '';
   private _internalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];
   private _externalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   get type(): string {
      return this._type;
   }

   set type(value: string) {
      this._type = value;
   }

   get internalBlocOperator(): Ensemble {
      return this._internalBlocOperator;
   }

   set internalBlocOperator(value: Ensemble) {
      this._internalBlocOperator = value;
   }

   get externalBlocOperator(): Ensemble {
      return this._externalBlocOperator;
   }

   set externalBlocOperator(value: Ensemble) {
      this._externalBlocOperator = value;
   }

   get issnEntered(): string {
      return this._issnEntered;
   }

   set issnEntered(value: string) {
      this._issnEntered = value;
   }

   get issnEnteredInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      arrayString.push(this._issnEntered);
      return arrayString;
   }

   get internalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this._internalBlocOperatorListToSelect;
   }

   set internalBlocOperatorListToSelect(value: Array<OperatorProvider>) {
      this._internalBlocOperatorListToSelect = value;
   }

   get externalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this._externalBlocOperatorListToSelect;
   }

   set externalBlocOperatorListToSelect(value: Array<OperatorProvider>) {
      this._externalBlocOperatorListToSelect = value;
   }
}
