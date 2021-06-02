import {OrderType, TriDefinition, TriType} from '@/store/recherche/TriDefinition';

/**
 * Représente un tri
 */
export class BlocTri {
   _array: Array<TriDefinition> = [];

   /**
    * Construit une liste des labels du tri passé en paramètre
    * @param blocTri Tri à convertir
    * @return Liste de chaîne de caractères
    */
   static getTriLabels(blocTri: BlocTri): Array<string> {
      const arrayToReturn: Array<string> = [];
      for (let i = 0; i < blocTri._array.length; i++) {
         arrayToReturn.push(TriType[blocTri._array[i].sort]);
      }
      return arrayToReturn;
   }

   /**
    * Construit une liste de booléen des ordre du tri passé en paramètre
    * @param blocTri Tri à convertir
    * @return Liste de chaîne de booléens
    */
   static getTriOrderBooleans(blocTri: BlocTri): Array<boolean> {
      const arrayToReturn: Array<boolean> = [];
      for (let i = 0; i < blocTri._array.length; i++) {
         if (blocTri._array[i].order === OrderType.ASC) {
            arrayToReturn.push(false);
         } else {
            arrayToReturn.push(true);
         }
      }
      return arrayToReturn;
   }
}
