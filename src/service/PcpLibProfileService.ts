import axios, {AxiosInstance, AxiosResponse} from 'axios';

/**
 * Couche de service pour les appels à l'API Periscope
 */
export class PcpLibProfileService {
   client: AxiosInstance = axios.create({
      baseURL: 'https://apicom.sudoc.fr/wsReferentiels/v1/pcplibs.json',
      headers: {
         'Content-type': 'text/json',
      },

   });

   /**
    * Récupère une liste avec tout les RCR lié au nom de structure
    * @return Promise<AxiosResponse> Réponse Axios
    */
   getRcrName(): Promise<AxiosResponse> {
      return this.client.get('').then((response) => {
         return response;
      });
   }
}
export default new PcpLibProfileService();
