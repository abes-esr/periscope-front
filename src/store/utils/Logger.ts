/**
 * Cette classe un logger
 */
export class Logger {
   static mode: string = process.env.NODE_ENV;

   /**
    * Log message de debug
    * @param message
    */
   static debug(message: string): void {
      if (Logger.mode == 'development') {
         console.log('[DEBUG] ' + message);
      }
   }

   /**
    * Log message d'attention
    * @param message
    */
   static warn(message: string): void {
      if (Logger.mode == 'development' || Logger.mode == 'test') {
         console.log('[WARNING] ' + message);
      }
   }

   /**
    * Log message d'erreur
    * @param message
    * @param type Type de l'erreur (optionnel)
    */
   static error(message: string, type?: string): void {
      if (Logger.mode == 'development' || Logger.mode == 'test') {
         if (type) {
            console.log('[ERROR][' + type + '] ' + message);
         } else {
            console.log('[ERROR] ' + message);
         }
      }
   }

   /**
    * Log message d'information
    * @param message
    */
   static info(message: string): void {
      if (Logger.mode == 'development' || Logger.mode == 'test') {
         console.log('[INFO] ' + message);
      }
   }
}
