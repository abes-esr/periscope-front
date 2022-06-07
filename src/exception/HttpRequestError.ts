import {BaseError} from '@/exception/BaseError';

export class HttpRequestError extends BaseError {
  constructor(
    public status: number,
    public message: string,
    public method?: string,
    public route?: string,
    public debugMessage?: string,
  ) {
    super();
  }
}
