export class BaseError {
   constructor(...args) {
      Error.apply(this, args);
   }
}
