'use strict';

class Maybe {
  static just(a) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing;
  }

  static fromNullable(a) {
    return a !== null ? just(a) : nothing();
  }

  static of(a) {
    return just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just extends Maybe {
  constructor(value) {
    super();
    this.value = value;
  }

  get value() {
    return this.value;
  }

  map(f) {
    return of(f(this.value));
  }

  getOrElse() {
    return this.value;
  }

  filter(f) {
    Maybe.fromNullable(f(this.value) ? this.value : null);
  }

  get isJust() {
    return true;
  }

  toString() {
    return `Maybe.Just(${this.value})`;
  }
}

class Nothing extends Maybe {
  map(f) {
    return this;
  }

  get value() {
    throw new Error("Can't extract the value of a Nothing.");
  }

  getOrElse(other) {
    return other;
  }

  filter() {
    return this.value;
  }

  get isNothing() {
    return true;
  }

  toString() {
    return 'Maybe.Nothing';
  }
}


module.exports = {
  Maybe
};

