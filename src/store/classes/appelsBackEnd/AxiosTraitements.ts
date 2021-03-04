import {JsonGlobalSearchRequest} from '@/store/interfaces/JsonInterfaces';
import PeriscopeDataService from '@/axios/services/PeriscopeDataService';
import {AxiosResponse} from 'axios';

export class AxiosTraitements {
   static findNoticeByCriteria(jsonObject: Array<JsonGlobalSearchRequest>): Promise<AxiosResponse[]> {
      // On appelle l'API Periscope
      // Note: Promise.all permet d'appeler plusieurs fonctions qui encapsule des appels Axios
      return Promise.all([PeriscopeDataService.findNoticesByCriteria(0, 25, JSON.stringify(jsonObject))])
         .then((response) => {
            console.log(response);
            if (response[0].status == 200) {
               return response[0].data;
            } else {
               console.log('rate');
            }
         })
         .catch((err) => {
            const arrayError: Array<string> = [];
            arrayError.push(err.config.baseURL + ' : Erreur de code ' + err.message.replace(/\D/g, ''));
            return arrayError;
            //pour placer des données de retour -> analyser -> return JSON.parse(JSON.stringify(err);
         });
   }
}
