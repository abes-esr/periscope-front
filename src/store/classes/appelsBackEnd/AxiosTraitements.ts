import {JsonGlobalSearchRequest} from '@/store/interfaces/JsonInterfaces';
import PeriscopeDataService from '@/axios/services/PeriscopeDataService';
import {AxiosResponse} from 'axios';

export class AxiosTraitements {
   static findNoticeByCriteria(jsonObject: Array<JsonGlobalSearchRequest>): Promise<AxiosResponse[]> {
      // On appelle l'API Periscope
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.findNoticesByCriteria(0, 25, JSON.stringify(jsonObject))])
         .then((response) => {
            if (response[0].status == 200) {
               return response[0].data;
            } else {
               window.alert("Erreur avec l'API Periscope : status " + response[0].status);
            }
         })
         .catch((err) => {
            window.alert("Erreur avec l'API Periscope :" + err);
         });
   }
}
