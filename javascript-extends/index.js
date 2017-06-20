function extend() {
    var target = arguments[0];
    var i = 1;
    var deep;

    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    var extendOption = [].slice.call(arguments, i);
    var len = extendOption.length;
    var k = 0;
    var option, name, src, copy, isArray, clone;

    for (; k < len; k++) {
        if ((option = extendOption[k])) {
            for (name in option) {
                src = target[name]
                copy = option[name]
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

extend({ a: 1 }, { b: 2 }, { c: 3 });