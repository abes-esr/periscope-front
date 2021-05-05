import json from './foo.json';

export class JsonReaderForTests {
   static test(): void {
      console.log(typeof json);
      console.log(JSON.stringify(json));
   }
}
