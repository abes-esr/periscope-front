import {BlocAbstract, Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export interface RcrProvider {
   id: number;
   value: number;
}

export class BlocRcr extends BlocAbstract {
   _type = 'CriterionRcr'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _rcrHandler: Array<RcrProvider> = []; //Catcheur des RCR saisis non utilisé actuellement
   _rcrListString: Array<string> = []; //Tableau des RCR en chaîne
   _internalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
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
            this._rcrListString.forEach(() => arrayString.push('OU'));
            break;
         case Ensemble.Et:
            this._rcrListString.forEach(() => arrayString.push('ET'));
            break;
         case Ensemble.Sauf:
            this._rcrListString.forEach(() => arrayString.push('SAUF'));
            break;
         default:
            this._rcrListString.forEach(() => arrayString.push('UNDEFINED'));
            break;
      }
      return arrayString;
   }
}
