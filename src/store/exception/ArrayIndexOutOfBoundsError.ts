import {BaseError} from '@/store/exception/BaseError';

export class ArrayIndexOutOfBoundsError extends BaseError {
   constructor(public message: string) {
      super();
   }
}
