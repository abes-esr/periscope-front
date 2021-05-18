import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';

export class BlocRequeteEnregistree {
   _directRequest: JsonGlobalSearchRequest;
   _historyOfAllRequests: Array<JsonGlobalSearchRequest> = [];
}
