/**
 * @date 2017-06-15
 * @file bind.js
 * @author Cinchen
 */

Function.prototype.bind = function(context) {
	var self = this;
	return function() {
		return self.apply(context, arguments);
	}
};
