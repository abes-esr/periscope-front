import {Ensemble} from '@/store/classes/RequeteDeRecherche';

export interface RcrProvider {
   id: number;
   value: number;
}

export interface OperatorProvider {
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

export class BlocRcr {
   private _type = 'CriterionRcr'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   private _externalBlocOperator = Ensemble.Ou;
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
