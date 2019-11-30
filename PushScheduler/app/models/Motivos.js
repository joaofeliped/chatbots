'use strict';

function Motivos(poolConnection) {
	this._poolConnection = poolConnection;
}

Motivos.prototype.buscarMotivosPorEmpresa = function(empresaId, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID, nome, grupo_atendimento_id from mnt_motivo_ocorrencia where empresa_id = ? order by nome limit 10', [empresaId], function(err, result) {
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
	return Motivos;
}