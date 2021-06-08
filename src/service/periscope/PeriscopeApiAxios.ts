import {JsonGlobalSearchRequest} from '@/service/periscope/PeriscopeJsonDefinition';
import PeriscopeDataService from '@/service/periscope/PeriscopeService';
import {AxiosResponse} from 'axios';
import {HttpRequestError} from '@/exception/HttpRequestError';

/**
 * Cette classe représente les appels Axios pour l'API Periscope.
 */
export class PeriscopeApiAxios {
   /**
    * Recherche les Notices par des critères de recherche avec des facettes
    * @param jsonObject JSON à envoyer
    * @param page Numéro de page
    * @param size Nombre d'élément par page
    * @throws HttpRequestError si la requête Http a échoué
    */
   static findNoticeWithFacetsByCriteriaByPageAndSize(jsonObject: JsonGlobalSearchRequest, page: number, size: number): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.findNoticesWithFacetsByCriteria(page, size, JSON.stringify(jsonObject))])
         .then((response) => {
            if (response[0].status == 200) {
               return response[0].data;
            }
         })
         .catch((err) => {
            if (err.response) {
               //TODO modifier le throw pour ajouter le membre method et url de err afin de voir mieux l'erreur, puis supprimer le console.log une fois fait
               console.log(JSON.parse(JSON.stringify(err)));
               throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
            } else {
               throw new HttpRequestError(err.status, err.message);
            }
         });
   }
}
