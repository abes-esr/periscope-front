import {OrderType, TriInterface, TriType} from '@/store/recherche/TriInterface';

export class BlocTri {
   _array: Array<TriInterface> = [];

   static getLabelElements(blocTri: BlocTri): Array<string> {
      const arrayToReturn: Array<string> = [];
      for (let i = 0; i < blocTri._array.length; i++) {
         arrayToReturn.push(TriType[blocTri._array[i].sort]);
      }
      return arrayToReturn;
   }

   static getBooleanElements(blocTri: BlocTri): Array<boolean> {
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
