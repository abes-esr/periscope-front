import {Operator, BlocOperator} from '@/store/recherche/BlocDefinition';

/**
 * Representé un bloc abstrait de recherche
 */
export abstract class BlocAbstract {
   _externalBlocOperator: number;
   _internalBlocOperatorListToSelect: Array<BlocOperator> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Operator.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Operator.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Operator.Sauf},
   ];
   _externalBlocOperatorListToSelect: Array<BlocOperator> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Operator.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Operator.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Operator.Sauf},
   ];
   protected constructor(externalBlocOperator: number) {
      this._externalBlocOperator = externalBlocOperator;
   }

   /**
    * Converti un enum opérateur de bloc en label
    * @param operator Enum opérateur de bloc
    * @return Chaîne de caractère de l'opérateur
    */
   static convertBlocOperatorToLabel(operator: number): string {
      switch (operator) {
         case Operator.Ou:
            return 'OU';
         case Operator.Et:
            return 'ET';
         case Operator.Sauf:
            return 'SAUF';
         default:
            return 'UNDEFINED';
      }
   }

   /**
    * Construit une liste de label d'enum d'opérateur avec le nombre d'élement passé en paramètre
    * Exemple : Utilisé pour construire les opérateurs de la liste des PCPP régionaux
    * @param operator  Enum opérateur de bloc
    * @param numberOfElements Nombre d'élement de la liste à retourner
    * @return Liste de label d'énum d'opértareur
    */
   static getSameNumberOfIdenticalOperatorFromNumberOfElements(operator: number, numberOfElements: number): Array<string> {
      const arrayOfIdenticalOperatorToReturn: Array<string> = [];
      for (let i = 0; i < numberOfElements; i++) {
         arrayOfIdenticalOperatorToReturn.push(BlocAbstract.convertBlocOperatorToLabel(operator));
      }
      return arrayOfIdenticalOperatorToReturn;
   }
}
