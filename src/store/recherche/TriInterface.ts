export interface TriInterface {
   sort: TriType;
   order: OrderType;
}

export enum TriType {
   // Le nom du champs doit correspondre à celui de la Notice
   ppn, // => Notice.ppn
   issn, // => Notice.issn
   pcpList, // => Notice.pcpList
   rcrList, // => Notice.rcrList
   nbLoc, // => Notice.nbLoc
   startDate, // => Notice.startDate
   endDate, // => Notice.endDate
   keyTitle, // => Notice.keyTitle
   editor, // => Notice.editor
   linkSudoc, // => Notice.linkSudoc
   continiousType, // => Notice.continiousType
}

export enum OrderType {
   ASC,
   DESC,
}
