function foo() {}

var f = new foo();
console.log(f);
f.name = 1;

function Person(name, age) {
  return {
    name: name,
    age: age,
    sayName: function() {
      return this.name;
    }
  }
}

var person1 = new Person('Cin', 22);
console.log(person1.sayName());