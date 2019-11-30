'use strict';

const moment = require('moment');

module.exports.formatarData = function(data, formato) {
	return moment(data).format(formato);
}

module.exports.formatarDataStr = function(dataStr, formato) {
	return moment(dataStr, formato);
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

module.exports.adicionarDias = function(data, quantidadeDias) {
	return moment(data).add(quantidadeDias, 'days');
}

module.exports.criarData = function(ano, mes, dia) {
	return new Date(ano, mes, dia);
}

module.exports.dataValida = function(data, formato) {
	return moment(data, formato, true).isValid();
}

module.exports.dataPassada = function(data) {
	return moment(data).isBefore(new Date());
}

module.exports.dataFutura = function(data) {
	return moment(data).isSameOrAfter(moment(new Date()).format('YYYY-MM-DD'));
}

