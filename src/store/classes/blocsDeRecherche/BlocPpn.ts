import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocPpn extends BlocAbstract {
   private _type = 'CriterionPpn'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   private _ppnEntered = '';
   private _ppnListString: Array<string> = [];
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

   get externalBlocOperator(): Ensemble {
      return this._externalBlocOperator;
   }

   set externalBlocOperator(value: Ensemble) {
      this._externalBlocOperator = value;
   }

   get ppnEntered(): string {
      return this._ppnEntered;
   }

   set ppnEntered(value: string) {
      this._ppnEntered = value;
   }

   get ppnEnteredInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      if (this._ppnEntered.length > 0) {
         arrayString.push(this._ppnEntered);
      }
      return arrayString;
   }

   get ppnListString(): Array<string> {
      return this._ppnListString;
   }

   set ppnListString(value: Array<string>) {
      this._ppnListString = value;
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

   public ppnStringArrayClean(): void {
      this._ppnListString = [];
   }
}
