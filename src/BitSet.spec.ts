import { BitSet } from "./BitSet";

describe("BitSet", () => {
  it("adds bits and returns old values correctly", () => {
    const set = new BitSet(0);
    for(var i = 0; i < 2000; i += 1) {
        expect(set.add(i)).toBeFalsy();
        expect(set.add(i)).toBeTruthy();
    }
    for(var i = 0; i < 2000; i += 1) {
        expect(set.contains(i)).toBeTruthy();
    }
  });

  it("removes bits from the set", () => {
    const set = new BitSet(2000);
    for(var i = 0; i < 2000; i += 1) {
      set.add(i);
    }
    for(var i = 0; i < 2000; i += 1) {
      expect(set.remove(i)).toBeTruthy();
      expect(set.contains(i)).toBeFalsy();
      expect(set.remove(i)).toBeFalsy();
    }
  });

  it("grows correctly", () => {
    const a = new BitSet();
    a.add(0);
    expect(a.size()).toBe(1);
    a.add(1);
    expect(a.size()).toBe(2);
    const b = new BitSet();
    b.add(1);
    expect(b.size()).toBe(2);
  })
});
