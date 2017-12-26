import { HierarchicalBitset } from "./BitSet";

export function one(size: number): HierarchicalBitset {
  return {
    byte(index: number, layer: number): number {
      return ~0;
    },

    size(): number {
      return size;
    }
  }
}

export function zero(size: number): HierarchicalBitset {
  return {
    byte(index: number, layer: number): number {
      return 0;
    },

    size(): number {
      return size;
    }
  }
}

function maximumSize(sets: Array<HierarchicalBitset>): number {
  return sets.reduce((acc, set) => {
    return acc >= set.size() ? acc : set.size();
  }, 0); 
}

export function and(...sets: Array<HierarchicalBitset>): HierarchicalBitset {
  if (sets.length == 1) {
    return sets[0];
  }
  return {
      byte(index: number, layer: number): number {
        return sets.reduce((acc, set) => {
          return acc & set.byte(index, layer);
        }, ~0);
      },

      size(): number {
        return maximumSize(sets)
      }
  }
}

export function xor(...sets: Array<HierarchicalBitset>): HierarchicalBitset {
  if (sets.length == 1) {
    return sets[0];
  }
  return {
      byte(index: number, layer: number): number {
        return sets.reduce((acc, set) => {
          return acc ^ set.byte(index, layer);
        }, 0);
      },

      size(): number {
        return maximumSize(sets)
      }
  }
}

export function or(...sets: Array<HierarchicalBitset>): HierarchicalBitset {
  if (sets.length == 1) {
    return sets[0];
  }
  return {
      byte(index: number, layer: number): number {
        return sets.reduce((acc, set) => {
          return acc | set.byte(index, layer);
        }, 0);
      },

      size(): number {
        return maximumSize(sets)
      }
  }
}

export function not(a: HierarchicalBitset): HierarchicalBitset {
  return {
      byte(index: number, layer: number): number {
        if(layer != 0) {
          return ~0;
        }
        return ~a.byte(index, layer);
      },

      size(): number {
        return a.size();
      }
  }
}
