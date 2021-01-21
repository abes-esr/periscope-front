import http from '../config/http-common';
import {AxiosResponse} from "axios";

/**
 * Couche de service pour les appels à l'API Periscope
 */
class PeriscopeDataService {

   /**
    * Récupère les notices à partir d'un ou plusieurs codes PCP et des combinaisons avec les autres critères
    * @param page Numéro de la page à récupérer
    * @param size Nombre de notices par page
    * @param data JSON contenant les critères de sélection
    * @return Promise<AxiosResponse> Réponse Axios
    */
   findNoticesByPcp(page: number, size: number, data: any): Promise<AxiosResponse> {
      return http.post(`/notice/findByRcr?page=${page}&size=${size}`, data);
   }
}
export default new PeriscopeDataService();
