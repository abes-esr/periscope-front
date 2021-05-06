import {TriTableauInterface} from '@/store/resultat/TriTableauInterface';
import {Logger} from '@/store/utils/Logger';

export class BlocTri {
   _array: Array<TriTableauInterface> = [];

   static updateArray(blocTri: BlocTri, elements: Array<string>): void {
      blocTri._array = [];
      for (let i = 0; i < elements.length / 2; i++) {
         blocTri._array.push({sort: elements[i * 2], order: elements[i * 2 + 1]});
      }
   }

   static getLabelElements(blocTri: BlocTri): Array<string> {
      const arrayToReturn: Array<string> = [];
      for (let i = 0; i < blocTri._array.length; i++) {
         arrayToReturn.push(blocTri._array[i].sort);
      }
      return arrayToReturn;
   }

   static getBooleanElements(blocTri: BlocTri): Array<boolean> {
      const arrayToReturn: Array<boolean> = [];
      for (let i = 0; i < blocTri._array.length; i++) {
         if (blocTri._array[i].order === 'ASC') {
            arrayToReturn.push(false);
         } else {
            arrayToReturn.push(true);
         }
      }
      return arrayToReturn;
   }

   static changeElement(blocTri: BlocTri, element: string, order: string): void {
      if (blocTri._array.find((x: {sort: string}) => (x.sort = element))) {
         for (let i = 0; i < blocTri._array.length; i++) {
            if (blocTri._array[i].sort === element) {
               blocTri._array[i].order = order;
            }
         }
      } else {
         const item: TriTableauInterface = {sort: element, order: order};
         blocTri._array.push(item);
      }
   }

   static removeElement(blocTri: BlocTri, element: string): void {
      for (let i = 0; i < blocTri._array.length; i++) {
         if (blocTri._array[i].sort === element) {
            blocTri._array.splice(i--, 1);
         }
      }
   }
}
