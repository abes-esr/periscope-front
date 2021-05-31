import {Ensemble, ListProvider} from '@/store/recherche/BlocInterfaces';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ValueError} from '@/store/exception/ValueError';

export class BlocLangue extends BlocAbstract {
   _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   _selected: Array<string> = [];
   _candidates: Array<ListProvider> = [];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   static getItemLabel(candidates:  Array<ListProvider>, key: string): string {
      const index = candidates.findIndex((x) => x.id === key.toLowerCase());

      if (index == -1) {
         throw new ValueError('Language ' + key + ' not found');
      }

      return candidates[index].text;
   }
}
