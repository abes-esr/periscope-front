import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocEditeur extends BlocAbstract {
   private _type = 'CriterionEditor'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   private _editorEntered: Array<string> = [];
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

   get editorEntered(): Array<string> {
      return this._editorEntered;
   }

   set editorEntered(value: Array<string>) {
      this._editorEntered = value;
   }

   get editorEnteredEnteredInString(): string {
      let stringBuild = '';
      this._editorEntered.forEach((element) => (stringBuild += element + ' '));
      return stringBuild;
   }

   public editeurStringArrayClean(): void {
      this._editorEntered = [];
   }

   get internalBlocOperator(): Ensemble {
      return this._internalBlocOperator;
   }

   set internalBlocOperator(value: Ensemble) {
      this._internalBlocOperator = value;
   }

   get internalBlocOperatorInArrayString(): Array<string> {
      const pcpInArrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this._editorEntered.forEach(() => pcpInArrayString.push('Ou'));
            break;
         case Ensemble.Et:
            this._editorEntered.forEach(() => pcpInArrayString.push('Et'));
            break;
         case Ensemble.Sauf:
            this._editorEntered.forEach(() => pcpInArrayString.push('Sauf'));
            break;
         default:
            this._editorEntered.forEach(() => pcpInArrayString.push('Undefined'));
            break;
      }
      return pcpInArrayString;
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
