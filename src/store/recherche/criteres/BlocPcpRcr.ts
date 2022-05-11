import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ListItem} from "@/store/recherche/BlocDefinition";


/**
 * Représente un bloc de recherche de Pcp Rcr
 */
export class BlocPcpRcr extends BlocAbstract {
   _rcr: string;
   _pcp: string;
   _pcpCandidates: Array<ListItem> = [];
   _rcrCandidates: Array<ListItem> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
