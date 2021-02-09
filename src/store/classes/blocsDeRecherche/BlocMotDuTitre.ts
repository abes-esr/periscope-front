import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocMotDuTitre extends BlocAbstract {
   private _type = 'CriterionTitleWords'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Et; // ET / OU / SAUF entre les RCR
   private _titleWordsEntered: Array<string> = [];
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

   get titleWordsEntered(): Array<string> {
      return this._titleWordsEntered;
   }

   set titleWordsEntered(value: Array<string>) {
      this._titleWordsEntered = value;
   }

   public titleWordsStringArrayClean(): void {
      this.titleWordsEntered = [];
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
