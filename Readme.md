## Synopsis

Hierarchical Bitset for efficient iteration and boolean operations on sparse data. This is a translation to js of the amazing [hibitset](https://github.com/slide-rs/hibitset).

## Code Example

```javascript
import * as B from "hibitset-js";
const set = new B.BitSet(0);
for(var i = 0; i < 1000; i += 1) {
    expect(set.add(i)).toBeFalsy();
    expect(set.add(i)).toBeTruthy();
}
for(var i = 0; i < 1000; i += 1) {
    expect(set.contains(i)).toBeTruthy();
}

const B.xor(set, B.zero(set.size()));

function iterate(a: B.HierarchicalBitset, callback: (value: object) => void) {
  const iterator = B.createIterator(a);
  while(true) {
    const { value, done } = iterator.next();
    if(done) {
      break;
    }
    callback(value);
  };
}
```
the first part is an excerpt from the tests. Then a boolean operation and the zero factory method are demonstrated. The iterate function showcases how to iterate over a BitSet. The HierarchicalBitset type is an interface shared by all BitSets.

## Motivation

Hierarchical Bitsets are extremely useful to iterate over sparse data structures.

## Installation

checkout the project and
```
npm install && npm test
```

## API Reference



## Tests

```
npm install && npm test
```

## License

MIT.
