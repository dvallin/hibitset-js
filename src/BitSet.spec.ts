import { BitSet } from "./BitSet";
import { zero, one, or, and, xor, not } from "./Operations";
import { iterate } from "./Iteration";
import * as _ from "lodash";

describe("BitSet", () => {
  it("adds bits and returns old values correctly", () => {
    const set = new BitSet(0);
    for(var i = 0; i < 1000; i += 1) {
        expect(set.add(i)).toBeFalsy();
        expect(set.add(i)).toBeTruthy();
    }
    for(var i = 0; i < 1000; i += 1) {
        expect(set.contains(i)).toBeTruthy();
    }
  });

  it("removes bits from the set", () => {
    const set = new BitSet(1000);
    for(var i = 0; i < 1000; i += 1) {
      set.add(i);
    }
    for(var i = 0; i < 1000; i += 1) {
      expect(set.remove(i)).toBeTruthy();
      expect(set.contains(i)).toBeFalsy();
      expect(set.remove(i)).toBeFalsy();
    }
  });

  it("iterates", () => {
    const set = new BitSet(1000);
    for(var i = 0; i < 1000; i += 2) {
      set.add(i);
    }
    let count = 0;
    iterate(set, (value) => {
      count++;
      expect(value % 2 == 0).toBeTruthy();
    };
    expect(count).toBe(500);
  });

  it("boolean operations work", () => {
    const set1 = new BitSet(1000);
    const set2 = new BitSet(1000);
    for(var i = 0; i < 1000; i += 1) {
      if(i % 2 == 0) {
        set2.add(i);
      } else {
        set1.add(i);
      }
    }

    let orCount = 0;
    iterate(or(set1, set2), (value) => orCount++);
    expect(orCount).toBe(1000);

    let notCount = 0;
    iterate(not(set2), (value) => notCount++);
    expect(notCount).toBe(500);

    let andCount = 0;
    iterate(and(set1, not(set2)), (value) => andCount++);
    expect(andCount).toBe(500);

    let xorCount = 0;
    iterate(xor(set1, set2), (value) => xorCount++);
    expect(xorCount).toBe(0);

    // two things here: 1. use size for zero/one constr 2. max size is taken.
    let zeroOne = 0;
    let z = zero(1000);
    iterate(xor(z, one(2000)), (value) => zeroOne++);
    expect(zeroOne).toBe(2000);
    expect(z.size()).toBe(1000);
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
