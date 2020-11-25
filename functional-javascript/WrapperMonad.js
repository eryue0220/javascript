'use strict';

class Wrapper {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Wrapper(value);
  }

  map(f) {
    return Wrapper.of(f(this.value));
  }

  join() {
    if (!(this.value instanceof Wrapper)) {
      return this;
    }

    return this.value.join();
  }

  toString() {
    return `Wrapper (${this.value})`;
  }
}

module.exports = {
  Wrapper
};
