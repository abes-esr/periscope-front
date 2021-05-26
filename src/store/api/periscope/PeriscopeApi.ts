import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';
import PeriscopeDataService from '@/store/api/periscope/PeriscopeDataService';
import {AxiosResponse} from 'axios';
import {HttpRequestError} from '@/store/exception/HttpRequestError';

/**
 * Cette classe représente le point d'entrée de l'API Periscope.
 */
export class PeriscopeApi {
   /**
    * Recherche les Notices par des critères de recherche
    * @param jsonObject JSON à envoyer
    * @param page Numéro de page
    * @param size Nombre d'élément par page
    * @throws HttpRequestError si la requête Http a échoué
    */
   static findNoticeByCriteriaByPageAndSize(jsonObject: JsonGlobalSearchRequest, page: number, size: number): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.findNoticesByCriteria(page, size, JSON.stringify(jsonObject))])
         .then((response) => {
            if (response[0].status == 200) {
               return response[0].data;
            }
         })
         .catch((err) => {
            if (err.response) {
               throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
            } else {
               throw new HttpRequestError(err.status, err.message);
            }
         });
   }

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
               throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
            } else {
               throw new HttpRequestError(err.status, err.message);
            }
         });
   }

   /**
    * Récupère la liste des codes PCP Régions
    * @throws HttpRequestError si la requête Http a échoué
    */
   static getPcpRegionList(): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.getPcpRegionList()])
         .then((response) => {
            if (response[0].status == 200) {
               return response[0].data;
            }
         })
         .catch((err) => {
            throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
         });
   }

   /**
    * Récupère la liste des codes PCP Métiers
    * @throws HttpRequestError si la requête Http a échoué
    */
   static getPcpMetierList(): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.getPcpMetierList()])
         .then((response) => {
            if (response[0].status == 200) {
               return response[0].data;
            }
         })
         .catch((err) => {
            throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
         });
   }
}
