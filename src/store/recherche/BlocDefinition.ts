/**
 * Définitions des structures de données utilisées dans les blocs de recherche
 */
export interface BlocOperator {
   //Operateurs de bloc
   id: number;
   key: string;
   text: string;
   value: Operator;
}

export interface CheckboxItem {
   //Tableaux de cases à cocher
   id: number;
   key: string;
   text: string;
   value: boolean;
}

export interface ListItem {
   //Liste d'éléments à selectionner
   id: string;
   text: string;
   value: boolean;
}

export interface BlocStatutsBiblio {
   id: number;
   text: string;
   value: EnumStatuts,
}

export enum Operator { //Conversion implicite en number
   Ou,
   Et,
   Sauf,
}

export enum EnumStatuts {
   PC,
   PA,
   Orphelin,
}
