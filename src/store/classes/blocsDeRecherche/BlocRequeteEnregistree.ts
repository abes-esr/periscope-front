import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {Ensemble} from '@/store/interfaces/BlocInterfaces';

export class BlocRequeteEnregistree {
  _directRequest = '';
  _historyOfAllRequests: Array<string> = [];
}
