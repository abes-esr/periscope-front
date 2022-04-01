/**
 * Définitions des formats Json utilisés par l'API Periscope
 */
import Notice from '@/store/entity/Notice';
import Holding from '@/store/entity/Holding';
import {FacetteType} from "@/store/recherche/filtresFacettes/FiltresFacettes";

export interface JsonTri {
   sort: string;
   order: string;
}

export interface JsonGlobalSearchRequest {
   criteres: [];
   tri: Array<JsonTri>;
   facettes: Array<JsonFacetteRequest>;
   filtresFacettes: Array<FacetteType>;
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

export interface APISearchResponse {
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

export interface APIHoldingsResponse {
   holdings: Array<Holding>;
}

export interface JsonSequenceItem {
   anneeDebut: string;
   anneeFin: string;
   typeSequence: string;
   rcr: number;
}
