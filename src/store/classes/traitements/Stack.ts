import {Node} from '@/store/classes/traitements/Node';

export class Stack {
   private count: number;
   private storage: Array<Node>;

   push(value: Node): void {
      this.storage[this.count] = value;
      this.count++;
   }

   pop(): Node | undefined {
      // Check to see if the stack is empty
      if (this.count === 0) {
         return undefined;
      }
      this.count--;
      const result = this.storage[this.count];
      delete this.storage[this.count];
      return result;
   }

   size(): number {
      return this.count;
   }

   isEmpty(): boolean {
      return this.count === 0;
   }

   peek(): Node | undefined {
      if (this.count === 0) {
         return undefined;
      }

      const result = this.storage[this.count - 1];
      return result;
   }

   toArray(): Array<Node> {
      const result = [];

      for (let j = 1; j <= this.count; j++) {
         result.push(this.storage[j - 1]);
      }

      return result;
   }
}
