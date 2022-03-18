import axios, {AxiosInstance, AxiosResponse} from 'axios';

/**
 * Couche de service pour les appels à l'API Periscope
 */
export class PcpLibProfileService {
   client: AxiosInstance = axios.create({
      baseURL: 'https://www.sudoc.fr/services/generic/?servicekey=pcplibprofile',
      headers: {
         'Content-type': 'application/xml',
      },

   });

   /**
    * Récupère les notices à partir des critères multiple de recherche
    * @param data JSON contenant les critères de recherche
    * @return Promise<AxiosResponse> Réponse Axios
    */
   getRcrName(): Promise<AxiosResponse> {
      return this.client.post('');
   }
}
export default new PcpLibProfileService();
