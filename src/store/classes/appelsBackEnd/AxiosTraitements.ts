import {JsonGlobalSearchRequest} from '@/store/interfaces/JsonInterfaces';
import PeriscopeDataService from '@/axios/services/PeriscopeDataService';
import {AxiosResponse} from 'axios';

export class AxiosTraitements {
  static findNoticeByCriteriaByPageAndSize(jsonObject: JsonGlobalSearchRequest, page: number, size:number): Promise<AxiosResponse[]> {
    // On appelle l'API Periscope
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
