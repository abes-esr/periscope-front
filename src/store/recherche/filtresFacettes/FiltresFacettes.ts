export class FiltresFacettes {
   _filters: Array<FacetteType>;

   constructor() {
      this._filters = [
         {zone: 'document_type', valeurs: []},
         {zone: 'support_type', valeurs: []},
         {zone: 'country', valeurs: []},
         {zone: 'language', valeurs: []},
      ];
   }
}

export interface FacetteType {
   zone: string;
   valeurs: Array<string>;
}
