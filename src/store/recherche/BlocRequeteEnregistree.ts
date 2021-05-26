import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';

export class BlocRequeteEnregistree {
   _directRequest: JsonGlobalSearchRequest = {criteres: [], tri: [], facettes: []};
   _historyOfAllRequests: Array<JsonGlobalSearchRequest> = [];
}
