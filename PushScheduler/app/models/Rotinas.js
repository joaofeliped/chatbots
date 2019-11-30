'use strict';

function Rotinas(poolConnection) {
	this._poolConnection = poolConnection;
}

Rotinas.prototype.buscarRotinas = function(callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID from mnt_rotina', function(err, result) {
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
	return Rotinas;
}