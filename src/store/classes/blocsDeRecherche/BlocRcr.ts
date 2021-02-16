import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export interface RcrProvider {
   id: number;
   value: number;
}

export class BlocRcr extends BlocAbstract {
   private _type = 'CriterionRcr'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   private _rcrHandler: Array<RcrProvider> = []; //Catcheur des RCR saisis
   private _rcrListString: Array<string> = []; //Tableau des RCR en chaîne
   private _internalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
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

   get internalBlocOperator(): number {
      return this._internalBlocOperator;
   }

   set internalBlocOperator(value: number) {
      this._internalBlocOperator = value;
   }

   get internalBlocOperatorInString(): string {
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            return 'OU';
         case Ensemble.Et:
            return 'ET';
         case Ensemble.Sauf:
            return 'SAUF';
         default:
            return 'UNDEFINED';
      }
   }

   get internalBlocOperatorInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this.rcrListString.forEach(() => arrayString.push('OU'));
            break;
         case Ensemble.Et:
            this.rcrListString.forEach(() => arrayString.push('ET'));
            break;
         case Ensemble.Sauf:
            this.rcrListString.forEach(() => arrayString.push('SAUF'));
            break;
         default:
            this.rcrListString.forEach(() => arrayString.push('UNDEFINED'));
            break;
      }
      return arrayString;
   }

   get externalBlocOperator(): number {
      return this._externalBlocOperator;
   }

   set externalBlocOperator(value: number) {
      this._externalBlocOperator = value;
   }

   get rcrHandler(): Array<RcrProvider> {
      return this._rcrHandler;
   }

   set rcrHandler(value: Array<RcrProvider>) {
      this._rcrHandler = value;
   }

   get rcrListString(): Array<string> {
      return this._rcrListString;
   }

   set rcrListString(value: Array<string>) {
      this._rcrListString = value;
   }

   public rcrStringArrayClean(): void {
      this._rcrListString = [];
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
