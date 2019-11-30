'use strict';

function NotasOcorrencia(poolConnection) {
	this._poolConnection = poolConnection;
}

NotasOcorrencia.prototype.buscarNotasPorOcorrencia = function(ocorrenciaID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select nota from mnt_nota_ocorrencia where ocorrencia_id = ? and envia_para_solicitante = true order by data_criacao desc limit 10', 
			[ocorrenciaID], 
			function(err, result) {

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
	return NotasOcorrencia;
}

