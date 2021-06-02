import axios, {AxiosInstance, AxiosResponse} from 'axios';

/**
 * Couche de service pour les appels à l'API Periscope
 */
class PeriscopeService {
   client: AxiosInstance = axios.create({
      baseURL: process.env.VUE_APP_PERISCOPE_V2_API_URL,
      headers: {
         'Content-type': 'application/json',
      },
   });

   /**
    * Récupère les notices à partir des critères multiple de recherche
    * @param page Numéro de la page à récupérer
    * @param size Nombre de notices par page
    * @param data JSON contenant les critères de recherche
    * @return Promise<AxiosResponse> Réponse Axios
    */
   findNoticesByCriteria(page: number, size: number, data: any): Promise<AxiosResponse> {
      return this.client.post(`/notice/findByCriteria?page=${page}&size=${size}`, data, {timeout: 1000 * 10});
   }

   /**
    * Récupère les notices à partir des critères multiple de recherche et de facettes
    * @param page Numéro de la page à récupérer
    * @param size Nombre de notices par page
    * @param data JSON contenant les critères de recherche
    * @return Promise<AxiosResponse> Réponse Axios
    */
   findNoticesWithFacetsByCriteria(page: number, size: number, data: any): Promise<AxiosResponse> {
      return this.client.post(`/notice/findByCriteriaWithFacets?page=${page}&size=${size}`, data, {timeout: 1000 * 10});
   }
}
export default new PeriscopeService();
