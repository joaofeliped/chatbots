'use strict';

var moment = require('moment');

module.exports.formatarData = function(data) {
	return moment(data);
}

module.exports.toMoment = function(timestamp) {
	return moment(timestamp);
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

module.exports.criarArrayDeDiasUteis = function(tamanho) {
	var array = [];

	var hoje = moment();

	for(var i = 0; i < tamanho; i++) {
		var dia = hoje.clone();
		dia.add(i + 1, 'days');

		if(dia.day() !== 0) {
			array.push(dia.toDate());
		}
	}

	return array;
}