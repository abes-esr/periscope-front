export interface TableHeader {
   text: string;
   value: string;
   sortable: boolean;
}

export interface ContentHeader {
   ppn: number;
   continious_type: string;
   issn: number;
   title: string;
   editor: string;
   start_year: string;
   end_year: string;
   pcpList: Array<string>;
   rcrLength: number;
   rcrList: Array<string>;
}
