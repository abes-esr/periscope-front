import {CheckboxItem, Operator} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

/**
 * Représente un bloc de recherche par PCP Régions
 */
export class BlocPcpRegions extends BlocAbstract {
   _internalBlocOperator = Operator.Et; // ET / Ou entre les PCP
   _selected: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés
   _candidates: Array<CheckboxItem> = []; //Tableau des regions disponibles

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}
