'use strict';

var moment = require('moment');

module.exports.formatarData = function(data, formato) {
	return moment(data).format(formato);
}

module.exports.diaDaSemana = function() {
	return moment().day();
}

module.exports.horaAtual = function() {
	return moment().hour();
}

module.exports.minutoAtual = function() {
	return moment().minute();
}

module.exports.dataFormatada = function(data, formatoIn, formatoOut) {
	return moment(moment(data, formatoIn)).format(formatoOut);
}

module.exports.fromStrToDate = function(dataStr) {
	return moment(dataStr);
}

module.exports.validarData = function(data) {
	return moment(data, 'DD/MM/YYYY', true).isValid();
}