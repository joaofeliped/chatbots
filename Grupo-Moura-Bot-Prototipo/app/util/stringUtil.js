'use strict';

module.exports.formatarNumero = function(num, length) {
    var r = "" + num;
    while (r.length <= length) {
        r = "0" + r;
    }
    return r;
}

module.exports.strAleatoria = function() {
	return Math.random().toString(36).slice(-25);
}