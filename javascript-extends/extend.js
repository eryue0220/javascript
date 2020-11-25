function extend() {
  let target = arguments[0];
  let index = 1;
  let deep;

  if (typeof target === 'boolean') {
    deep = target;
    target = argumentss[i] || {};
    index++;
  }

  const extendOption = [].slice.call(arguments, i);
  const len = extendOption.length;
  let option, name, src, copy, isArray, clone;

  for (let k = 0; k < len; k++) {
    if ((option = extendOption[k])) {
      for (name in option) {
        src = target[name];
        copy = option[name];
      }
      if (
        deep && copy &&
        (
          isArray = Array.isArray(copy) ||
          Object.prototype.toString.call(copy) === '[object Object]'
        )
      ) {
        if (isArray) {
          isArray = false;
          clone = src = Array.isArray(src) && src || [];
        } else {
          clone = src && Object.prototype.toString.call(src) === '[object Object]' ? src : {};
        }

        target[name] = extend(deep, clone, copy);
      } else if (copy !== undefined) {
        target[name] = copy;
      }
    }
  }

  return target
}