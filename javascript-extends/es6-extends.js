function extend(Parent, Child) {
  const ParentProto = Parent.prototype;
  Parent.bind(Child);
  const F = function() {
    this.__superConstructor = Parent;
  }
  const f = new F;
  Child.prototype = ParentProto;
  Child.prototype.__parent = () => ParentProto;
  Child.prototype.__super = () => {
    let current = f.__superConstructor;
    while (current.__superConstructor) {
      current = current.__superConstructor;
    }

    return current;
  };

  return Child;
}
