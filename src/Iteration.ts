import * as trailingZeros from 'count-trailing-zeros';
import { HierarchicalBitset } from "./BitSet";
import { BITS } from "./Utils"

export function iterate(a: HierarchicalBitset, callback: (value: object) => void) {
  const iterator = createIterator(a);
  while(true) {
    const { value, done } = iterator.next();
    if(done) {
      break;
    }
    callback(value);
  };
}

export function createIterator(a: HierarchicalBitset): BitSetIterator {
  return new BitSetIterator(a, [0, 0, 0, a.byte(0, 3)], [0, 0, 0]);
}

export class BitSetIterator {
  set: HierarchicalBitset;
  masks: [number, number, number, number];
  prefix: [number, number, number];
  done: boolean;

  constructor(set: HierarchicalBitset, masks: [number, number,  number, number], prefix: [number, number, number]) {
    this.set = set;
    this.masks = masks;
    this.prefix = prefix;
    this.done = false;
  }

  next() {
    let value = undefined;
    while(true) {
      if (this.masks[0] != 0) {
        const bit = trailingZeros(this.masks[0]);
        this.masks[0] &= ~(1 << bit);
        value = this.prefix[0] | bit;
        if(value >= this.set.size()) {
          this.done = true;
          value = undefined;
        }
        break;
      }
      if (this.masks[1] != 0) {
        const bit = trailingZeros(this.masks[1]);
        this.masks[1] &= ~(1 << bit);
        const index = this.prefix[1] | bit;
        this.masks[0] = this.set.byte(index, 0);
        this.prefix[0] = index << BITS;
        continue;
      }
      if (this.masks[2] != 0) {
        const bit = trailingZeros(this.masks[2]);
        this.masks[2] &= ~(1 << bit);
        const index = this.prefix[2] | bit;
        this.masks[1] = this.set.byte(index, 1);
        this.prefix[1] = index << BITS;
        continue;
      }
      if (this.masks[3] != 0) {
        const bit = trailingZeros(this.masks[3]);
        this.masks[3] &= ~(1 << bit);
        const index = this.prefix[3] | bit;
        this.masks[2] = this.set.byte(index, 2);
        this.prefix[2] = index << BITS;
        continue;
      }
      this.done = true;
      value = undefined;
      break;
    }
    return { value, done: this.done };
  }
}
