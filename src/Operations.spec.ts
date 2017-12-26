import { BitSet } from "./BitSet";
import { zero, one, or, and, xor, not } from "./Operations";
import { iterate } from "./Iteration";

describe("Operations", () => {
    let set1;
    let set2;
    beforeAll(() => {
        set1 = new BitSet(1000);
        set2 = new BitSet(1000);
        for(var i = 0; i < 1000; i += 1) {
          if(i % 2 == 0) {
            set2.add(i);
          } else {
            set1.add(i);
          }
        }
    })
    
    describe("not", () => {
        it("nots a set", () => {
            let notCount = 0;
            iterate(not(set2), (value) => notCount++);
            expect(notCount).toBe(500);
        })
    })
    
    describe("or", () => {
        it("ors two sets", () => {
            let orCount = 0;
            iterate(or(set1, set2), (value) => orCount++);
            expect(orCount).toBe(1000);
        })
        it("defaults if only one set is given", () => {
            expect(or(set1)).toBe(set1);    
        })
    })
    
    describe("and", () => {
        it("ands two sets", () => {
            let andCount = 0;
            iterate(and(set1, not(set2)), (value) => andCount++);
            expect(andCount).toBe(500);
        })
        it("defaults if only one set is given", () => {
            expect(and(set1)).toBe(set1);    
        })
    })
    
    describe("xor", () => {
        it("xors two sets", () => {
            let xorCount = 0;
            iterate(xor(set1, set2), (value) => xorCount++);
            expect(xorCount).toBe(0);    
        })
        it("defaults if only one set is given", () => {
            expect(xor(set1)).toBe(set1);    
        })
    })

    describe("zero and one", () => {
        it("constructs and resizes correctly", () => {
            // two things here: 1. use size for zero/one constr 2. max size is taken.
            let zeroOne = 0;
            let z = zero(1000);
            iterate(xor(z, one(2000)), (value) => zeroOne++);
            expect(zeroOne).toBe(2000);
            expect(z.size()).toBe(1000);
        })
    })
})