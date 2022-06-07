import {BaseError} from '@/exception/BaseError';

export class RouterError extends BaseError {
  constructor(public message: string) {
    super();
  }
}
