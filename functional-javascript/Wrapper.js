'use strict';
/**
 * @description Functor
 */

const R = require('rambda');

class Wrapper {
  constructor(value) {
    this.value = value;
  }

  // map :: (A -> B) -> A -> B
  map(f) {
    return f(this.value);
  }

  toString() {
    return `Wrapper (${this.value})`;
  }
}

// wrap :: A -> Wrapper(A)
const wrap = value => new Wrapper(value);

Wrapper.prototype.fmap = function(f) {
  return wrap(f(this.value));
};

const wrappedValue = wrap('Get Function.');
const identity = wrappedValue.map(R.identity);
const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);
const two = wrap(2);
const five = two.fmap(plus3);
const Empty = function(_) {};
Empty.prototype.fmap = function() { return this; };

const empty = () => new Empty();
const isEven = n => Number.isFinite(n) && (n % 2 === 0);
const half = val => isEven(val) ? wrap(val / 2) : empty();

console.log(half(4));
console.log(half(3));

const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);

console.log(half(3).fmap(plus3))

module.exports = {
  wrap
};
