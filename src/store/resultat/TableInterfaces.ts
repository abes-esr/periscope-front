export interface TableHeader {
   text: string;
   value: string;
   sortable: boolean;
}

export interface ContentHeader {
   ppn: number;
   continious_type: string;
   issn: number;
   key_title: string;
   editor: string;
   start_year: string;
   end_year: string;
   pcpList: Array<string>;
   rcrLength: number;
   titleComplement: string;
   keyTitleQualifer: string;
   rcrList: Array<string>;
}
