import {BlocAbstract} from '@/store/api/periscope/criteres/BlocAbstract';
import {Ensemble} from '@/store/recherche/BlocInterfaces';

export class BlocRequeteEnregistree {
  _directRequest = '';
  _historyOfAllRequests: Array<string> = [];
}
