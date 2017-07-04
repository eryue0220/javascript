function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    }
}

function curryBind(fn, context) {
    var outArgs = [].slice.call(arguments, 2)
    return function() {
        var innerArgs = [].slice.call(arguments)
        var finalArgs = outArgs.concat(innerArgs);
        return fn.apply(context, finalArgs);
    }
}