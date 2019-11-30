'use strict';

function Empresas(poolConnection) {
	this._poolConnection = poolConnection;
}

Empresas.prototype.buscarEmpresasPorNome = function(nome, contadorDe, contadorAte, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID, nome, caminho_foto, locale from fnd_empresa where lower(nome) like lower("%"?"%") order by nome limit ' + contadorDe + ',' + contadorAte, [nome], function(err, result) {
			conn.release();

			if(err) {
				//logger.error(err);
				throw err;
			} 

        	callback(result);
		});
	});
}

module.exports = function() {
	return Empresas;
}
