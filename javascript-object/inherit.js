'use strict';

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(sup, sub) {
  var prototype = object(sup);
  prototype.constructor = sub;
  sub.prototype = prototype;
}

function SuperType(name) {
  this.ctro = name;
}

function Sub(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SuperType, Sub);

var subIns = new Sub('C', 22);
console.log(subIns instanceof Sub);