/**
 * Représente une état de collection
 */
import {JsonSequenceItem} from '@/service/periscope/PeriscopeJsonDefinition';

export class Holding {
   /**
    * Construit un objet Holding à partir d'un objet générique JSON
    * @param obj Objet provenant du JSON, les champs peuvent être nuls
    */
   constructor(obj: any = {}) {
      this.etatCollection = obj.etatCollection;

      if (obj.sequences == null) {
         this.sequences = [];
      } else {
         obj.sequences.forEach((element: JsonSequenceItem) => {
            const sequence: JsonSequenceItem = {anneeDebut: element.anneeDebut, anneeFin: element.anneeFin,typeSequence: element.typeSequence,rcr:element.rcr};
            this.sequences.push(sequence);
         })
      }

      if (obj.erreurs == null) {
         this.erreurs = [];
      } else {
         obj.erreurs.forEach((element: string) => this.erreurs.push(element));
      }
   }

   etatCollection: string;
   erreurs: Array<string> = [];
   sequences: Array<JsonSequenceItem> = [];
}
export default Holding;
