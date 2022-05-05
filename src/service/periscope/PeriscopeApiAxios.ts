import {JsonGlobalSearchRequest, JsonDetailNotice} from '@/service/periscope/PeriscopeJsonDefinition';
import PeriscopeDataService from '@/service/periscope/PeriscopeService';
import {AxiosResponse} from 'axios';
import {HttpRequestError} from '@/exception/HttpRequestError';

/**
 * Cette classe représente les appels Axios pour l'API Periscope.
 */
export class PeriscopeApiAxios {
   /**
    * Recherche les Notices par des critères de recherche sans facettes
    * @param jsonObject JSON à envoyer
    * @param page Numéro de page
    * @param size Nombre d'élément par page
    * @throws HttpRequestError si la requête Http a échoué
    */
   static findNoticeByCriteriaByPageAndSize(jsonObject: JsonGlobalSearchRequest, page: number, size: number): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.findNoticesByCriteria(page, size, jsonObject)])
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
      return Promise.all([PeriscopeDataService.findNoticesWithFacetsByCriteria(page, size, jsonObject)])
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
    * Récupère l'état de collection d'une notice à partir de son PPN
    * @param ppn Numéro PPN de la noticer
    * @param typeSequence Filtre sur les types de séquences
    * @throws HttpRequestError si la requête Http a échoué
    */
   //Periscope V3
   static getHoldingsFromPpn(ppn: string, typeSequence?: string): Promise<AxiosResponse[]> {
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.getHoldingsFromPpn(ppn, typeSequence)])
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

   static getInfosNotices(ppn: string): Promise<AxiosResponse> {
      return PeriscopeDataService.getNotice(ppn).then((response) => {
         return response;
      });
   }
}
