export interface JsonPcpBlocProvider {
   type: string;
   bloc_operator: string;
   pcp: Array<string>;
   pcp_operator: Array<string>;
}

export interface JsonRcrBlocProvider {
   type: string;
   bloc_operator: string;
   rcr: Array<string>;
   rcr_operator: string;
}

export interface JsonPpnBlocProvider {
   type: string;
   bloc_operator: string;
   ppn: Array<string>;
}

export interface JsonIssnBlocProvider {
   type: string;
   bloc_operator: string;
   issn: Array<string>;
}

export interface JsonMotsDuTitreProvider {
   type: string;
   bloc_operator: string;
   titleWords: Array<string>;
   titleWordsOperator: Array<string>;
}
