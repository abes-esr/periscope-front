import {Operator, ListItem} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ValueError} from '@/exception/ValueError';

/**
 * Représente un bloc de recherche de Pcp Rcr
 */
export class BlocPcpRcr extends BlocAbstract {
   _internalBlocOperator: Operator = Operator.Ou; //Operateur interne entre les pays
   _selected: Array<string> = [];
   _candidates: Array<ListItem> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   /**TODO changer
    * Retourne le label du pays passé en paramètre
    * @param candidates Liste des pays
    * @param key Identifiant du pays
    * @return Chaîne de caractère du label du pays
    */
   static getItemLabel(candidates: Array<ListItem>, key: string): string {
      const index = candidates.findIndex((x) => x.id === key.toUpperCase());

      if (index == -1) {
         throw new ValueError(' ' + key + ' not found');
      }

      return candidates[index].text;
   }
}
