import http from '../config/http-holdings';
import {AxiosResponse} from 'axios';

class HoldingsDataService {
   callHoldingsDataServiceForThisNotice(ppn: string): Promise<AxiosResponse> {
      return http.get(`/${ppn}`);
   }
}

export default new HoldingsDataService();

//Tests
//https://www.sudoc.fr/services/holdings/039226859
//https://www.sudoc.fr/services/holdings/039562999
