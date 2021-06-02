import {Operator, ListItem} from '@/store/recherche/BlocDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ValueError} from '@/exception/ValueError';

/**
 * Représente un bloc de recherche par langue
 */
export class BlocLangue extends BlocAbstract {
   _internalBlocOperator = Operator.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];
   _candidates: Array<ListItem> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   /**
    * Retourne le label de la langue passée en paramètre
    * @param candidates Liste des langues
    * @param key Identifiant de la langue
    * @return Chaîne de caractère du label de la langue
    */
   static getItemLabel(candidates: Array<ListItem>, key: string): string {
      const index = candidates.findIndex((x) => x.id === key.toLowerCase());

      if (index == -1) {
         throw new ValueError('Language ' + key + ' not found');
      }

      return candidates[index].text;
   }
}
