'use strict';

function Ocorrencias(poolConnection) {
	this._poolConnection = poolConnection;
}

Ocorrencias.prototype.cadastrarOcorrencia = function(ocorrencia, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('insert into mnt_ocorrencia (data_criacao, numero_do_chamado, descricao_detalhada, solicitante_id, empresa_id, grupo_responsavel_id, motivo_id, status, latitude, longitude, endereco, equipamento_id, local_id, facebook_messenger_id, caminho_foto) values (now(), "0", ?, 1, ?, ?, ?, "NOVO", ?, ?, ?, ?, ?, ?, ?)', 
			[ocorrencia.descricao_detalhada, ocorrencia.empresa_id, ocorrencia.grupo_responsavel_id, ocorrencia.motivo_id, ocorrencia.latitude, 
				ocorrencia.longitude, ocorrencia.endereco, ocorrencia.equipamento_id, ocorrencia.local_id, ocorrencia.facebook_messenger_id, ocorrencia.caminho_foto], function(err, result) {
			
			conn.release();

			if(err) {
				//logger.error(err);
				throw err;
			}

			callback(result);
		});
	});
}

Ocorrencias.prototype.buscarOcorrenciasPorFacebookId = function(facebookID, contadorDe, contadorAte, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select o.requestID, o.descricao_detalhada, o.data_criacao, o.status, e.nome from mnt_ocorrencia o inner join fnd_empresa e on e.requestID = o.empresa_id where o.facebook_messenger_id = ? order by o.data_criacao desc limit ' + contadorDe + ',' + contadorAte, [facebookID], 
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

Ocorrencias.prototype.buscarOcorrenciasPorDataCriacao = function(data, facebookID, contadorDe, contadorAte, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select o.requestID, o.descricao_detalhada, o.data_criacao, o.status, e.nome from mnt_ocorrencia o inner join fnd_empresa e on e.requestID = o.empresa_id where DATE(o.data_criacao) = DATE(?) and o.facebook_messenger_id = ? order by o.data_criacao desc limit ' + contadorDe + ',' + contadorAte, [data, facebookID], 
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

Ocorrencias.prototype.buscarOcorrenciaPorEmpresa = function(empresaID, facebookID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select o.requestID, o.descricao_detalhada, o.data_criacao, o.status, e.nome from mnt_ocorrencia o inner join fnd_empresa e on e.requestID = o.empresa_id where o.empresa_id = ? and o.facebook_messenger_id = ? order by o.data_criacao desc limit 30', [empresaID, facebookID], 
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

Ocorrencias.prototype.buscarEmpresasComOcorrenciaAbertasPorIdFacebook = function(facebookID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select distinct e.requestID, e.nome from mnt_ocorrencia o inner join fnd_empresa e on e.requestID = o.empresa_id where o.facebook_messenger_id = ? order by e.nome limit 30', [facebookID], 

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

Ocorrencias.prototype.buscarOcorrenciaPorId = function(id, facebookID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select o.requestID, o.descricao_detalhada, o.data_criacao, o.status, e.nome from mnt_ocorrencia o inner join fnd_empresa e on e.requestID = o.empresa_id where o.requestID = ? and o.facebook_messenger_id = ?', [id, facebookID], 
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
	return Ocorrencias;
}