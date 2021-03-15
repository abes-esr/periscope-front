import {TriTableauInterface} from '@/store/interfaces/TriTableauInterface';

export class BlocTri {
   _array: Array<TriTableauInterface> = [];

   static updateArray(blocTri: BlocTri, elements: Array<string>): void {
      blocTri._array = [];
      console.log(JSON.stringify(elements));
      for (let i = 0; i < elements.length / 2; i++) {
         //TODO faire sauter la condition quand la date de fin sera indexable
         if (elements[i * 2] != 'endDate') {
            blocTri._array.push({sort: BlocTri.labelConverter(elements[i * 2]), order: elements[i * 2 + 1]});
         }
      }
   }

   static labelConverter(label: string): string {
      switch (label) {
         case 'ppn':
            return 'PPN';
         case 'continiousType':
            return 'CONTINIOUS_TYPE';
         case 'issn':
            return 'ISSN';
         case 'keyTitle':
            return 'KEY_TITLE';
         case 'editor':
            return 'EDITOR';
         case 'startDate':
            return 'PROCESSING_GLOBAL_DATA';
         case 'endDate':
            return 'currently unavailable';
         case 'pcpList':
            return 'PCP_LIST';
         default:
            return 'UNDEFINED';
      }
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