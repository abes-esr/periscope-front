import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';
import PeriscopeDataService from '@/axios/services/PeriscopeDataService';
import {AxiosResponse} from 'axios';

/**
 * Cette classe représente le point d'entrée de l'API Periscope.
 */
export class PeriscopeApi {

    /**
     * Recherche les Notices par des critères de recherche
     * @param jsonObject JSON à envoyer
     * @param page Numéro de page
     * @param size Nombre d'élément par page
     */
  static findNoticeByCriteriaByPageAndSize(jsonObject: JsonGlobalSearchRequest, page: number, size:number): Promise<AxiosResponse[]> {

    // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
    return Promise.all([PeriscopeDataService.findNoticesByCriteria(page, size, JSON.stringify(jsonObject))])
      .then((response) => {
        if (response[0].status == 200) {
          return response[0].data;
        } else {
          return response[0].status;
        }
      })
      .catch((err) => {
        console.log(JSON.parse(JSON.stringify(err)));
        const arrayError: Array<string> = [];
        arrayError.push(err.config.baseURL + ' : Erreur de code ' + err.message.replace(/\D/g, ''));
        return arrayError;
        //pour placer des données de retour -> analyser -> return JSON.parse(JSON.stringify(err);
      });
  }
}
