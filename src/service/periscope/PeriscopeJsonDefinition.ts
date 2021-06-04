/**
 * Définitions des formats Json utilisés par l'API Periscope
 */
import Notice from '@/store/entity/Notice';

export interface JsonCriteres {}

export interface JsonTri {
   sort: string;
   order: string;
}

export interface JsonGlobalSearchRequest {
   criteres: Array<JsonCriteres>;
   tri: Array<JsonTri>;
   facettes: Array<JsonFacetteRequest>;
}

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
   rcr_operator: Array<string>;
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
   title_words: Array<string>;
   title_words_operator: Array<string>;
}

export interface JsonEditeurProvider {
   type: string;
   bloc_operator: string;
   editors: Array<string>;
   editors_operator: Array<string>;
}

export interface JsonPaysProvider {
   type: string;
   bloc_operator: string;
   countries: Array<string>;
   countries_operator: Array<string>;
}

export interface JsonPaysProvider {
   type: string;
   bloc_operator: string;
   countries: Array<string>;
   countries_operator: Array<string>;
}

export interface JsonLanguesProvider {
   type: string;
   bloc_operator: string;
   language: Array<string>;
   language_operator: Array<string>;
}

export interface JsonTriProvider {
   sort: string;
   order: string;
}

export interface APIResponse {
   notice: Array<Notice>;
   facettes: Array<string>;
   nbPages: number;
   nbNotices: number;
}

export interface JsonFacetteRequest {
   zone: string;
}

export interface JsonFacetteItem {
   key: string;
   occurrence: number;
}