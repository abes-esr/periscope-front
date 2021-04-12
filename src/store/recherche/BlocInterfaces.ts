export interface OperatorProvider {
   //Operateurs de bloc
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

export interface CheckboxesProvider {
   //Tableaux de cases à cocher
   id: number;
   key: string;
   text: string;
   value: boolean;
}

export interface ListProvider {
   //Liste d'éléments à selectionner
   id: string;
   text: string;
}

export enum Ensemble { //Conversion implicite en number
   Ou,
   Et,
   Sauf,
}
