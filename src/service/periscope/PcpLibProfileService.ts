import axios, {AxiosInstance, AxiosResponse} from 'axios';

/**
 * Couche de service pour les appels à l'API Periscope
 */
export class PcpLibProfileService {
   client: AxiosInstance = axios.create({
      baseURL: process.env.VUE_APP_WS_APICOM,
      headers: {
         'Content-type': 'text/json',
      },
   });

   /**
    * Récupère une liste avec tout les RCR lié au nom de structure
    * @return Promise<AxiosResponse> Réponse Axios
    */
   getRcrName(): Promise<AxiosResponse> {
      return this.client.get('pcplibs.json').then((response) => {
         return response;
      });
   }

   /**
    *  Retourne la liste des RCR rattachés à deux PCP ou plus
    * @param pcps liste de pcp dont on veut extraire les rcr qui y sont rattachés
    */
   findRcrByListPcp(pcps: Array<string>): Promise<AxiosResponse> {
      const listPcpInString = pcps.join(',');
      return this.client.get(`pcp2rcr/${listPcpInString}`).then((response) => {
         return response;
      });
   }
}
export default new PcpLibProfileService();
