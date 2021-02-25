import {Ensemble} from '@/store/interfaces/BlocInterfaces';

export abstract class BlocAbstract {
   _externalBlocOperator: number;

   protected constructor(externalBlocOperator: number) {
      this._externalBlocOperator = externalBlocOperator;
   }

   static convertBlocOperatorInString(operator: number): string {
      switch (operator) {
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

   static getSameNumberOfIdenticalOperatorFromNumberOfElements(operator: number, numberOfElements: number): Array<string> {
      const arrayOfIdenticalOperatorToReturn: Array<string> = [];
      switch (operator) {
         case Ensemble.Ou:
            for (let i = 0; i < numberOfElements; i++) {
               arrayOfIdenticalOperatorToReturn.push('OU');
            }
            break;
         case Ensemble.Et:
            for (let i = 0; i < numberOfElements; i++) {
               arrayOfIdenticalOperatorToReturn.push('ET');
            }
            break;
         case Ensemble.Sauf:
            for (let i = 0; i < numberOfElements; i++) {
               arrayOfIdenticalOperatorToReturn.push('SAUF');
            }
            break;
         default:
            for (let i = 0; i < numberOfElements; i++) {
               arrayOfIdenticalOperatorToReturn.push('UNDEFINED');
            }
            break;
      }
      return arrayOfIdenticalOperatorToReturn;
   }
}
