import Notice from '@/store/classes/Notice';

export class NoticesStored {
   private _notices: Array<Notice> = [];

   constructor() {
      this._notices = [];
   }

   get notices(): Array<Notice> {
      return this._notices;
   }

   set notices(value: Array<Notice>) {
      this._notices = value;
   }
}
