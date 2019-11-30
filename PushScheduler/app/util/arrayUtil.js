'use strict';

module.exports.novoArrayDeNomes = function(arr) {
	var array = [];

	arr.forEach(function(e) {
		array.push([e.nome]);
	});

	return array;
}

module.exports.novoArrayPorAtributo = function(arr, atributo) {
	var array = [];

	arr.forEach(function(e){
		array.push(e[atributo]);
	})

	return array;
}

module.exports.encontrarObjetoPorAtributo = function(arr, atributo, nome) {
	var obj;

	if(arr) {
		arr.forEach(function(e) {
			if(e[atributo] === nome) {
				obj = e;
			}
		});
	}

	return obj;
}

module.exports.mesclarArrays = function(arr1, arr2) {
	if(!Array.isArray(arr1) || !Array.isArray(arr2)) {
		throw 'Os parâmetros devem ser do tipo array';
	}

	var resultado = [];

	resultado = arr1.concat(arr2);

	return resultado;
}

module.exports.adicionarAtributoValorNosElementosDoArray = function(atributo, valor, arr) {
	if(!Array.isArray(arr)) {
		throw 'O parâmetro deve ser do tipo array';
	}

	arr.forEach(function(e) {
		e[atributo] = valor;
	});
}