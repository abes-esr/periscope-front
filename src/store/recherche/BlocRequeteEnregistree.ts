import {JsonGlobalSearchRequest} from '@/service/periscope/PeriscopeJsonDefinition';

/**
 * Représente une requête de recherche
 */
export class BlocRequeteEnregistree {
   _directRequest: JsonGlobalSearchRequest = {criteres: [], tri: [], facettes: [], filtresFacettes: []};
   _historyOfAllRequests: Array<JsonGlobalSearchRequest> = [];
}
