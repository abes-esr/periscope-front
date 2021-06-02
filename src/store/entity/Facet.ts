/**
 * Représente une facette
 */
import {JsonFacetteItem} from '@/service/periscope/PeriscopeJsonDefinition';

export class Facet {
   /**
    * Construit un objet Facet à partir d'un objet générique JSON
    * @param obj Objet provenant du JSON, les champs peuvent être nuls
    */
   constructor(obj: any = {}) {
      this.zone = obj.zone.toLowerCase();

      if (obj.valeurs == null) {
         this.valeurs = [];
      } else {
         obj.valeurs.forEach((element: JsonFacetteItem) => this.valeurs.push(element));
      }
   }

   zone: string;
   valeurs: Array<JsonFacetteItem> = [];
}
export default Facet;
