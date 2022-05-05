import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche de Pcp Rcr
 */
export class BlocPcpRcr extends BlocAbstract {
   _rcr: string;
   _pcp: string;

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
