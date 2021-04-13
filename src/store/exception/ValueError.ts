import {BaseError} from '@/store/exception/BaseError';

export class ValueError extends BaseError {
   constructor(public message: string) {
      super();
   }
}
