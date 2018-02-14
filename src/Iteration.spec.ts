import { BitSet } from "./BitSet";
import { iterate } from "./Iteration";

describe("Iteration", () => {
  it("iterates", () => {
    const set = new BitSet(1000);
    for (var i = 0; i < 1000; i += 2) {
      set.add(i);
    }
    let count = 0;
    iterate(set, (value: number) => {
      count++;
      expect(value % 2 == 0).toBeTruthy();
    });
    expect(count).toBe(500);
  })
})
