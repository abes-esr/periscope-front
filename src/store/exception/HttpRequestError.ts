import {BaseError} from '@/store/exception/BaseError';

export class HttpRequestError extends BaseError {
   constructor(public status: number, public message: string, public debugMessage?: string) {
      super();
   }
}
