export const BITS = 5;

export const SHIFT0 = 0;
export const SHIFT1 = SHIFT0 + BITS;
export const SHIFT2 = SHIFT1 + BITS;
export const SHIFT3 = SHIFT2 + BITS;

export const calculateOffset = (index: number, shift: number): number =>
  Math.floor(index / (1 << shift));

export const calculateRow = (index: number, shift: number): number =>
  (index >>> shift) & ((1 << BITS) - 1);

export const calculateMask = (index: number, shift: number): number =>
  1 << calculateRow(index, shift);

export const nextPowerOfTwo = (index: number): number =>
  Math.pow( 2, Math.ceil( Math.log( index ) / Math.log( 2 ) ) );

export const copyArrays = (source: Uint32Array, target: Uint32Array): Uint32Array => {
  if(source) {
    for(var i = 0; i < source.length; i += 1) {
      target[i] = source[i];
    }
  }
  return target;
}
