'use strict';

const R = require('rambda');
const { Wrapper } = require('./WrapperMonad');

Wrapper.of('Hello Monads!')
  .map(R.toUpper)
  .map(R.identity);
