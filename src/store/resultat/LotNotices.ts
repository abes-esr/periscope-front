import Notice from '@/store/entity/Notice';
import {ContentHeader} from '@/store/resultat/TableInterfaces';

export class LotNotices {
   _lotNotices: Array<Notice> = [];
   _resultArrayContentNotices: Array<ContentHeader>; //Contient les notices reçues
}
