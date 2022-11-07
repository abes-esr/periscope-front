import Holding from '@/store/entity/Holding';

/**
 * Représente les lots d'état de collections
 */
export class LotHoldings {
   _holdings: Array<Holding> = [];
   _ppn = 'unset';
   _typeSequence = 'unset';
   _rcrList: Array<string> = [];
}
