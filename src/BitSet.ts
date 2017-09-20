import { BitSetIterator } from "./Iteration";
import { calculateOffset, calculateMask, copyArrays, nextPowerOfTwo,
  SHIFT0, SHIFT1, SHIFT2, SHIFT3 } from "./Utils"

export interface HierarchicalBitset {
  byte(index: number, layer: number): number;
  size(): number;
}

export class BitSet implements HierarchicalBitset {
  layer0: Uint32Array;
  layer1: Uint32Array;
  layer2: Uint32Array;
  layer3: Uint32Array;
  capacity: number;
  internalSize: number;

  constructor(size: number = 0) {
    this.capacity = 0;
    this.internalSize = 0;
    this.grow(size);
  }

  grow(size: number) {
    if(this.capacity <= size) {
      const capacity = nextPowerOfTwo(size);
      const p0 = calculateOffset(capacity, SHIFT1);
      const p1 = calculateOffset(capacity, SHIFT2);
      const p2 = calculateOffset(capacity, SHIFT3);
      this.layer0 = copyArrays(this.layer0, new Uint32Array(p0+1));
      this.layer1 = copyArrays(this.layer1, new Uint32Array(p1+1));
      this.layer2 = copyArrays(this.layer2, new Uint32Array(p2+1));
      this.layer3 = copyArrays(this.layer3, new Uint32Array(1));
      this.capacity = capacity;
    }
    if (this.internalSize < size) {
      this.internalSize = size;
    }
  }

  byte(index: number, layer: number): number {
    switch(layer) {
      case 0: return this.layer0[index];
      case 1: return this.layer1[index];
      case 2: return this.layer2[index];
      case 3: return this.layer3[index];
    }
    return undefined;
  }

  size(): number {
    return this.internalSize;
  }

  add(index: number): boolean {
    this.grow(index+1);

    const p0 = calculateOffset(index, SHIFT1);
    const mask = calculateMask(index, SHIFT0);

    const value = this.layer0[p0];
    if ((value & mask) != 0) {
      return true;
    }

    this.layer0[p0] |= mask;
    if(value == 0) {
      this.add_slow(index);
    }
    return false;
  }

  remove(index: number): boolean {
    const p0 = calculateOffset(index, SHIFT1);
    const p1 = calculateOffset(index, SHIFT2);;
    const p2 = calculateOffset(index, SHIFT3);
    const mask = calculateMask(index, SHIFT0);
    const mask1 = calculateMask(index, SHIFT1)
    const mask2 = calculateMask(index, SHIFT2);
    const mask3 = calculateMask(index, SHIFT3);

    if ((this.layer0[p0] & mask) == 0) {
      return false;
    }

    this.layer0[p0] &= ~mask;
    if (this.layer0[p0] != 0) {
      return true;
    }

    this.layer1[p1] &= ~mask1;
    if (this.layer1[p1] != 0) {
      return true;
    }

    this.layer2[p2] &= ~mask2;
    if (this.layer2[p2] != 0) {
      return true;
    }

    this.layer3[0] &= ~mask3;
    return true;
  }

  contains(index: number): boolean {
    const p0 = calculateOffset(index, SHIFT1);
    const mask = calculateMask(index, SHIFT0);
    return p0 < this.layer0.length && ((this.layer0[p0] & mask) != 0)
  }

  private add_slow(index: number) {
      const p1 = calculateOffset(index, SHIFT2);
      const p2 = calculateOffset(index, SHIFT3);
      this.layer1[p1] |= calculateMask(index, SHIFT1);
      this.layer2[p2] |= calculateMask(index, SHIFT2);
      this.layer3[0] |= calculateMask(index, SHIFT3);
  }
}
