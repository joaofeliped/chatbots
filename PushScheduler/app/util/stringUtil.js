'use strict';

var S = require('string');

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

module.exports.formatarStringParaDireita = function(str, padd) {
	return S(str).padRight(padd).toString();
}

module.exports.formatarStringParaEsquerda = function(str, padd) {
	return S(str).padLeft(padd - str.length).toString();
}