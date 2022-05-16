import axios, {AxiosInstance, AxiosResponse} from 'axios';

class Pcp2RcrService {
    client: AxiosInstance = axios.create({
        baseURL: 'https://www.sudoc.fr/services',
        headers: {
            'Content-type': 'application/json',
        },
    });

    findrcrByPcp(pcp: string): Promise<AxiosResponse> {
        return this.client.get(`/pcp2rcr/${pcp}&format=text/json`, {timeout: 1000 * 5});
    }
}
export default new Pcp2RcrService();
