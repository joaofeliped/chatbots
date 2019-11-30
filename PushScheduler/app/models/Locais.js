'use strict';

function Locais(poolConnection) {
	this._poolConnection = poolConnection;
}

Locais.prototype.buscarLocaisPorNomeEmpresa = function(nome, contadorDe, contadorAte, empresaID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID, nome from fnd_local where lower(nome) like lower("%"?"%") and empresa_id = ? order by nome limit ' + contadorDe + ',' + contadorAte, [nome, empresaID], function(err, result) {
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
	return Locais;
}