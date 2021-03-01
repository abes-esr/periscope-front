export interface TableHeader {
   text: string;
   value: string;
}

export interface ContentHeader {
   ppn: number;
   continiousType: string;
   issn: number;
   keyTitle: string;
   editor: string;
   startDate: string;
   endDate: string;
   pcpList: Array<string>;
   rcrLength: number;
   titleComplement: string;
   keyTitleQualifer: string;
   rcrList: Array<string>;
}
