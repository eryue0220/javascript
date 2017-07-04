/**
 * @date 2017-06-15
 * @file bind_with_curry.js
 * @author Cinchen
 */

Function.prototype.curryBind = function(context) {
	var self = this;
	var args = [].slice.call(arguments, 1);

	return function() {
		var innerArgs = [].slice.call(arguments);
		var finalArgs = args.concat(innerArgs);

		return self.apply(context, finalArgs);
	}
};
