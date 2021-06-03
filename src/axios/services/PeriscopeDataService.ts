import http from '../config/http-common';
import {AxiosResponse} from 'axios';

/**
 * Couche de service pour les appels à l'API Periscope
 */
class PeriscopeDataService {
   /**
    * Récupère les notices à partir des critères multiple de recherche
    * @param page Numéro de la page à récupérer
    * @param size Nombre de notices par page
    * @param data JSON contenant les critères de recherche
    * @return Promise<AxiosResponse> Réponse Axios
    */
   findNoticesByCriteria(page: number, size: number, data: any): Promise<AxiosResponse> {
      return http.post(`/notice/findByCriteria?page=${page}&size=${size}`, data);
   }
}
export default new PeriscopeDataService();
