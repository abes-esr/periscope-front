import {BaseError} from '@/exception/BaseError';

export class ArrayIndexOutOfBoundsError extends BaseError {
   constructor(public message: string) {
      super();
   }
}
