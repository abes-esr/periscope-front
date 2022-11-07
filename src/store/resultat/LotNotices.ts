import Notice from '@/store/entity/Notice';

/**
 * Représente les lots de notices
 */
export class LotNotices {
   _notices: Array<Notice> = [];
   _maxNotice = 0;
   _executionTime = 0;
}
